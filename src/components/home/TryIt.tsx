import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { DEMO_PATH, DEMO_STEPS, JOIN_CANDIDATES, WHERE_COLUMNS, joinColumnOf } from "./demoSteps";
import type { Cell } from "./demoSteps";
import { trackEvent } from "../../utils/analytics";

// A small, working copy of Beamlynx's canvas, driven the way the app is:
// the action bar above the current table (SELECT | WHERE | JOIN | +), a
// picker listing what Pine says can come next, and for WHERE a column, an
// operator and a value. Results, the Pine expression and the SQL all come
// from demoSteps.ts (real pine-lang output). The one thing done in the
// browser is the final filter, applied to Pine's own rows.
//
// Geometry is in one 600x440 coordinate space. Nodes are HTML placed in
// percentages over an SVG layer that draws the join lines, so the canvas
// scales with its container while staying keyboard-operable.

const W = 600;
const H = 440;
const NODE_W = 172;
const NODE_H = 58;
const HANDLE_Y = 40; // where a join line meets a node, from the node's top

type NodeId = "customers" | "orders" | "order_items";
const ORDER: NodeId[] = ["customers", "orders", "order_items"];

const NODES: Record<NodeId, { x: number; y: number; alias: string; joinColumn?: string }> = {
  customers: { x: 20, y: 40, alias: "c_0" },
  orders: { x: 214, y: 150, alias: "o_1", joinColumn: "customer_id" },
  order_items: { x: 408, y: 260, alias: "oi_2", joinColumn: "order_id" },
};

// Pine reads a bare value as a whole, non-negative number: `100.5` and `-1`
// are parse errors, and quoting them fails against a numeric column. So the
// demo accepts only what Pine would run.
const PINE_NUMBER = /^[0-9]+$/;
const OPERATORS = ["=", "!=", ">", "<"] as const;
// Prefilled so a visitor only has to press Enter. The app starts empty.
const DEFAULT_OP = ">";
const DEFAULT_VALUE = "500";
const SUGGESTED_COLUMN = "unit_price";
type Operator = (typeof OPERATORS)[number];
const compare: Record<Operator, (a: number, b: number) => boolean> = {
  "=": (a, b) => a === b,
  "!=": (a, b) => a !== b,
  ">": (a, b) => a > b,
  "<": (a, b) => a < b,
};

const THEMES = ["dark", "light", "sepia"] as const;
type Theme = (typeof THEMES)[number];

type Picker = null | { kind: "join" } | { kind: "where-column" } | { kind: "where-value"; column: string };
type Where = { column: string; op: Operator; value: string };
type PickerRow = { id: string; label: string; detail?: string; hint?: string; enabled: boolean };
type PickerGroup = { label: string; items: PickerRow[] };

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

// The right-angle routing the app's canvas uses: out of the parent's right
// edge, down, and into the child's left edge.
const tracePath = (from: NodeId, to: NodeId) => {
  const a = NODES[from];
  const b = NODES[to];
  const x1 = a.x + NODE_W;
  const mid = x1 + (b.x - x1) / 2;
  return `M ${x1} ${a.y + HANDLE_Y} H ${mid} V ${b.y + HANDLE_Y} H ${b.x}`;
};

const SQL_KEYWORDS = /\b(SELECT|FROM|JOIN|ON|WHERE|LIMIT|AS)\b/g;

// Line breaks before each clause, so the SQL reads as a statement rather
// than one 300-character line. Content is untouched.
const formatSql = (sql: string) => sql.replace(/ (FROM|JOIN|WHERE|LIMIT) /g, "\n$1 ");

const highlightSql = (line: string) =>
  line.split(SQL_KEYWORDS).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="tk-kw">
        {part}
      </span>
    ) : (
      part
    ),
  );

const highlightPine = (line: string) => {
  const m = line.match(/^(\|\s*)?([a-z]+:)?(.*)$/);
  if (!m) return line;
  return (
    <>
      {m[1] && <span className="tk-pipe">{m[1]}</span>}
      {m[2] && <span className="tk-op">{m[2]}</span>}
      {m[3]}
    </>
  );
};

const TryIt = () => {
  const { t } = useTranslation("home");
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0); // number of joins made
  const [where, setWhere] = useState<Where | null>(null);
  const [picker, setPicker] = useState<Picker>(null);
  const [filter, setFilter] = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const [op, setOp] = useState<Operator>(DEFAULT_OP);
  const [value, setValue] = useState(DEFAULT_VALUE);
  const [valueError, setValueError] = useState(false);
  // The app's text panel under the canvas: Pine, SQL, or hidden.
  const [panel, setPanel] = useState<"pine" | "sql" | null>("pine");
  // The app's three built-in themes, applied to this copy of its canvas.
  const [theme, setTheme] = useState<Theme>("dark");

  const done = where !== null;
  const visible = ORDER.slice(0, step + 1);
  const currentNode = visible[visible.length - 1];
  const nextAction: "join" | "where" | null = done ? null : step < 2 ? "join" : "where";

  // Keyboard focus follows the flow: into the picker when it opens, back to
  // the next action when it closes, and to "Start over" at the end. Never on
  // first render, so the page doesn't jump to the demo on load.
  const actionRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const pickerInputRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef<HTMLInputElement>(null);
  const moveFocus = useRef(false);
  useEffect(() => {
    if (!moveFocus.current) return;
    moveFocus.current = false;
    const target =
      picker?.kind === "where-value"
        ? valueRef
        : picker
          ? pickerInputRef
          : done
            ? resetRef
            : actionRef;
    target.current?.focus({ preventScroll: true });
  }, [picker, step, done]);

  // The result, expression and SQL for the current state. The filter step
  // uses step 2's rows, and the WHERE clause in the exact form Pine emits.
  const current = useMemo(() => {
    const base = DEMO_STEPS[step];
    if (!where) return base;
    const col = base.columns.indexOf(where.column);
    const n = Number(where.value);
    return {
      expression: [...base.expression, `| where: ${where.column} ${where.op} ${where.value}`],
      sql: base.sql.replace(
        / LIMIT 250;$/,
        ` WHERE "${NODES.order_items.alias}"."${where.column}" ${where.op} '${where.value}' LIMIT 250;`,
      ),
      columns: base.columns,
      rows: base.rows.filter(r => compare[where.op](Number(r[col]), n)),
    };
  }, [step, where]);

  const openPicker = (p: Picker) => {
    moveFocus.current = true;
    setFilter("");
    setHighlighted(0);
    setPicker(p);
  };

  const closePicker = () => {
    moveFocus.current = true;
    setPicker(null);
  };

  const join = (pine: string) => {
    if (pine !== DEMO_PATH[step]) return;
    moveFocus.current = true;
    setPicker(null);
    setStep(step + 1);
    trackEvent("home_demo_step", { step: step + 1, action: "join", table: pine });
  };

  const pickColumn = (name: string) => {
    moveFocus.current = true;
    setOp(DEFAULT_OP);
    setValue(DEFAULT_VALUE);
    setValueError(false);
    setPicker({ kind: "where-value", column: name });
  };

  const applyWhere = () => {
    if (picker?.kind !== "where-value") return;
    if (!PINE_NUMBER.test(value.trim())) {
      setValueError(true);
      return;
    }
    moveFocus.current = true;
    setWhere({ column: picker.column, op, value: value.trim() });
    setPicker(null);
    trackEvent("home_demo_step", { step: 3, action: "where", column: picker.column, op });
  };

  const reset = () => {
    moveFocus.current = true;
    setStep(0);
    setWhere(null);
    setPicker(null);
    trackEvent("home_demo_step", { step: 0, action: "reset" });
  };

  // Picker rows: join candidates or columns, narrowed by the filter box.
  // `enabled` marks the ones this demo can follow.
  const q = filter.trim().toLowerCase();
  const listGroups: PickerGroup[] =
    picker?.kind === "join"
      ? JOIN_CANDIDATES[step]
          .map(g => ({
            label: g.label as string,
            items: g.items
              .filter(c => !q || c.table.includes(q))
              .map(c => ({
                id: c.pine,
                label: c.table,
                detail: c.schema,
                hint: c.columnHint ? `.${joinColumnOf(c)}` : undefined,
                enabled: c.pine === DEMO_PATH[step],
              })),
          }))
          .filter(g => g.items.length)
      : picker?.kind === "where-column"
        ? [
            {
              label: "",
              items: WHERE_COLUMNS.filter(c => !q || c.name.includes(q)).map(c => ({
                id: c.name,
                label: c.name,
                detail: undefined,
                hint: undefined,
                enabled: c.numeric,
              })),
            },
          ]
        : [];
  const flat = listGroups.flatMap(g => g.items);
  // The one row the hint asks for, highlighted the way JOIN and WHERE are.
  const suggestedId = picker?.kind === "join" ? DEMO_PATH[step] : picker?.kind === "where-column" ? SUGGESTED_COLUMN : null;
  const enabledIdx = flat.map((it, i) => (it.enabled ? i : -1)).filter(i => i >= 0);

  const choose = (id: string) => (picker?.kind === "join" ? join(id) : pickColumn(id));

  const onPickerKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closePicker();
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!enabledIdx.length) return;
      const pos = enabledIdx.indexOf(highlighted);
      const next = e.key === "ArrowDown" ? pos + 1 : pos - 1;
      setHighlighted(enabledIdx[(next + enabledIdx.length) % enabledIdx.length]);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = flat[highlighted]?.enabled ? flat[highlighted] : flat[enabledIdx[0]];
      if (item) choose(item.id);
    }
  };

  // Keep the keyboard highlight on a row that exists and can be picked.
  useEffect(() => {
    const suggested = flat.findIndex(it => it.id === suggestedId);
    if (suggested >= 0) setHighlighted(suggested);
    else if (!flat[highlighted]?.enabled && enabledIdx.length) setHighlighted(enabledIdx[0]);
  }, [filter, picker]); // eslint-disable-line react-hooks/exhaustive-deps

  const hint = done
    ? t("try.hintDone")
    : picker?.kind === "join"
      ? t("try.hintPickTable", { table: DEMO_PATH[step].split(" ")[0].replace("public.", "") })
      : picker?.kind === "where-column"
        ? t("try.hintPickColumn")
        : picker?.kind === "where-value"
          ? t("try.hintValue")
          : nextAction === "join"
            ? t("try.hintJoin", { table: currentNode })
            : t("try.hintWhere", { table: currentNode });

  const node = NODES[currentNode];
  // The app opens its picker beside the table it came from. Here: under
  // the table, except for the last one, where the empty space is to its left.
  const pickerStyle =
    currentNode === "order_items"
      ? { left: `max(8px, calc(${pct(node.x, W)} - var(--picker-w) - 12px))`, top: pct(node.y - 40, H) }
      : { left: `min(${pct(node.x, W)}, calc(100% - var(--picker-w) - 8px))`, top: pct(node.y + NODE_H + 8, H) };

  return (
    <figure className="ti-figure">
    <div className={`ti ti-theme-${theme}`}>
      <div className="ti-bar">
        <p className="ti-hint" aria-live="polite">
          <span className="ti-step">{t("try.stepOf", { n: done ? 4 : step + 1, total: 4 })}</span>
          {hint}
        </p>
        <button
          ref={resetRef}
          type="button"
          className={`ti-reset${done ? " ti-pulse" : ""}`}
          onClick={reset}
          disabled={step === 0 && !picker}
        >
          {t("try.reset")}
        </button>
      </div>

      <div className="ti-grid">
        <div className="ti-left">
        <div className="ti-canvas-cell">
          <div className="ti-toolbar" role="toolbar" aria-label={t("try.panelLabel")}>
            {(["pine", "sql"] as const).map(v => (
              <button
                key={v}
                type="button"
                aria-pressed={panel === v}
                title={t(panel === v ? "try.hidePanel" : "try.showPanel", { panel: v === "pine" ? "Pine" : "SQL" })}
                className={`${panel === v ? "is-active" : ""}${done && v === "sql" && panel !== "sql" ? " ti-pulse" : ""}`}
                onClick={() => setPanel(panel === v ? null : v)}
              >
                {v.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="ti-canvas" style={{ aspectRatio: `${W} / ${H}` }}>
            <svg className="ti-traces" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
              {visible.slice(1).map((id, i) => (
                <motion.path
                  key={id}
                  d={tracePath(visible[i], id)}
                  className="ti-trace"
                  initial={reduceMotion ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                />
              ))}
            </svg>

            {visible.map(id => {
              const n = NODES[id];
              const isCurrent = id === currentNode;
              return (
                <motion.div
                  key={id}
                  className="ti-node-wrap"
                  style={{ left: pct(n.x, W), top: pct(n.y, H), width: pct(NODE_W, W) }}
                  initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isCurrent && !done && (
                    <div className="ti-actions" role="toolbar" aria-label={t("try.actionsLabel", { table: id })}>
                      {(["select", "where", "join", "more"] as const).map((a, i) => {
                        const live = a === nextAction;
                        const label = a === "more" ? "+" : a.toUpperCase();
                        return (
                          <span key={a} className="ti-action-item">
                            {i > 0 && <span className="ti-action-sep">|</span>}
                            <button
                              ref={live ? actionRef : undefined}
                              type="button"
                              className={`ti-action${live ? " is-live" : ""}${live && !picker ? " ti-pulse" : ""}`}
                              disabled={!live}
                              aria-expanded={live ? picker !== null : undefined}
                              onClick={() =>
                                picker ? closePicker() : openPicker(a === "join" ? { kind: "join" } : { kind: "where-column" })
                              }
                            >
                              {label}
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  )}
                  <div className={`ti-node${isCurrent ? " is-current" : ""}`} style={{ height: `calc(${NODE_H} * var(--u))` }}>
                    <span className="ti-node-name">
                      {id} <span className="ti-alias">({n.alias})</span>
                    </span>
                    <span className="ti-node-cols">
                      <span>{n.joinColumn ?? ""}</span>
                      {id !== "order_items" && <span>id</span>}
                    </span>
                  </div>
                  {id === "customers" && (
                    <div className="ti-chips">
                      <span className="ti-chip-label">SEL</span>
                      <span className="ti-chip">first_name</span>
                      <span className="ti-chip">email</span>
                    </div>
                  )}
                  {id === "order_items" && where && (
                    <motion.div className="ti-chips" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }}>
                      <span className="ti-chip-label">WHERE</span>
                      <span className="ti-chip">
                        {where.column} {where.op} {where.value}
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}

            {picker && picker.kind !== "where-value" && (
              <div className="ti-picker" style={pickerStyle} onKeyDown={onPickerKey}>
                <div className="ti-picker-head">
                  <input
                    ref={pickerInputRef}
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    placeholder={t("try.filterPlaceholder")}
                    aria-label={t("try.filterPlaceholder")}
                  />
                  <button type="button" className="ti-picker-close" onClick={closePicker} aria-label={t("try.close")}>
                    ×
                  </button>
                </div>
                <div className="ti-picker-body" role="listbox">
                  {listGroups.map(g => (
                    <div key={g.label}>
                      {g.label && <div className={`ti-picker-group ti-group-${g.label.replace(" ", "-")}`}>{g.label}</div>}
                      {g.items.map(it => {
                        const idx = flat.indexOf(it);
                        return (
                          <button
                            key={it.id}
                            type="button"
                            role="option"
                            aria-selected={idx === highlighted}
                            aria-disabled={!it.enabled}
                            tabIndex={-1}
                            className={`ti-picker-item${idx === highlighted ? " is-highlighted" : ""}${it.enabled ? " is-path" : ""}${it.id === suggestedId ? " is-suggested ti-pulse" : ""}`}
                            onMouseEnter={() => it.enabled && setHighlighted(idx)}
                            onClick={() => it.enabled && choose(it.id)}
                          >
                            <span className="ti-picker-row">
                              <span>{it.label}</span>
                              {it.detail && <span className="ti-picker-detail">{it.detail}</span>}
                            </span>
                            {it.hint && <span className="ti-picker-hint">{it.hint}</span>}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                  {!flat.length && <div className="ti-picker-empty">{t("try.noMatch")}</div>}
                </div>
                {picker.kind === "where-column" && <div className="ti-picker-foot">{t("try.columnNote")}</div>}
              </div>
            )}

            {picker?.kind === "where-value" && (
              <div
                className="ti-picker ti-picker-value"
                style={pickerStyle}
                onKeyDown={e => {
                  if (e.key === "Escape") closePicker();
                  if (e.key === "Enter") {
                    e.preventDefault();
                    applyWhere();
                  }
                }}
              >
                <div className="ti-picker-title">
                  order_items.{picker.column}
                  <button type="button" className="ti-picker-close" onClick={closePicker} aria-label={t("try.close")}>
                    ×
                  </button>
                </div>
                <div className="ti-value-row">
                  <select value={op} onChange={e => setOp(e.target.value as Operator)} aria-label={t("try.operator")}>
                    {OPERATORS.map(o => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  <input
                    ref={valueRef}
                    inputMode="numeric"
                    value={value}
                    onChange={e => {
                      setValue(e.target.value);
                      setValueError(false);
                    }}
                    placeholder="500"
                    aria-label={t("try.value")}
                    aria-invalid={valueError}
                  />
                </div>
                {valueError ? (
                  <p className="ti-value-error" role="alert">
                    {t("try.wholeNumber")}
                  </p>
                ) : (
                  <button type="button" className="ti-apply ti-pulse" onClick={applyWhere}>
                    {t("try.apply")} <span aria-hidden="true">↵</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {panel && (
          <div className="ti-panel">
            <div className="ti-panel-switch" role="tablist" aria-label={t("try.queryLabel")}>
              {(["pine", "sql"] as const).map(v => (
                <button key={v} type="button" role="tab" aria-selected={panel === v} className={panel === v ? "is-active" : ""} onClick={() => setPanel(v)}>
                  {v.toUpperCase()}
                </button>
              ))}
            </div>
            <ol className="ti-code">
              {(panel === "pine" ? current.expression : formatSql(current.sql).split("\n")).map((l, i) => (
                <li key={i}>
                  <span>{panel === "pine" ? highlightPine(l) : highlightSql(l)}</span>
                </li>
              ))}
            </ol>
            <p className="ti-sqlsize">{t("try.sqlWritten", { count: current.sql.length })}</p>
          </div>
        )}
        </div>

        {/* Results */}
        <div className="ti-side">
          <div className="ti-result" role="region" aria-label={t("try.resultLabel")}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.table
                key={`${step}-${where ? JSON.stringify(where) : ""}`}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <thead>
                  <tr>
                    {current.columns.map((c, i) => (
                      <th key={i}>{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {current.rows.map((r: Cell[], i) => (
                    <tr key={i}>
                      {r.map((v, j) => (
                        <td key={j} className={v === null ? "is-null" : undefined}>
                          {v === null ? "null" : String(v)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </motion.table>
            </AnimatePresence>
          </div>
          <p className="ti-count">{t("try.rows", { count: current.rows.length })}</p>
        </div>
      </div>
    </div>
      <figcaption className="shot-caption">
        <span>{t("showcase.caption")}</span>
        <span className="shot-themes" role="radiogroup" aria-label={t("showcase.themeLabel")}>
          {THEMES.map(th => (
            <button
              key={th}
              type="button"
              role="radio"
              aria-checked={theme === th}
              className={`shot-swatch shot-swatch-${th}${theme === th ? " is-active" : ""}`}
              onClick={() => setTheme(th)}
            >
              <span aria-hidden="true" className="shot-dot" />
              {t(`showcase.themes.${th}`)}
            </button>
          ))}
        </span>
      </figcaption>
    </figure>
  );
};

export default TryIt;

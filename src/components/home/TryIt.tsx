import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { DEMO_STEPS } from "./demoSteps";
import { trackEvent } from "../../utils/analytics";

// A small, working copy of beamlynx's canvas. Each click adds one step to
// the query, the same way the app does, and the result, the Pine expression
// and the SQL all come from demoSteps.ts (real pine-lang output, not mocked).
//
// Geometry is in one 600x400 coordinate space. Table nodes are HTML buttons
// placed in percentages over an SVG layer that draws the join lines, so the
// whole canvas scales with its container while staying keyboard-operable.

const W = 600;
const H = 440;
const NODE_W = 172;
const NODE_H = 58;
const HANDLE_Y = 40; // where a join line meets a node, from the node's top

type NodeId = "customers" | "orders" | "product_reviews";

const NODES: Record<NodeId, { x: number; y: number; alias: string; joinColumn?: string; selected: string[] }> = {
  customers: { x: 20, y: 24, alias: "c_0", selected: ["first_name", "email"] },
  orders: { x: 214, y: 136, alias: "o_1", joinColumn: "customer_id", selected: ["order_number", "status"] },
  product_reviews: { x: 408, y: 248, alias: "pr_2", joinColumn: "order_id", selected: ["rating", "title"] },
};

const ORDER: NodeId[] = ["customers", "orders", "product_reviews"];

// customers drops `email` once orders joins, to keep the result narrow -
// matches the expressions in demoSteps.ts.
const selectedFor = (id: NodeId, step: number) =>
  id === "customers" && step > 0 ? ["first_name"] : NODES[id].selected;

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

// The right-angle routing the app's canvas uses: out of the parent's right
// edge, down, and into the child's left edge.
const tracePath = (from: NodeId, to: NodeId) => {
  const a = NODES[from];
  const b = NODES[to];
  const x1 = a.x + NODE_W;
  const y1 = a.y + HANDLE_Y;
  const mid = x1 + (b.x - x1) / 2;
  const y2 = b.y + HANDLE_Y;
  return `M ${x1} ${y1} H ${mid} V ${y2} H ${b.x}`;
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
  const [step, setStep] = useState(0);
  const [view, setView] = useState<"pine" | "sql">("pine");

  // The button just clicked disappears with each step, which would drop
  // keyboard focus to the page. After a click (never on first render), move
  // focus to the next thing to click, or to "Start over" at the end.
  const nextActionRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const moveFocus = useRef(false);
  useEffect(() => {
    if (!moveFocus.current) return;
    moveFocus.current = false;
    (step === 3 ? resetRef : nextActionRef).current?.focus({ preventScroll: true });
  }, [step]);

  const current = DEMO_STEPS[step];
  const visible = ORDER.slice(0, Math.min(step, 2) + 1);
  const nextTable = step < 2 ? ORDER[step + 1] : null;
  const filtered = step === 3;

  const advance = (to: number, what: string) => {
    moveFocus.current = true;
    setStep(to);
    trackEvent("home_demo_step", { step: to, action: what });
  };

  const hint = filtered
    ? t("try.hintDone")
    : nextTable
      ? t("try.hintJoin", { from: ORDER[step], to: nextTable })
      : t("try.hintFilter");

  return (
    <div className="ti">
      <div className="ti-bar">
        <p className="ti-hint" aria-live="polite">
          <span className="ti-step">{t("try.stepOf", { n: step + 1, total: 4 })}</span>
          {hint}
        </p>
        <button
          ref={resetRef}
          type="button"
          className="ti-reset"
          onClick={() => advance(0, "reset")}
          disabled={step === 0}
        >
          {t("try.reset")}
        </button>
      </div>

      <div className="ti-grid">
        {/* Canvas: keeps its proportions, centred in a cell that fills the row */}
        <div className="ti-canvas-cell">
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
            {nextTable && <path d={tracePath(ORDER[step], nextTable)} className="ti-trace ti-trace-ghost" />}
          </svg>

          {visible.map(id => {
            const n = NODES[id];
            const isCurrent = id === visible[visible.length - 1];
            return (
              <motion.div
                key={id}
                className="ti-node-wrap"
                style={{ left: pct(n.x, W), top: pct(n.y, H), width: pct(NODE_W, W) }}
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`ti-node${isCurrent ? " is-current" : ""}`} style={{ height: `calc(${NODE_H} * var(--u))` }}>
                  <span className="ti-node-name">
                    {id} <span className="ti-alias">({n.alias})</span>
                  </span>
                  <span className="ti-node-cols">
                    <span>{n.joinColumn ?? ""}</span>
                    {id !== "product_reviews" && <span>id</span>}
                  </span>
                </div>
                <div className="ti-chips">
                  <span className="ti-chip-label">SEL</span>
                  {selectedFor(id, step).map(c => (
                    <span key={c} className="ti-chip">
                      {c}
                    </span>
                  ))}
                </div>
                {id === "product_reviews" && (
                  <div className="ti-chips">
                    <span className="ti-chip-label">WHERE</span>
                    {filtered ? (
                      <motion.span
                        className="ti-chip"
                        initial={reduceMotion ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        rating = 5
                      </motion.span>
                    ) : (
                      <button
                        ref={nextActionRef}
                        type="button"
                        className="ti-chip ti-chip-candidate ti-pulse"
                        onClick={() => advance(3, "filter")}
                      >
                        + rating = 5
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}

          {nextTable && (
            <div
              className="ti-node-wrap"
              style={{ left: pct(NODES[nextTable].x, W), top: pct(NODES[nextTable].y, H), width: pct(NODE_W, W) }}
            >
              <button
                ref={nextActionRef}
                type="button"
                className="ti-node ti-node-candidate ti-pulse"
                style={{ height: `calc(${NODE_H} * var(--u))` }}
                onClick={() => advance(step + 1, `join_${nextTable}`)}
                aria-label={t("try.joinLabel", { table: nextTable })}
              >
                <span className="ti-node-name">+ {nextTable}</span>
                <span className="ti-node-cols">
                  <span>{NODES[nextTable].joinColumn}</span>
                </span>
              </button>
            </div>
          )}
        </div>
        </div>

        {/* Result and query */}
        <div className="ti-side">
          <div className="ti-result" role="region" aria-label={t("try.resultLabel")}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.table
                key={step}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <thead>
                  <tr>
                    {current.columns.map(c => (
                      <th key={c}>{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {current.rows.map((r, i) => (
                    <tr key={i}>
                      {r.map((v, j) => (
                        <td key={j}>{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </motion.table>
            </AnimatePresence>
          </div>
          <p className="ti-count">{t("try.rows", { count: current.rows.length })}</p>

          <div className="ti-query">
            <div className="ti-tabs" role="tablist" aria-label={t("try.queryLabel")}>
              {(["pine", "sql"] as const).map(v => (
                <button
                  key={v}
                  type="button"
                  role="tab"
                  aria-selected={view === v}
                  className={view === v ? "is-active" : ""}
                  onClick={() => setView(v)}
                >
                  {v === "pine" ? "Pine" : "SQL"}
                </button>
              ))}
              <span className="ti-sqlsize">{t("try.sqlWritten", { count: current.sql.length })}</span>
            </div>
            <pre className="ti-code">
              {view === "pine"
                ? current.expression.map((l, i) => <div key={i}>{highlightPine(l)}</div>)
                : formatSql(current.sql)
                    .split("\n")
                    .map((l, i) => <div key={i}>{highlightSql(l)}</div>)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryIt;

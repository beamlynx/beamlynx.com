import type React from "react";

// A static drawing in the style of the app's canvas: notched table nodes
// joined by right-angle lines. Used by the Features page. Coordinates are in
// a 600-wide space; the drawing scales with its container.

export type MiniNode = {
  id: string;
  x: number;
  y: number;
  label: string;
  /** Width in the 600-wide space, if not the default. */
  w?: number;
  alias?: string;
  /** Small text along the bottom of the node, e.g. the join column. */
  detail?: string;
  /** The node you're on: highlighted, like the app's current node. */
  current?: boolean;
  /** Offered but not added yet: dashed, like the app's candidates. */
  candidate?: boolean;
  /** Something hidden: a lock and dimmed text. */
  dim?: boolean;
  /** Chips under the node, e.g. [["SEL", ["first_name", "email"]]]. */
  chips?: [string, string[]][];
  /** Any extra element under the node. */
  below?: React.ReactNode;
  /** Shown above the node, like the app's action bar. */
  above?: React.ReactNode;
};

export type MiniEdge = {
  from: string;
  to: string;
  label?: string;
  /** Shifts the line's vertical position, to draw two lines between the same pair. */
  offset?: number;
  dashed?: boolean;
  highlight?: boolean;
  /** Put the label at the line's start instead of its end. */
  labelAt?: "start" | "end";
};

const W = 600;
export const NODE_W = 160;
const NODE_H = 46;
const HANDLE = 32;

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

// Out of the side facing the other node, across, and in, the way the app
// routes its join lines. Returns the path and a point for the label.
const route = (a: MiniNode, b: MiniNode, offset = 0, labelAt: "start" | "end" = "end") => {
  const aw = a.w ?? NODE_W;
  const bw = b.w ?? NODE_W;
  const rightward = b.x >= a.x + aw;
  const x1 = rightward ? a.x + aw : a.x;
  const x2 = rightward ? b.x : b.x + bw;
  const y1 = a.y + HANDLE + offset;
  const y2 = b.y + HANDLE + offset;
  const mid = (x1 + x2) / 2;
  const atStart = labelAt === "start";
  return {
    d: `M ${x1} ${y1} H ${mid} V ${y2} H ${x2}`,
    lx: atStart ? (rightward ? x1 + 6 : x1 - 6) : rightward ? mid + 6 : mid - 6,
    ly: (atStart ? y1 : y2) - 5,
    anchor: rightward ? "start" : "end",
  };
};

const MiniCanvas = ({
  height,
  nodes,
  edges,
  overlay,
}: {
  height: number;
  nodes: MiniNode[];
  edges: MiniEdge[];
  overlay?: React.ReactNode;
}) => {
  const byId = Object.fromEntries(nodes.map(n => [n.id, n]));
  return (
    <div className="mc" style={{ aspectRatio: `${W} / ${height}` }}>
      <svg className="mc-lines" viewBox={`0 0 ${W} ${height}`}>
        {edges.map((e, i) => {
          const r = route(byId[e.from], byId[e.to], e.offset, e.labelAt);
          return (
            <g key={i} className={`mc-edge${e.dashed ? " is-dashed" : ""}${e.highlight ? " is-highlight" : ""}`}>
              <path d={r.d} />
              {e.label && (
                <text x={r.lx} y={r.ly} textAnchor={r.anchor as "start" | "end"}>
                  {e.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      {nodes.map(n => (
        <div key={n.id} className="mc-wrap" style={{ left: pct(n.x, W), top: pct(n.y, height), width: pct(n.w ?? NODE_W, W) }}>
          {n.above && <div className="mc-above">{n.above}</div>}
          <div
            className={`mc-node${n.current ? " is-current" : ""}${n.candidate ? " is-candidate" : ""}${n.dim ? " is-dim" : ""}`}
            style={{ height: `calc(${NODE_H} * var(--mu))` }}
          >
            <span className="mc-name">
              {n.label}
              {n.alias && <span className="mc-alias"> ({n.alias})</span>}
            </span>
            {n.detail && <span className="mc-detail">{n.detail}</span>}
          </div>
          {n.chips?.map(([label, chips]) => (
            <div key={label} className="mc-chips">
              <span className="mc-chip-label">{label}</span>
              {chips.map(c => (
                <span key={c} className={`mc-chip${c.startsWith("🔒") ? " is-masked" : ""}`}>
                  {c}
                </span>
              ))}
            </div>
          ))}
          {n.below}
        </div>
      ))}
      {overlay}
    </div>
  );
};

export default MiniCanvas;

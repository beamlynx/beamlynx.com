import type React from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";
import { getLangFromPathname, localizedPath } from "../i18n/paths";
import { trackEvent } from "../utils/analytics";
import { DEMO_STEPS, JOIN_CANDIDATES } from "../components/home/demoSteps";
import MiniCanvas from "../components/MiniCanvas";
import type { MiniEdge, MiniNode } from "../components/MiniCanvas";

// The page follows the order Beamlynx is pitched in: what makes it safe to
// use with an AI agent first, then building queries yourself, then the rest
// in a short list, then the facts a careful reader asks about.
//
// Each lead feature has a drawing beside it. They are drawings, not
// screenshots (the page says so), but the names, values and SQL in them are
// real. Rows and join candidates come from demoSteps.ts (recorded Pine
// output from the sample shop database). The masked SQL follows what Pine
// generates under a masking rule: a masked column is selected as
// 'xxxxx' AS "column", and a filter on it compares the real column with a
// parameter (see pine/test/pine/db/policy_test.clj in beamlynx-desktop).

const OG_IMAGE = "https://beamlynx.com/og-image.png";
const REPO_URL = "https://github.com/beamlynx/beamlynx-desktop";

const AGENT_FEATURES = ["masking", "readonly", "filter"] as const;
const QUERY_FEATURES = ["language", "joins", "edit"] as const;
type LeadFeature = (typeof AGENT_FEATURES)[number] | (typeof QUERY_FEATURES)[number];

// Kept as anchors: the homepage and old links point at /features#paths etc.
const MORE_FEATURES = ["paths", "traverse", "sql", "keyboard", "grid"] as const;

// --- Drawing parts ------------------------------------------------------------

const Pipe = () => <span className="fv-pipe">|</span>;

/** A panel with a small caption, like a pane in the app. */
const Pane = ({ label, children, tone }: { label: string; children: React.ReactNode; tone?: "agent" | "app" }) => (
  <div className={`fv-pane${tone ? ` is-${tone}` : ""}`}>
    <div className="fv-pane-label">{label}</div>
    <div className="fv-pane-body">{children}</div>
  </div>
);

const Arrow = () => (
  <div className="fv-arrow" aria-hidden="true">
    <svg viewBox="0 0 12 22" width="12" height="22">
      <path d="M6 0 V18 M1 13 L6 19 L11 13" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  </div>
);

const Masked = () => <span className="fv-xxxxx">xxxxx</span>;

// --- Drawings -----------------------------------------------------------------

const MaskingVisual = () => {
  const { t } = useTranslation("features");
  return (
    <div className="fv-flow">
      <Pane label={t("visual.agentSends")} tone="agent">
        <code className="fv-line">
          customers <Pipe /> select: first_name, email
        </code>
      </Pane>
      <Arrow />
      <Pane label={t("visual.beamlynxWrites")} tone="app">
        <div className="fv-rule">
          <span className="fv-rule-col">customers.email</span>
          <span className="fv-rule-state">{t("visual.masked")}</span>
        </div>
        <code className="fv-sql">
          SELECT "c_0"."first_name", <mark>'xxxxx' AS "email"</mark>
          {"\n"}FROM "customers" AS "c_0"
        </code>
      </Pane>
      <Arrow />
      <Pane label={t("visual.agentGets")} tone="agent">
        <table className="fv-grid">
          <thead>
            <tr>
              <th>first_name</th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            {DEMO_STEPS[0].rows.slice(0, 3).map(r => (
              <tr key={String(r[0])}>
                <td>{String(r[0])}</td>
                <td>
                  <Masked />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Pane>
    </div>
  );
};

const ReadonlyVisual = () => {
  const { t } = useTranslation("features");
  const queries = [
    "customers | describe:",
    "customers | references:",
    "customers | orders .customer_id | group: c_0.first_name with count | where: count > 1",
  ];
  return (
    <div className="fv-app">
      <div className="fv-app-bar">
        <span className="fv-tab is-active">
          <span className="fv-agent-dot" />
          {t("visual.agentTab")}
        </span>
        <span className="fv-tab">customers</span>
        <span className="fv-tab">orders</span>
      </div>
      <div className="fv-timeline">
        <div className="fv-question">{t("visual.question")}</div>
        {queries.map(q => (
          <div key={q} className="fv-step">
            <span className="fv-step-dot" />
            <code>{q}</code>
          </div>
        ))}
        <div className="fv-proposal">
          <div className="fv-proposal-title">{t("visual.proposalTitle")}</div>
          <div className="fv-proposal-reason">{t("visual.proposalReason")}</div>
          <div className="fv-actions">
            <span className="fv-btn is-primary">{t("visual.apply")}</span>
            <span className="fv-btn">{t("visual.decline")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterVisual = () => {
  const { t } = useTranslation("features");
  const jane = DEMO_STEPS[0].rows[0];
  return (
    <div className="fv-flow">
      <Pane label={t("visual.agentSends")} tone="agent">
        <code className="fv-line">
          customers <Pipe /> where: email = '{String(jane[1])}'
          {"\n"}
          <Pipe /> select: first_name, email
        </code>
      </Pane>
      <Arrow />
      <Pane label={t("visual.beamlynxWrites")} tone="app">
        <code className="fv-sql">
          SELECT "c_0"."first_name", 'xxxxx' AS "email"
          {"\n"}FROM "customers" AS "c_0"
          {"\n"}
          <mark className="is-ok">WHERE "c_0"."email" = ?</mark>
        </code>
      </Pane>
      <Arrow />
      <Pane label={t("visual.agentGets")} tone="agent">
        <table className="fv-grid">
          <thead>
            <tr>
              <th>first_name</th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{String(jane[0])}</td>
              <td>
                <Masked />
              </td>
            </tr>
          </tbody>
        </table>
      </Pane>
    </div>
  );
};

const LanguageVisual = () => {
  // Each step of the query, and the part of the canvas it draws.
  const steps: [string, string][] = [
    ["customers", "1"],
    ["where: is_active = true", "2"],
    ["orders .customer_id", "3"],
  ];
  // As in the app: the canvas on top, the query below it, one step a line.
  const query = (
    <code className="fv-line fv-steps">
      {steps.map(([s, n], i) => (
        <span key={n} className="fv-step-line">
          <span className="fv-num">{n}</span>
          {i > 0 && (
            <>
              <Pipe />{" "}
            </>
          )}
          {s}
        </span>
      ))}
    </code>
  );
  return (
    <div className="fv-stack">
      <MiniCanvas
        height={180}
        nodes={[
          {
            id: "c",
            x: 20,
            y: 50,
            label: "customers",
            alias: "c_0",
            above: <span className="fv-num">1</span>,
            below: (
              <div className="mc-chips">
                <span className="fv-num">2</span>
                <span className="mc-chip-label">WHERE</span>
                <span className="mc-chip">is_active = true</span>
              </div>
            ),
          },
          {
            id: "o",
            x: 400,
            y: 50,
            label: "orders",
            alias: "o_1",
            current: true,
            detail: "customer_id",
            above: <span className="fv-num">3</span>,
          },
        ]}
        edges={[{ from: "c", to: "o" }]}
      />
      {query}
    </div>
  );
};

const JoinsVisual = () => {
  // What Pine offers from `orders`: its one parent, customers, and the
  // tables that point at it. (It also belongs to customer_addresses twice;
  // the drawing leaves that out.)
  const has = JOIN_CANDIDATES[1][0].items;
  const nodes: MiniNode[] = [
    { id: "customers", x: 10, y: 140, label: "customers", candidate: true },
    { id: "orders", x: 220, y: 140, label: "orders", alias: "o_1", current: true },
    ...has.map((c, i) => ({
      id: `h${i}`,
      x: 430,
      y: 30 + i * 78,
      label: c.table,
      detail: c.schema === "public" ? undefined : c.schema,
      candidate: true,
    })),
  ];
  const edges: MiniEdge[] = nodes.filter(n => n.id !== "orders").map(n => ({ from: "orders", to: n.id }));
  return (
    <MiniCanvas
      height={300}
      nodes={nodes}
      edges={edges}
      overlay={
        <>
          <span className="mc-tag" style={{ left: "1.7%", top: "38%" }}>belongs to</span>
          <span className="mc-tag is-accent" style={{ right: "1.7%", top: "0%" }}>has</span>
        </>
      }
    />
  );
};

const EditVisual = () => {
  const s = DEMO_STEPS[1];
  const cols = ["first_name", "order_number", "status"];
  const idx = cols.map(c => s.columns.indexOf(c));
  return (
    <div className="fv-stack">
      <MiniCanvas
        height={110}
        nodes={[
          { id: "c", x: 10, y: 20, label: "customers", alias: "c_0" },
          { id: "o", x: 430, y: 20, label: "orders", alias: "o_1", current: true },
        ]}
        edges={[{ from: "c", to: "o" }]}
      />
      <table className="fv-grid">
        <thead>
          <tr>
            {cols.map(c => (
              <th key={c}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {s.rows.slice(0, 3).map((r, i) => (
            <tr key={i}>
              {idx.map((j, k) => (
                <td key={k} className={i === 1 && k === 2 ? "is-edited" : undefined}>
                  {i === 1 && k === 2 ? "delivered" : String(r[j])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const VISUALS: Record<LeadFeature, () => React.ReactElement> = {
  masking: MaskingVisual,
  readonly: ReadonlyVisual,
  filter: FilterVisual,
  language: LanguageVisual,
  joins: JoinsVisual,
  edit: EditVisual,
};

// --- Page ---------------------------------------------------------------------

const Feature = ({ id }: { id: LeadFeature }) => {
  const { t } = useTranslation("features");
  const Visual = VISUALS[id];
  return (
    <motion.article
      id={id}
      className="feat"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4 }}
    >
      <div className="feat-text">
        <h3>{t(`items.${id}.title`)}</h3>
        <p>{t(`items.${id}.body`)}</p>
      </div>
      <div className="feat-visual" aria-hidden="true">
        <Visual />
      </div>
    </motion.article>
  );
};

const Features = () => {
  const { t } = useTranslation(["features", "docs"]);
  const location = useLocation();
  const lang = getLangFromPathname(location.pathname) ?? "en";
  const downloadHref = localizedPath(lang, "/download");
  const agentsHref = localizedPath(lang, "/docs/agents");
  const privacyHref = localizedPath(lang, "/privacy");
  const facts = t("facts.items", { returnObjects: true }) as string[];

  // Links like /features#paths (from the homepage) scroll here once the
  // page has rendered; ScrollToTop leaves hash links alone.
  useEffect(() => {
    const id = location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView();
  }, [location.hash, location.key]);

  const link = "underline decoration-dotted underline-offset-2 hover:no-underline";

  return (
    <div className="bp-page home features flex flex-col min-h-screen">
      <title>{t("meta.title")}</title>
      <meta name="description" content={t("meta.description")} />
      <meta property="og:title" content={t("meta.title")} />
      <meta property="og:description" content={t("meta.description")} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://beamlynx.com/features" />
      <meta property="og:image" content={OG_IMAGE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={OG_IMAGE} />

      <section className="home-hero px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="home-title">{t("heading")}</h1>
          <p className="home-lede mt-6">{t("lede")}</p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20">
        <div className="mx-auto max-w-6xl">
          <header className="feat-group">
            <h2>
              {t("groups.agents.heading")}
              <span className="feat-badge">{t("docs:section.experimental")}</span>
            </h2>
            <p>{t("groups.agents.intro")}</p>
          </header>
          <div className="feat-list">
            {AGENT_FEATURES.map(id => (
              <Feature key={id} id={id} />
            ))}
          </div>
          <p className="feat-caveat">
            {t("groups.agents.caveat")}{" "}
            <Link to={agentsHref} className={link}>
              {t("groups.agents.link")}
            </Link>
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 mt-24 sm:mt-32">
        <div className="mx-auto max-w-6xl">
          <header className="feat-group">
            <h2>{t("groups.queries.heading")}</h2>
            <p>{t("groups.queries.intro")}</p>
          </header>
          <div className="feat-list">
            {QUERY_FEATURES.map(id => (
              <Feature key={id} id={id} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 mt-24 sm:mt-32">
        <div className="mx-auto max-w-6xl">
          <header className="feat-group">
            <h2>{t("groups.more.heading")}</h2>
          </header>
          <div className="feat-more">
            {MORE_FEATURES.map(id => (
              <article key={id} id={id}>
                <h3>{t(`items.${id}.title`)}</h3>
                <p>{t(`items.${id}.body`)}</p>
              </article>
            ))}
          </div>
          <p className="feat-footnote">{t("drawingsNote")}</p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 mt-24">
        <div className="mx-auto max-w-6xl feat-facts">
          <h2>{t("facts.heading")}</h2>
          <ul>
            {facts.map(item => (
              <li key={item}>{item}</li>
            ))}
            <li>
              <Trans
                t={t}
                i18nKey="facts.license"
                components={{ 1: <a href={REPO_URL} className={link} target="_blank" rel="noreferrer" /> }}
              />
            </li>
            <li>
              <Trans t={t} i18nKey="facts.privacy" components={{ 1: <Link to={privacyHref} className={link} /> }} />
            </li>
          </ul>
        </div>
      </section>

      <section className="home-closing px-4 sm:px-6 lg:px-8">
        <h2>{t("closing.heading")}</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            to={downloadHref}
            className="bp-btn bp-btn-primary"
            onClick={() => trackEvent("features_download_clicked")}
          >
            {t("closing.download")}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Features;

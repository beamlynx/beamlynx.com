import { motion } from "framer-motion";
import { DEFAULT_EXAMPLE_QUERY, openInPlayground } from "../utils/playground";

// Matches how the app itself prettifies a Pine expression (see
// DocumentationSection.tsx's `expression.split('|').join('\n|')`): every
// pipe-delimited step after the first starts its own line, pipe-first.
const formatPineQuery = (expression: string): string[] =>
  expression.split("|").map(part => part.trim());

const PINE_KEYWORDS = ["select:", "limit:", "where:", "order:", "group:", ":parent"];
const PINE_KEYWORD_RE = new RegExp(`(${PINE_KEYWORDS.join("|")})`, "g");

const highlightPineKeywords = (line: string) =>
  line
    .split(PINE_KEYWORD_RE)
    .map((part, i) =>
      PINE_KEYWORDS.includes(part) ? (
        <span key={i} className="tk-kw">
          {part}
        </span>
      ) : (
        part
      ),
    );

const Home = () => {
  return (
    <div className="bp-page flex flex-col min-h-screen">
      <title>beamlynx - Visual & Intuitive Database Queries</title>
      <meta
        name="description"
        content="Beamlynx is a visual database client that makes database interactions delightful. Explore and interact with your data using pine-lang, a simple, intuitive query language."
      />
      <meta
        property="og:title"
        content="Beamlynx - Visual & Intuitive Database Queries"
      />
      <meta
        property="og:description"
        content="A visual database client that makes database interactions delightful. Explore and interact with your data using pine-lang, a simple, intuitive query language."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://beamlynx.org" />
      <meta
        property="og:image"
        content="https://beamlynx.org/pine-social-preview.svg"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Beamlynx - Visual & Intuitive Database Queries"
      />
      <meta
        name="twitter:description"
        content="A visual database client that makes database interactions delightful."
      />
      <meta
        name="twitter:image"
        content="https://beamlynx.org/pine-social-preview.svg"
      />

      {/* Hero Section */}
      <section className="px-4 pt-16 pb-14 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="mx-auto max-w-6xl w-full grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-12 lg:gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="bp-eyebrow mb-5">Visual database client</p>
            <h1 className="text-[28px] sm:text-4xl lg:text-[46px] leading-[1.15] tracking-tight max-w-[15ch]">
              Explore databases
              <br />
              <span style={{ color: "var(--bp-trace)" }}>
                visually and intuitively
              </span>
            </h1>
            <p
              className="mt-6 max-w-[46ch] text-[17px] leading-relaxed"
              style={{ color: "var(--bp-text-dim)" }}
            >
              Write queries in <code>pine-lang</code>, a simple, composable
              language that converts seamlessly to SQL — while your
              database's relationships render live as a schematic you can
              click through.
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <button
                onClick={() => openInPlayground(DEFAULT_EXAMPLE_QUERY, 'home_hero')}
                className="bp-btn bp-btn-primary"
              >
                Try it in the Playground <span aria-hidden="true">↗</span>
              </button>
              <a href="/download" className="bp-btn bp-btn-ghost">
                Download for desktop
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="bp-viewport">
              <span className="bp-vp-bl"></span>
              <span className="bp-vp-br"></span>
              <svg
                className="bp-diagram"
                viewBox="0 0 680 330"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Canvas mode diagram of the customers, orders, order_items and products tables joined in sequence, matching the query below"
              >
                {/* traces - the same right-angle "circuit trace" routing canvas mode's edges use */}
                <path d="M 166 80 H 176 V 216 H 182" fill="none" stroke="#4fd1ff" strokeWidth="1.5" />
                <path d="M 332 216 H 340 V 80 H 348" fill="none" stroke="#4fd1ff" strokeWidth="1.5" />
                <path d="M 498 80 H 506 V 216 H 514" fill="none" stroke="#4fd1ff" strokeWidth="1.5" />

                {/* customers - the current/start node: thicker border + lighter fill, same treatment canvas mode gives the node you're actively editing */}
                <g>
                  <path d="M 16 40 L 166 40 L 166 152 L 24 152 L 16 144 Z" fill="#123554" stroke="#4fd1ff" strokeWidth="2.5" />
                  <rect x="7" y="31" width="18" height="18" rx="3" fill="#4fd1ff" />
                  <text x="16" y="44.5" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11" fontWeight="700" fill="#06131f">1</text>
                  <text x="28" y="60" fontFamily="IBM Plex Mono, monospace" fontSize="12" fontWeight="500" fill="#dbeeff">customers</text>
                  <rect x="162.5" y="76.5" width="7" height="7" rx="1" fill="#5c86a8" />
                  <text x="154" y="84" textAnchor="end" fontFamily="IBM Plex Mono, monospace" fontSize="8.5" fill="#7ba3c2">id</text>
                  <text x="28" y="106" fontFamily="IBM Plex Mono, monospace" fontSize="7.5" fontWeight="700" letterSpacing="0.3" fill="#7ba3c2">SEL</text>
                  <rect x="54" y="98" width="66" height="16" rx="3" fill="#132a41" stroke="#28577c" />
                  <circle cx="61" cy="106" r="2" fill="#5c86a8" />
                  <text x="67" y="109" fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="#dbeeff">first_name</text>
                  <rect x="54" y="122" width="60" height="16" rx="3" fill="#132a41" stroke="#28577c" />
                  <circle cx="61" cy="130" r="2" fill="#5c86a8" />
                  <text x="67" y="133" fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="#dbeeff">last_name</text>
                </g>

                {/* orders */}
                <g>
                  <path d="M 182 176 L 332 176 L 332 288 L 190 288 L 182 280 Z" fill="#0f2337" stroke="#2c5578" strokeWidth="1.5" />
                  <rect x="173" y="167" width="18" height="18" rx="3" fill="#4fd1ff" />
                  <text x="182" y="180.5" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11" fontWeight="700" fill="#06131f">2</text>
                  <text x="194" y="196" fontFamily="IBM Plex Mono, monospace" fontSize="12" fontWeight="500" fill="#dbeeff">orders</text>
                  <rect x="178.5" y="212.5" width="7" height="7" rx="1" fill="#5c86a8" />
                  <text x="196" y="220" fontFamily="IBM Plex Mono, monospace" fontSize="8.5" fill="#7ba3c2">customer_id</text>
                  <rect x="328.5" y="212.5" width="7" height="7" rx="1" fill="#5c86a8" />
                  <text x="318" y="220" textAnchor="end" fontFamily="IBM Plex Mono, monospace" fontSize="8.5" fill="#7ba3c2">id</text>
                </g>

                {/* order_items */}
                <g>
                  <path d="M 348 40 L 498 40 L 498 152 L 356 152 L 348 144 Z" fill="#0f2337" stroke="#2c5578" strokeWidth="1.5" />
                  <rect x="339" y="31" width="18" height="18" rx="3" fill="#4fd1ff" />
                  <text x="348" y="44.5" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11" fontWeight="700" fill="#06131f">3</text>
                  <text x="360" y="60" fontFamily="IBM Plex Mono, monospace" fontSize="12" fontWeight="500" fill="#dbeeff">order_items</text>
                  <rect x="344.5" y="76.5" width="7" height="7" rx="1" fill="#5c86a8" />
                  <text x="362" y="84" fontFamily="IBM Plex Mono, monospace" fontSize="8.5" fill="#7ba3c2">order_id</text>
                  <rect x="494.5" y="76.5" width="7" height="7" rx="1" fill="#5c86a8" />
                  <text x="484" y="84" textAnchor="end" fontFamily="IBM Plex Mono, monospace" fontSize="8.5" fill="#7ba3c2">product_id</text>
                </g>

                {/* products */}
                <g>
                  <path d="M 514 176 L 664 176 L 664 288 L 522 288 L 514 280 Z" fill="#0f2337" stroke="#2c5578" strokeWidth="1.5" />
                  <rect x="505" y="167" width="18" height="18" rx="3" fill="#4fd1ff" />
                  <text x="514" y="180.5" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11" fontWeight="700" fill="#06131f">4</text>
                  <text x="526" y="196" fontFamily="IBM Plex Mono, monospace" fontSize="12" fontWeight="500" fill="#dbeeff">products</text>
                  <rect x="509.5" y="212.5" width="7" height="7" rx="1" fill="#5c86a8" />
                  <text x="527" y="220" fontFamily="IBM Plex Mono, monospace" fontSize="8.5" fill="#7ba3c2">id</text>
                  <text x="526" y="242" fontFamily="IBM Plex Mono, monospace" fontSize="7.5" fontWeight="700" letterSpacing="0.3" fill="#7ba3c2">SEL</text>
                  <rect x="526" y="248" width="46" height="16" rx="3" fill="#132a41" stroke="#28577c" />
                  <circle cx="533" cy="256" r="2" fill="#5c86a8" />
                  <text x="539" y="259" fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="#dbeeff">name</text>
                  <rect x="576" y="248" width="44" height="16" rx="3" fill="#132a41" stroke="#28577c" />
                  <circle cx="583" cy="256" r="2" fill="#5c86a8" />
                  <text x="589" y="259" fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="#dbeeff">price</text>
                </g>
              </svg>

              <div className="bp-query">
                {formatPineQuery(DEFAULT_EXAMPLE_QUERY).map((line, i) => (
                  <div key={i}>
                    {i > 0 && <span className="tk-pipe">| </span>}
                    {highlightPineKeywords(line)}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8 bp-divider" aria-hidden="true">
        <svg viewBox="0 0 1124 34" preserveAspectRatio="none">
          <path
            d="M 0 17 H 480 L 500 3 H 624 L 644 17 H 1124"
            fill="none"
            stroke="#22496b"
            strokeWidth="1.5"
          />
          <circle cx="500" cy="3" r="2.5" fill="#4fd1ff" />
          <circle cx="644" cy="17" r="2.5" fill="#4fd1ff" />
        </svg>
      </div>

      {/* Features Section */}
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="bp-legend-head">
            <h2>Why beamlynx</h2>
          </div>

          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bp-legend-row"
            >
              <span className="bp-pin"></span>
              <div>
                <h3>Visual</h3>
                <p>
                  See your database's relationships rendered live, as a
                  graph, while you write — no separate ERD tool to keep in
                  sync.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bp-legend-row"
            >
              <span className="bp-pin amber"></span>
              <div>
                <h3>Composable</h3>
                <p>
                  <code>pine-lang</code> is a composable domain-specific
                  language that converts straight to SQL. Focus on the
                  shape of the question, not the syntax.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bp-legend-row"
            >
              <span className="bp-pin dim"></span>
              <div>
                <h3>Interactive</h3>
                <p>
                  Click through tables in a live graph and watch the query
                  build itself — join paths light up as you go.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bp-closing px-4 sm:px-6 lg:px-8">
        <p className="bp-eyebrow" style={{ justifyContent: "center" }}>
          No account. No setup.
        </p>
        <h2>Point it at a database and start exploring.</h2>
        <div className="flex flex-wrap gap-3.5 justify-center">
          <button
            onClick={() => openInPlayground(DEFAULT_EXAMPLE_QUERY, 'home_closing_cta')}
            className="bp-btn bp-btn-primary"
          >
            Try it in the Playground <span aria-hidden="true">↗</span>
          </button>
          <a href="/download" className="bp-btn bp-btn-ghost">
            Download for desktop
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;

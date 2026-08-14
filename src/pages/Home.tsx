import { motion } from "framer-motion";
import { DEFAULT_EXAMPLE_QUERY, openInPlayground } from "../utils/playground";

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
                onClick={() => openInPlayground(DEFAULT_EXAMPLE_QUERY)}
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
                viewBox="0 0 620 280"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Schematic diagram of the customers, orders, order_items and products tables joined in sequence"
              >
                {/* traces */}
                <path
                  d="M 148 68 H 158 V 204 H 168"
                  fill="none"
                  stroke="#4fd1ff"
                  strokeWidth="2"
                />
                <path
                  d="M 300 204 H 310 V 68 H 320"
                  fill="none"
                  stroke="#4fd1ff"
                  strokeWidth="2"
                />
                <path
                  d="M 452 68 H 462 V 204 H 472"
                  fill="none"
                  stroke="#4fd1ff"
                  strokeWidth="2"
                />
                <circle cx="158" cy="68" r="2.5" fill="#4fd1ff" />
                <circle cx="310" cy="204" r="2.5" fill="#4fd1ff" />
                <circle cx="462" cy="68" r="2.5" fill="#4fd1ff" />

                {/* customers - the query's start node, solid header */}
                <g>
                  <rect x="16" y="36" width="132" height="64" rx="3" fill="#123554" stroke="#4fd1ff" strokeWidth="1.5" />
                  <rect x="16" y="36" width="132" height="20" rx="3" fill="#4fd1ff" />
                  <text x="82" y="50" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10.5" fontWeight="600" fill="#06131f">customers</text>
                  <text x="28" y="76" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fill="#dbeeff">id</text>
                  <text x="28" y="90" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fill="#7ba3c2">first_name</text>
                  <rect x="144.5" y="64.5" width="7" height="7" fill="#4fd1ff" />
                </g>

                {/* orders */}
                <g>
                  <rect x="168" y="172" width="132" height="64" rx="3" fill="#0f2337" stroke="#4fd1ff" strokeWidth="1.5" />
                  <rect x="168" y="172" width="132" height="20" rx="3" fill="#1c3b57" />
                  <text x="234" y="186" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10.5" fontWeight="600" fill="#dbeeff">orders</text>
                  <text x="180" y="212" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fill="#dbeeff">customer_id</text>
                  <text x="180" y="226" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fill="#7ba3c2">id</text>
                  <rect x="164.5" y="200.5" width="7" height="7" fill="#4fd1ff" />
                  <rect x="296.5" y="200.5" width="7" height="7" fill="#4fd1ff" />
                </g>

                {/* order_items */}
                <g>
                  <rect x="320" y="36" width="132" height="64" rx="3" fill="#0f2337" stroke="#4fd1ff" strokeWidth="1.5" />
                  <rect x="320" y="36" width="132" height="20" rx="3" fill="#1c3b57" />
                  <text x="386" y="50" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10.5" fontWeight="600" fill="#dbeeff">order_items</text>
                  <text x="332" y="76" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fill="#dbeeff">order_id</text>
                  <text x="332" y="90" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fill="#dbeeff">product_id</text>
                  <rect x="316.5" y="64.5" width="7" height="7" fill="#4fd1ff" />
                  <rect x="448.5" y="64.5" width="7" height="7" fill="#4fd1ff" />
                </g>

                {/* products */}
                <g>
                  <rect x="472" y="172" width="132" height="64" rx="3" fill="#0f2337" stroke="#4fd1ff" strokeWidth="1.5" />
                  <rect x="472" y="172" width="132" height="20" rx="3" fill="#1c3b57" />
                  <text x="538" y="186" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10.5" fontWeight="600" fill="#dbeeff">products</text>
                  <text x="484" y="212" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fill="#dbeeff">id</text>
                  <text x="484" y="226" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fill="#7ba3c2">name, price</text>
                  <rect x="468.5" y="200.5" width="7" height="7" fill="#4fd1ff" />
                </g>
              </svg>

              <div className="bp-query">
                customers <span className="tk-pipe">|</span>{" "}
                <span className="tk-kw">select:</span> first_name, last_name,{" "}
                <span className="tk-pipe">|</span> public.orders
                .customer_id <span className="tk-pipe">|</span>{" "}
                public.order_items .order_id{" "}
                <span className="tk-pipe">|</span> public.products
                .product_id <span className="tk-kw">:parent</span>{" "}
                <span className="tk-pipe">|</span>{" "}
                <span className="tk-kw">select:</span> name, price{" "}
                <span className="tk-pipe">|</span>{" "}
                <span className="tk-kw">limit:</span> 10
              </div>

              <div className="bp-caption">
                <span>Fig. 01 — canvas mode</span>
                <strong>customers → orders → order_items → products</strong>
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
            <h2>What's on this sheet</h2>
            <span>03 components</span>
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
                <h3>Visual database client</h3>
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
                <h3>pine-lang DSL</h3>
                <p>
                  A composable query language that converts straight to
                  SQL. Focus on the shape of the question, not the syntax.
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
                <h3>Interactive canvas</h3>
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
            onClick={() => openInPlayground(DEFAULT_EXAMPLE_QUERY)}
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

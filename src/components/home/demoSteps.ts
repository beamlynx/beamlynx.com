// Generated, not hand-written: every expression, SQL statement, row and
// join candidate here is what pine-lang 0.47.0 returned for this demo's
// queries against its own sample shop database
// (pine-lang/docker/db/init/001_ecommerce_seed.sql). The SQL is shown exactly
// as Pine built it, including the hidden id columns Beamlynx adds so results
// stay editable. To regenerate, see public/img/README.md.
export type Cell = string | number | null;

export interface DemoStep {
  expression: string[];
  sql: string;
  columns: string[];
  rows: Cell[][];
}

export interface JoinCandidate {
  table: string;
  schema: string;
  /** What picking this row adds to the expression. */
  pine: string;
  /** Set only when the same table is reachable through two columns. */
  columnHint?: string;
}

/** Steps 0-2: customers, then each join. Step 3 (the filter) is applied
 *  to step 2's rows in the browser; see TryIt.tsx. */
export const DEMO_STEPS: DemoStep[] = [
  {
    expression: ["customers","| select: first_name, email"],
    sql: "SELECT \"c_0\".\"first_name\", \"c_0\".\"email\", \"c_0\".id AS \"__c_0__id\" FROM \"customers\" AS \"c_0\" LIMIT 250;",
    columns: ["first_name","email"],
    rows: [
      ["Jane","jane.smith@email.com"],
      ["Bob","bob.johnson@email.com"],
      ["Alice","alice.brown@email.com"],
      ["Charlie","charlie.wilson@email.com"],
      ["Diana","diana.garcia@email.com"],
      ["Frank","frank.miller@email.com"],
      ["Grace","grace.davis@email.com"],
      ["John","john.doe@email.com"],
    ],
  },
  {
    expression: ["customers","| select: first_name, email","| public.orders .customer_id"],
    sql: "SELECT \"c_0\".\"first_name\", \"c_0\".\"email\", \"c_0\".id AS \"__c_0__id\", \"o_1\".id AS \"__o_1__id\", \"o_1\".* FROM \"customers\" AS \"c_0\" JOIN \"public\".\"orders\" AS \"o_1\" ON \"c_0\".\"id\" = \"o_1\".\"customer_id\" LIMIT 250;",
    columns: ["first_name","email","id","order_number","customer_id","status","subtotal","tax_amount","shipping_amount","discount_amount","total_amount","currency","shipping_address_id","billing_address_id","payment_method","payment_status","notes","created_at","updated_at","shipped_at","delivered_at"],
    rows: [
      ["Jane","jane.smith@email.com",2,"ORD-2024-002",2,"delivered",598,47.84,15.99,50,611.83,"USD",3,3,"paypal","paid",null,"2024-01-18T14:15:00Z","2026-09-12T10:20:58Z","2024-01-19T11:30:00Z","2024-01-22T16:45:00Z"],
      ["Bob","bob.johnson@email.com",3,"ORD-2024-003",3,"shipped",1299,103.92,0,0,1402.92,"USD",4,4,"credit_card","paid",null,"2024-01-20T09:45:00Z","2026-09-12T10:20:58Z","2024-01-21T08:15:00Z",null],
      ["Alice","alice.brown@email.com",4,"ORD-2024-004",4,"confirmed",104.98,8.4,12.99,0,126.37,"USD",5,5,"credit_card","paid",null,"2024-01-22T16:20:00Z","2026-09-12T10:20:58Z",null,null],
      ["Charlie","charlie.wilson@email.com",5,"ORD-2024-005",5,"pending",999,79.92,0,0,1078.92,"USD",6,6,"bank_transfer","pending",null,"2024-01-25T11:10:00Z","2026-09-12T10:20:58Z",null,null],
      ["Diana","diana.garcia@email.com",7,"ORD-2024-007",6,"cancelled",79.99,6.4,8.99,0,95.38,"USD",7,7,"credit_card","refunded",null,"2024-01-10T15:30:00Z","2026-09-12T10:20:58Z",null,null],
      ["Frank","frank.miller@email.com",8,"ORD-2024-008",7,"delivered",29.99,2.4,0,0,32.39,"USD",8,8,"credit_card","paid",null,"2024-01-08T09:15:00Z","2026-09-12T10:20:58Z",null,"2024-01-08T09:16:00Z"],
      ["John","john.doe@email.com",6,"ORD-2024-006",1,"delivered",349,27.92,9.99,0,386.91,"USD",1,2,"credit_card","paid",null,"2024-01-12T13:45:00Z","2026-09-12T10:20:58Z","2024-01-13T10:20:00Z","2024-01-15T12:30:00Z"],
      ["John","john.doe@email.com",1,"ORD-2024-001",1,"delivered",2499,199.92,0,0,2698.92,"USD",1,2,"credit_card","paid",null,"2024-01-15T10:30:00Z","2026-09-12T10:20:58Z","2024-01-16T09:00:00Z","2024-01-18T14:30:00Z"],
    ],
  },
  {
    expression: ["customers","| select: first_name, email","| public.orders .customer_id","| public.order_items .order_id"],
    sql: "SELECT \"c_0\".\"first_name\", \"c_0\".\"email\", \"c_0\".id AS \"__c_0__id\", \"o_1\".id AS \"__o_1__id\", \"oi_2\".id AS \"__oi_2__id\", \"oi_2\".* FROM \"customers\" AS \"c_0\" JOIN \"public\".\"orders\" AS \"o_1\" ON \"c_0\".\"id\" = \"o_1\".\"customer_id\" JOIN \"public\".\"order_items\" AS \"oi_2\" ON \"o_1\".\"id\" = \"oi_2\".\"order_id\" LIMIT 250;",
    columns: ["first_name","email","id","order_id","product_id","quantity","unit_price","total_price","created_at"],
    rows: [
      ["Jane","jane.smith@email.com",3,2,6,1,249,249,"2026-09-12T10:20:58Z"],
      ["Jane","jane.smith@email.com",2,2,5,1,349,349,"2026-09-12T10:20:58Z"],
      ["Bob","bob.johnson@email.com",4,3,2,1,1299,1299,"2026-09-12T10:20:58Z"],
      ["Alice","alice.brown@email.com",6,4,10,1,79.99,79.99,"2026-09-12T10:20:58Z"],
      ["Alice","alice.brown@email.com",5,4,9,1,24.99,24.99,"2026-09-12T10:20:58Z"],
      ["Charlie","charlie.wilson@email.com",7,5,3,1,999,999,"2026-09-12T10:20:58Z"],
      ["Diana","diana.garcia@email.com",9,7,10,1,79.99,79.99,"2026-09-12T10:20:58Z"],
      ["Frank","frank.miller@email.com",10,8,12,1,29.99,29.99,"2026-09-12T10:20:58Z"],
      ["John","john.doe@email.com",8,6,5,1,349,349,"2026-09-12T10:20:58Z"],
      ["John","john.doe@email.com",1,1,1,1,2499,2499,"2026-09-12T10:20:58Z"],
    ],
  },
];

/** The join picker's contents at steps 0 and 1, grouped like the app's:
 *  "has" (tables that point at this one) and "belongs to" (tables this one
 *  points at). The demo follows DEMO_PATH; the app joins any of them. */
export const JOIN_CANDIDATES: { label: "has" | "belongs to"; items: JoinCandidate[] }[][] = [
  [
    {
      "label": "has",
      "items": [
        {
          "table": "orders",
          "schema": "public",
          "pine": "public.orders .customer_id"
        },
        {
          "table": "data_changes",
          "schema": "audit",
          "pine": "audit.data_changes .changed_by"
        },
        {
          "table": "user_sessions",
          "schema": "audit",
          "pine": "audit.user_sessions .customer_id"
        },
        {
          "table": "payment_events",
          "schema": "audit",
          "pine": "audit.payment_events .customer_id"
        },
        {
          "table": "security_events",
          "schema": "audit",
          "pine": "audit.security_events .customer_id"
        },
        {
          "table": "api_access_logs",
          "schema": "audit",
          "pine": "audit.api_access_logs .customer_id"
        },
        {
          "table": "product_reviews",
          "schema": "public",
          "pine": "public.product_reviews .customer_id"
        },
        {
          "table": "customer_addresses",
          "schema": "public",
          "pine": "public.customer_addresses .customer_id"
        },
        {
          "table": "email_notifications",
          "schema": "audit",
          "pine": "audit.email_notifications .customer_id"
        },
        {
          "table": "order_status_changes",
          "schema": "audit",
          "pine": "audit.order_status_changes .changed_by"
        }
      ]
    }
  ],
  [
    {
      "label": "has",
      "items": [
        {
          "table": "order_items",
          "schema": "public",
          "pine": "public.order_items .order_id"
        },
        {
          "table": "payment_events",
          "schema": "audit",
          "pine": "audit.payment_events .order_id"
        },
        {
          "table": "product_reviews",
          "schema": "public",
          "pine": "public.product_reviews .order_id"
        },
        {
          "table": "order_status_changes",
          "schema": "audit",
          "pine": "audit.order_status_changes .order_id"
        }
      ]
    },
    {
      "label": "belongs to",
      "items": [
        {
          "table": "customers",
          "schema": "public",
          "pine": "public.customers .customer_id :parent"
        },
        {
          "table": "customer_addresses",
          "schema": "public",
          "pine": "public.customer_addresses .shipping_address_id :parent",
          "columnHint": "id"
        },
        {
          "table": "customer_addresses",
          "schema": "public",
          "pine": "public.customer_addresses .billing_address_id :parent",
          "columnHint": "id"
        }
      ]
    }
  ]
];

export const DEMO_PATH = ["public.orders .customer_id","public.order_items .order_id"];

/** order_items' columns, for the WHERE picker. Only numeric ones can be
 *  filtered here, because the browser does the filtering. */
export const WHERE_COLUMNS: { name: string; numeric: boolean }[] = [{"name":"id","numeric":true},{"name":"order_id","numeric":true},{"name":"product_id","numeric":true},{"name":"quantity","numeric":true},{"name":"unit_price","numeric":true},{"name":"total_price","numeric":true},{"name":"created_at","numeric":false}];

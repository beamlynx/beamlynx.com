// Generated, not hand-written: every expression, SQL statement and row here
// is what pine-lang 0.47.0 returned for this demo's queries against its own
// sample shop database (pine-lang/docker/db/init/001_ecommerce_seed.sql).
// The SQL is shown exactly as Pine built it, including the hidden id columns
// beamlynx adds so results stay editable.
export interface DemoStep {
  expression: string[];
  sql: string;
  columns: string[];
  rows: (string | number | null)[][];
}

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
    expression: ["customers","| select: first_name","| public.orders .customer_id","| select: order_number, status"],
    sql: "SELECT \"c_0\".\"first_name\", \"o_1\".\"order_number\", \"o_1\".\"status\", \"c_0\".id AS \"__c_0__id\", \"o_1\".id AS \"__o_1__id\" FROM \"customers\" AS \"c_0\" JOIN \"public\".\"orders\" AS \"o_1\" ON \"c_0\".\"id\" = \"o_1\".\"customer_id\" LIMIT 250;",
    columns: ["first_name","order_number","status"],
    rows: [
      ["Jane","ORD-2024-002","delivered"],
      ["Bob","ORD-2024-003","shipped"],
      ["Alice","ORD-2024-004","confirmed"],
      ["Charlie","ORD-2024-005","pending"],
      ["Diana","ORD-2024-007","cancelled"],
      ["Frank","ORD-2024-008","delivered"],
      ["John","ORD-2024-006","delivered"],
      ["John","ORD-2024-001","delivered"],
    ],
  },
  {
    expression: ["customers","| select: first_name","| public.orders .customer_id","| select: order_number, status","| public.product_reviews .order_id","| select: rating, title"],
    sql: "SELECT \"c_0\".\"first_name\", \"o_1\".\"order_number\", \"o_1\".\"status\", \"pr_2\".\"rating\", \"pr_2\".\"title\", \"c_0\".id AS \"__c_0__id\", \"o_1\".id AS \"__o_1__id\", \"pr_2\".id AS \"__pr_2__id\" FROM \"customers\" AS \"c_0\" JOIN \"public\".\"orders\" AS \"o_1\" ON \"c_0\".\"id\" = \"o_1\".\"customer_id\" JOIN \"public\".\"product_reviews\" AS \"pr_2\" ON \"o_1\".\"id\" = \"pr_2\".\"order_id\" LIMIT 250;",
    columns: ["first_name","order_number","status","rating","title"],
    rows: [
      ["Jane","ORD-2024-002","delivered",5,"Perfect for workouts"],
      ["Jane","ORD-2024-002","delivered",4,"Great noise cancellation"],
      ["Bob","ORD-2024-003","shipped",4,"Solid laptop"],
      ["Alice","ORD-2024-004","confirmed",3,"Average quality"],
      ["Frank","ORD-2024-008","delivered",5,"Very informative"],
      ["John","ORD-2024-006","delivered",5,"Second pair - still great!"],
    ],
  },
  {
    expression: ["customers","| select: first_name","| public.orders .customer_id","| select: order_number, status","| public.product_reviews .order_id","| select: rating, title","| where: rating = 5"],
    sql: "SELECT \"c_0\".\"first_name\", \"o_1\".\"order_number\", \"o_1\".\"status\", \"pr_2\".\"rating\", \"pr_2\".\"title\", \"c_0\".id AS \"__c_0__id\", \"o_1\".id AS \"__o_1__id\", \"pr_2\".id AS \"__pr_2__id\" FROM \"customers\" AS \"c_0\" JOIN \"public\".\"orders\" AS \"o_1\" ON \"c_0\".\"id\" = \"o_1\".\"customer_id\" JOIN \"public\".\"product_reviews\" AS \"pr_2\" ON \"o_1\".\"id\" = \"pr_2\".\"order_id\" WHERE \"pr_2\".\"rating\" = '5' LIMIT 250;",
    columns: ["first_name","order_number","status","rating","title"],
    rows: [
      ["Jane","ORD-2024-002","delivered",5,"Perfect for workouts"],
      ["John","ORD-2024-006","delivered",5,"Second pair - still great!"],
      ["Frank","ORD-2024-008","delivered",5,"Very informative"],
    ],
  },
];

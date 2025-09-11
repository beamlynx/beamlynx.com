import React from 'react';
import DocumentationSection from '../../components/DocumentationSection';

const Limit: React.FC = () => {
  return (
    <DocumentationSection
      id="limit"
      title="Limit Operation"
      description="The limit operation restricts the number of rows returned from a query. Use 'limit:' or the shorthand 'l:' to specify the maximum number of rows."
      operations={['limit:', 'l:']}
      syntax="table_name | limit: number"
      examples={[
        {
          title: "Limit",
          expression: "customers | limit: 10",
          sql: "SELECT * FROM customers LIMIT 10",
          description: "Get the first 10 rows from the customers table"
        },
        {
          title: "Limit with filter",
          expression: "customers | where: is_active = true | limit: 5",
          sql: "SELECT * FROM customers WHERE is_active = true LIMIT 5",
          description: "Filter customers and limit to 5 results"
        },
        {
          title: "Limit after join",
          expression: "customers | orders | where: total_amount > 100 | limit: 1",
          sql: "SELECT * FROM customers JOIN orders ON customers.id = orders.customer_id WHERE orders.total > 100 LIMIT 1",
          description: "Join customers and orders, filter by total amount, then limit results"
        }
      ]}
    >
    </DocumentationSection>
  );
};

export default Limit; 
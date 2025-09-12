import React from 'react';
import DocumentationSection from '../../components/DocumentationSection';
import type { DocumentationExample } from '../../components/DocumentationSection';

const Group: React.FC = () => {
  const examples: DocumentationExample[] = [
    {
      title: 'Basic grouping',
      expression: "customers as c | s: email | orders as o | group: c.email => count",
      sql: "SELECT c.email, COUNT(1) FROM customers as c JOIN orders as o ON c.id = o.customer_id GROUP BY c.email",
      description: 'Group customers by email and count the number of orders for each customer'
    }
  ];

  return (
    <DocumentationSection
      id="group"
      title="Group Operation"
      operations={['group:', 'g:']}
      syntax="table_name | group: column_name => function"
      description="Used to group the results of a query by a given column."
      examples={examples}
    >
    </DocumentationSection>
  );
};

export default Group; 
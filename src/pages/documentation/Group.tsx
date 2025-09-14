import React from 'react';
import DocumentationSection from '../../components/DocumentationSection';
import type { DocumentationExample } from '../../components/DocumentationSection';

const Group: React.FC = () => {
  const examples: DocumentationExample[] = [
    {
      title: 'Basic grouping',
      expression: "categories as c | products .category_id | order_items .product_id | group: c.name => count",
      sql: "SELECT c.name, COUNT(1) FROM categories as c JOIN products ON c.id = products.category_id JOIN order_items ON products.id = order_items.product_id GROUP BY c.name",
      description: 'Group products by category and count the number of order items for each category'
    }
  ];

  return (
    <DocumentationSection
      id="group"
      title="Group"
      operations={['group:', 'g:']}
      syntax="table_name | group: column_name => function"
      description="Used to group the results of a query by a given column."
      examples={examples}
      isOperation={true}
    >
    </DocumentationSection>
  );
};

export default Group; 
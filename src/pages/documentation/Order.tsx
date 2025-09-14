import React from 'react';
import DocumentationSection from '../../components/DocumentationSection';
import type { DocumentationExample } from '../../components/DocumentationSection';

const Order: React.FC = () => {
  const examples: DocumentationExample[] = [
    {
      title: 'Basic ordering',
      expression: 'customers | order: email',
      sql: 'SELECT * FROM customers ORDER BY email',
      description: 'Sort results by a single column in ascending order'
    },
    {
      title: 'Descending order',
      expression: 'customers | order: email desc',
      sql: 'SELECT * FROM customers ORDER BY email DESC',
      description: 'Sort results in descending order using the desc keyword'
    },
    {
      title: 'Multiple columns',
      expression: 'customers | order: first_name asc, last_name desc',
      sql: 'SELECT * FROM customers ORDER BY first_name ASC, last_name DESC',
      description: 'Sort by multiple columns with different sort directions'
    }
  ];

  return (
    <DocumentationSection
      id="order"
      title="Order"
      description="Sort the results by one or more columns."
      operations={['order:', 'o:']}
      examples={examples}
      isOperation={true}
    />
  );
};

export default Order; 
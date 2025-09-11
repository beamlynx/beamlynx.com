import React from 'react';
import DocumentationSection from '../../components/DocumentationSection';
import type { DocumentationExample } from '../../components/DocumentationSection';

const Select: React.FC = () => {
  const examples: DocumentationExample[] = [
    {
      title: 'Select specific columns',
      expression: 'customers | select: id, email',
      sql: 'SELECT id, email FROM customers',
      description: 'Choose only the columns you need in the result'
    },
    {
      title: 'Select with alias',
      expression: 'customers | s: id as customer_id',
      sql: 'SELECT id as customer_id FROM customers',
      description: 'Rename columns in the output using aliases'
    },
    {
      title: 'Select with table qualification',
      expression: 'customers as c | orders as o | s: c.email, o.total_amount',
      sql: 'SELECT c.id, o.total FROM customers as c JOIN orders as o ON c.id = o.customer_id',
      description: 'Specify which table each column comes from in joins'
    },
  ];

  return (
    <DocumentationSection
      id="select"
      title="Select Operation"
      description="Select columns to return in the query result."
      operations={['select:', 's:']}
      examples={examples}
    />
  );
};

export default Select; 
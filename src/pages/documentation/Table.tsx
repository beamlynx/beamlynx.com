import React from 'react';
import DocumentationSection from '../../components/DocumentationSection';
import type { DocumentationExample } from '../../components/DocumentationSection';

const Table: React.FC = () => {
  const examples: DocumentationExample[] = [
    {
      title: 'Select all',
      expression: 'customers',
      sql: 'SELECT * FROM customers',
    },
    {
      title: 'Table in a schema',
      expression: 'public.customers',
      sql: 'SELECT * FROM public.customers',
    },
    {
      title: 'Table with alias',
      expression: 'customers as c',
      sql: 'SELECT * FROM customers as c',
    }
  ];

  return (
    <DocumentationSection
      id="table"
      title="Table"
      description="This is as simple as it gets! You want to get data from a table? Just write the table name."
      examples={examples}
      isOperation={true}
    />
  );
};

export default Table; 
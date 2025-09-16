import React from 'react';
import DocumentationSection from '../../components/DocumentationSection';
import type { DocumentationExample } from '../../components/DocumentationSection';

const Where: React.FC = () => {
  const examples: DocumentationExample[] = [
    {
      title: 'Condition',
      expression: 'customers | where: first_name = \'John\'',
      sql: 'SELECT * FROM customers WHERE first_name = \'John\'',
      description: 'Filter records where a column equals a specific value'
    },
    {
      title: 'Multiple conditions',
      expression: 'customers | where: first_name like \'John%\' | where: last_name = \'Doe\'',
      sql: 'SELECT * FROM customers WHERE first_name LIKE \'John%\' AND last_name = \'Doe\'',
      description: 'Apply multiple filter conditions with comma separation'
    },
    {
      title: 'NULL',
      expression: 'customers | where: created_at is null',
      sql: 'SELECT * FROM customers WHERE created_at IS NULL',
      description: 'Filter for records with NULL values in a column'
    },
    {
      title: 'NOT NULL',
      expression: 'customers | where: created_at is not null',
      sql: 'SELECT * FROM customers WHERE created_at IS NOT NULL',
      description: 'Filter for records with NOT NULL values in a column'
    },
    {
      title: 'IN clause',
      expression: 'categories | where: name in (\'Electronics\', \'Computers\')',
      sql: 'SELECT * FROM categories WHERE name IN (\'Electronics\', \'Computers\')',
      description: 'Filter for records where column value matches any in a list'
    },
    {
      title: 'Column comparison',
      expression: 'customers | where: created_at < updated_at',
      sql: 'SELECT * FROM customers WHERE created_at < updated_at',
      description: 'Compare values between different columns'
    },
    {
      title: 'LIKE',
      expression: 'customers | where: first_name like \'Jo%\'',
      sql: 'SELECT * FROM customers WHERE first_name LIKE \'Jo%\'',
      description: 'Filter for records using the LIKE operator'
    },
    {
      title: 'ILIKE',
      expression: 'customers | where: first_name ilike \'jo%\'',
      sql: 'SELECT * FROM customers WHERE first_name ILIKE \'jo%\'',
      description: 'Filter for records using the ILIKE operator'
    }
  ];

  return (
    <DocumentationSection
      id="where"
      title="Where"
      description="Filters the results based on conditions."
      operations={['where:', 'w:']}
      examples={examples}
      isOperation={true}
    />
  );
};

export default Where; 
import React from 'react';
import DocumentationSection from '../../components/DocumentationSection';
import type { DocumentationExample } from '../../components/DocumentationSection';

const Join: React.FC = () => {
  const examples: DocumentationExample[] = [
    {
      title: 'Join',
      expression: 'company | employee',
      sql: 'SELECT * FROM company JOIN employee ON company.id = employee.company_id',
      description: 'Two tables based using the foreing key.'
    },
    {
      title: 'Multi-table join',
      expression: 'company | employee | document',
      description: 'Pipe multiple tables together for joining multiple tables'
    },
    {
      title: 'Schema qualified join',
      expression: 'x.company | y.employee | z.document',
      description: 'Use schema qualification when joining across different schemas'
    },
    {
      title: 'Join with context',
      expression: 'company as c | employee | from: c | document',
      description: 'Use aliases and context references for complex join scenarios'
    },
    {
      title: 'Left join',
      expression: 'document | employee :left',
      sql: 'SELECT * FROM document LEFT JOIN employee ON document.employee_id = employee.id',
      description: 'Use the :left modifier to specify a left join'
    },
    {
      title: 'Self join',
      expression: 'categories as p | categories as c',
      sql: 'SELECT c.* FROM categories as p JOIN categories as c ON p.id = c.parent_id',
      description: 'Join a table with itself'
    },
    {
      title: 'Self join with direction / Parent-child relationship',
      expression: 'categories as p | categories as c :parent',
      sql: 'SELECT p.* FROM categories as c JOIN categories as p ON c.parent_id = p.id',
      description: 'By default, the child table is picked for the join i.e. the one that holds the foreing key. If you want to join on the parent table i.e. the one being referenced, then use the :parent modifier. Aliases are used for demonstration purposes.'
    }
  ];

  return (
    <DocumentationSection
      id="join"
      title="Join Operation"
      description="Join tables without having to think of the foreign key relationships. Simply pipe tables together to create joins. However, if you want to specify the join column or other aspects of the join, you can pass the relevant arguments. See examples below:"
      examples={examples}
    >
      <p>
        Supported modifiers:
      </p>
      <ul>
        <li><code>:left</code> - Performs a left outer join, keeping all records from the left table</li>
        <li><code>:right</code> - Performs a right outer join, keeping all records from the right table</li>
        <li><code>:parent</code> - Joins on the parent table (the one being referenced) instead of the child table (the one with the foreign key)</li>
      </ul>
    </DocumentationSection>
  );
};

export default Join; 
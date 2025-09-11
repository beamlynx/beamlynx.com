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
      description="Pine-lang automatically handles joins based on foreign key relationships. Simply pipe tables together to create joins."
      examples={examples}
    >
      <h3>What about left / right joins?</h3>
      <p>
        Pine-lang supports operation modifiers which can be appended to the arguments to change the behaviour of the join.
      </p>
      <p>
        In order to specify the type of a join, you can append the <code>left</code> or <code>right</code> modifier to the join operation e.g. if you want all the documents along with the employees (if they exist) then you need a left join. Using the modified <code>:left</code> modifier, you can specify a left join.
      </p>

      <h3>What about parent child relationships?</h3>
      <p>
        Similar to using the modifier for type of join, you can use the <code>:parent</code> or <code>:child</code>. Imagine you want to find parent folders, you can do:
      </p>
    </DocumentationSection>
  );
};

export default Join; 
import React from 'react';
import DocumentationSection from '../../components/DocumentationSection';
import type { DocumentationExample } from '../../components/DocumentationSection';

const Group: React.FC = () => {
  const examples: DocumentationExample[] = [
    {
      title: 'Basic grouping',
      expression: 'users | group: age => count',
      description: 'Group users by age and count the number of users in each age group'
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
      <h3>Example</h3>
      <p>
        If you want to group the results of the <code>users</code> table by the <code>age</code> column, you can do:
      </p>
      <pre>
        <code>{`users | group: age => count`}</code>
      </pre>
      <p>
        This will return the number of users in each age group.
      </p>
      
      <h3>What about other functions?</h3>
      <p>
        This feature is new and being worked on. Your feedback is welcome.
      </p>
    </DocumentationSection>
  );
};

export default Group; 
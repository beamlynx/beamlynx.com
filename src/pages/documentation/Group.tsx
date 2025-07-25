import React from 'react';
import DocSection from './DocSection';

const Group: React.FC = () => {
  return (
    <DocSection id="group" title="Group Operation">
      <p>
        The group operation (<code>:group</code> or <code>g:</code>) is used to group the results of a query by a given column.
      </p>
      
      <h3>Syntax</h3>
      <pre>
        <code>{`table_name | group: column_name => function`}</code>
      </pre>
      
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
    </DocSection>
  );
};

export default Group; 
import React from 'react';
import DocSection from './DocSection';

const Delete: React.FC = () => {
  return (
    <DocSection id="delete" title="Delete Operation">
      <p>
        Operations that have a side-effect are suffixed with <code>!</code>.
      </p>
      <p>
        Delete operation is a side-effect operation.
      </p>
      <pre>
        <code>{`table_name | operation1: args | delete!`}</code>
      </pre>
      <p>
        e.g. if you want to delete the user 'John Doe' from the <code>users</code> table, you can do:
      </p>
      <pre>
        <code>{`users | where: name = 'John Doe' | delete!`}</code>
      </pre>
    </DocSection>
  );
};

export default Delete; 
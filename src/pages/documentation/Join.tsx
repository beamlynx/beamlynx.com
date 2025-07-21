import React from 'react';
import DocSection from './DocSection';

const Join: React.FC = () => {
  return (
    <DocSection id="join" title="Join Operation">
      <p>
        Pine Lang automatically handles joins based on foreign key relationships.
        Simply pipe tables together to create joins.
      </p>
      <pre>
        <code>{`-- Basic join
company | employee

-- Multi-table join
company | employee | document

-- Join with schema qualification
x.company | y.employee | z.document

-- Join with context
company as c | employee | from: c | document`}</code>
      </pre>
    </DocSection>
  );
};

export default Join; 
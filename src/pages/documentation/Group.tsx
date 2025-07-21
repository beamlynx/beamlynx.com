import React from 'react';
import DocSection from './DocSection';

const Group: React.FC = () => {
  return (
    <DocSection id="group" title="Group Operation">
      <p>
        The group operation (<code>group:</code> or <code>g:</code>) groups results and performs aggregations.
      </p>
      <pre>
        <code>{`-- Group by status and count
email | group: status => count

-- Multiple aggregations
orders | group: status => count, sum`}</code>
      </pre>
    </DocSection>
  );
};

export default Group; 
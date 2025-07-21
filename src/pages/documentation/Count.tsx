import React from 'react';
import DocSection from './DocSection';

const Count: React.FC = () => {
  return (
    <DocSection id="count" title="Count Operation">
      <p>
        The count operation (<code>count:</code>) returns the total number of rows.
      </p>
      <pre>
        <code>{`-- Simple count
company | count:

-- Count with conditions
company | where: country = 'US' | count:`}</code>
      </pre>
    </DocSection>
  );
};

export default Count; 
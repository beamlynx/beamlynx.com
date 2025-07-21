import React from 'react';
import DocSection from './DocSection';

const Limit: React.FC = () => {
  return (
    <DocSection id="limit" title="Limit Operation">
      <p>
        The limit operation (<code>limit:</code> or <code>l:</code>) restricts the number of returned rows.
      </p>
      <pre>
        <code>{`-- Limit to 10 rows
company | limit: 10

-- With other operations
company | where: country = 'US' | limit: 5`}</code>
      </pre>
    </DocSection>
  );
};

export default Limit; 
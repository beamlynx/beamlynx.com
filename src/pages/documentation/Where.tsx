import React from 'react';
import DocSection from './DocSection';

const Where: React.FC = () => {
  return (
    <DocSection id="where" title="Where Operation">
      <p>
        The where operation (<code>where:</code> or <code>w:</code>) filters the results based on conditions.
      </p>
      <pre>
        <code>{`-- Basic equality
company | where: name = 'Acme Inc.'

-- Multiple conditions
company | where: name like 'Acme%', country = 'US'

-- NULL checks
company | where: deleted_at is null

-- IN clause
company | where: country in ('US', 'UK', 'CA')

-- Column comparison
company | where: created_at = updated_at`}</code>
      </pre>
    </DocSection>
  );
};

export default Where; 
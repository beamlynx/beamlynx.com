import React from 'react';
import DocSection from './DocSection';

const Order: React.FC = () => {
  return (
    <DocSection id="order" title="Order Operation">
      <p>
        The order operation (<code>order:</code> or <code>o:</code>) sorts the results.
      </p>
      <pre>
        <code>{`-- Basic ordering
company | order: name

-- Descending order
company | order: name desc

-- Multiple columns
company | order: country asc, name desc`}</code>
      </pre>
    </DocSection>
  );
};

export default Order; 
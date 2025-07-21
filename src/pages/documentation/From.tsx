import React from 'react';
import DocSection from './DocSection';

const From: React.FC = () => {
  return (
    <DocSection id="from" title="From Operation">
      <p>
        The from operation (<code>from:</code> or f:) sets the context for subsequent operations.
      </p>
      <pre>
        <code>{`-- Set context for joins
company as c | employee | from: c | document

-- Multiple contexts
company as c | employee as e | from: c | document | from: e | attachment`}</code>
      </pre>
    </DocSection>
  );
};

export default From; 
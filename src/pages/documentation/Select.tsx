import React from 'react';
import DocSection from './DocSection';

const Select: React.FC = () => {
  return (
    <DocSection id="select" title="Select Operation">
      <p>
        The select operation (<code>select:</code> or <code>s:</code>) specifies which columns to return in the query result.
      </p>
      <pre>
        <code>{`-- Select specific columns
company | select: id, name

-- Select with alias
company | s: id as company_id

-- Select with table qualification
company as c | employee as e | s: c.id, e.name

-- Select all columns from a table
company as c | s: c.*`}</code>
      </pre>
    </DocSection>
  );
};

export default Select; 
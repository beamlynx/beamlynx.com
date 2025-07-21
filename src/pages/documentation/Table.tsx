import React from 'react';
import DocSection from './DocSection';

const Table: React.FC = () => {
  return (
    <DocSection id="table" title="Table Operation">
      <p>
        Tables can be referenced directly or with schema qualification. They can also use aliases
        and relationship indicators.
      </p>
      <pre>
        <code>{`-- Basic table reference
users

-- Schema qualified
public.users

-- With alias
users as u

-- Child relationship
has: orders

-- Parent relationship
of: users
users^`}</code>
      </pre>
    </DocSection>
  );
};

export default Table; 
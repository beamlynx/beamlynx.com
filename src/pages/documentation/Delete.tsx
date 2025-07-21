import React from 'react';
import DocSection from './DocSection';

const Delete: React.FC = () => {
  return (
    <DocSection id="delete" title="Delete Operation">
      <p>
        Pine Lang provides two delete operations:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li><code>delete:</code> or <code>d:</code> - Mark for deletion</li>
        <li><code>delete!</code> or <code>d!</code> - Execute deletion</li>
      </ul>
      <pre>
        <code>{`-- Mark for deletion
company | where: status = 'inactive' | delete:

-- Execute deletion
company | where: status = 'inactive' | delete! .id`}</code>
      </pre>
    </DocSection>
  );
};

export default Delete; 
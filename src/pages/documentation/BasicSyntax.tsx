import React from 'react';
import DocSection from './DocSection';

const BasicSyntax: React.FC = () => {
  return (
    <DocSection id="basic-syntax" title="Basic Syntax">
      <p>
        Pine-lang uses a pipe-based syntax (<code>|</code>) to chain operations. Each operation
        transforms the query in some way. The basic format is:
      </p>
      <pre>
        <code>table_name | operation1: args | operation2: args</code>
      </pre>
    </DocSection>
  );
};

export default BasicSyntax; 
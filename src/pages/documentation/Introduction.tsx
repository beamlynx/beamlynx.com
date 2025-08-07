import React from 'react';
import DocSection from './DocSection';

const Introduction: React.FC = () => {
  return (
    <DocSection id="introduction" title="Introduction">
      <p>
        Pine-lang is a powerful, intuitive query language that transpiles to SQL. It features a
        pipe-based syntax inspired by Unix pipes, making queries readable and composable.
        As you write queries, you see a real-time visualization of table relationships.
      </p>
    </DocSection>
  );
};

export default Introduction; 
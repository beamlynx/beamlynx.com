import React from 'react';
import DocumentationSection from '../../components/DocumentationSection';
import type { DocumentationExample } from '../../components/DocumentationSection';

const Paths: React.FC = () => {
  const examples: DocumentationExample[] = [
    {
      title: 'Direct and multi-hop',
      expression: 'company ? document',
      description:
        "Returns every route from company to document, not just the next hop. If employee sits in between " +
        "(company → employee → document) as well as a direct company_id column on document, both come back - " +
        "ordered so the genuine relationship ranks above the denormalized shortcut."
    },
    {
      title: 'Composed on top of an existing expression',
      expression: "company | where: active = true | ? document",
      description:
        'The search starts from wherever the pipe left off, not from a bare table name - everything before ' +
        'the ? is an ordinary, fully composable Pine expression.'
    }
  ];

  return (
    <DocumentationSection
      id="paths"
      title="Paths"
      description="Ask Pine how two tables connect, and it searches for every join chain between them - not just the direct next hop. Useful the moment you know you need data from another table but not how to get there."
      operations={['?']}
      syntax="table_a ? table_b\ntable_a | table_b | ? table_c"
      examples={examples}
      isOperation={true}
    >
      <p>
        A single pipe (<code>customers | orders</code>) already shows what a table can join to next. <code>?</code>{' '}
        answers a different question: how would you even get from one table to another, when the real connection
        is two or three hops away through a table you hadn't thought to name.
      </p>
      <p>
        Each result is a real Pine expression, ready to drop in place of the <code>? table</code> segment - not a
        query result. A few things to know:
      </p>
      <ul>
        <li>Routes are ranked by how meaningful the connection is, not by hop count alone - a shortcut column that only duplicates a longer, more direct relationship ranks behind the real one, even when it's shorter.</li>
        <li><code>?</code> is terminal - nothing meaningful follows it in the same pipe, the same as <code>count:</code> or bare <code>delete:</code>.</li>
        <li>It has no table modifiers of its own (no <code>as alias</code>, no <code>.hint_column</code>, no <code>:parent</code>) - the named table is a search destination, not something being joined directly.</li>
        <li>Results are capped so a densely-connected schema can't turn a lookup into a long-running search.</li>
      </ul>
    </DocumentationSection>
  );
};

export default Paths;

import React from 'react';
import DocSection from './DocSection';

const Join: React.FC = () => {
  return (
    <DocSection id="join" title="Join Operation">
      <p>
        Pine Lang automatically handles joins based on foreign key relationships.
        Simply pipe tables together to create joins.
      </p>
      
      <p>Basic join:</p>
      <pre>
        <code>{`company | employee`}</code>
      </pre>

      <p>Multi-table join:</p>
      <pre>
        <code>{`company | employee | document`}</code>
      </pre>

      <p>Join with schema qualification:</p>
      <pre>
        <code>{`x.company | y.employee | z.document`}</code>
      </pre>

      <p>Join with context:</p>
      <pre>
        <code>{`company as c | employee | from: c | document`}</code>
      </pre>

      <h3>What about left / right joins?</h3>
      <p>
        Pine-lang supports operation modifiers which can be appended to the arguements to change the behaviour of the join.
      </p>
      <p>
        In order to specify the type of a join, you can append the <code>left</code> or <code>right</code> modifier to the join operation e.g. if you want all the documents along with the employees (if they exist) then you need a left join. Using the modified <code>:left</code> modifier, you can specify a left join.
      </p>
      <pre>
        <code>{`document | employee :left`}</code>
      </pre>

      <h3>What about parent child relationships?</h3>
      <p>
        Similar to using the modifier for type of join, you can use the <code>:parent</code> or <code>:child</code>. Imagine you want to find parent folders, you can do:
      </p>
      <pre>
        <code>{`folder | folder :parent`}</code>
      </pre>
    </DocSection>
  );
};

export default Join; 
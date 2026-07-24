import React from 'react';
import DocumentationSection from '../../components/DocumentationSection';
import type { DocumentationExample } from '../../components/DocumentationSection';

const Variables: React.FC = () => {
  const examples: DocumentationExample[] = [
    {
      title: 'Name a result and reuse it',
      expression: 'company | where: active = true |= active_companies\n\nactive_companies | employee',
      sql: 'WITH active_companies AS ( SELECT * FROM company WHERE active = true ) SELECT * FROM active_companies JOIN employee ON active_companies.id = employee.company_id',
      description: 'Assign the filtered company result to active_companies, then use it as a table in the next expression.'
    },
    {
      title: 'Mid-pipeline assign',
      expression: 'company |= all_companies | where: active = true',
      sql: 'WITH all_companies AS ( SELECT * FROM company ) SELECT * FROM company WHERE active = true',
      description: 'Place |= anywhere in the pipe chain. The snapshot is taken at that point — all_companies is the full unfiltered company set, while the current expression still returns only active companies.'
    },
    {
      title: 'Reference variable columns',
      expression: 'company |= c | employee | s: id, c.id',
      sql: 'SELECT employee.id, company.id FROM company JOIN employee ON company.id = employee.company_id',
      description: 'After |= c, use c as a column qualifier in the same expression. c.id refers to the company table\'s id column.'
    },
    {
      title: 'Chain multiple steps',
      expression: 'company | where: active = true |= active_companies\n\nactive_companies | l: 10 |= small_active\n\nsmall_active',
      sql: 'WITH active_companies AS ( SELECT * FROM company WHERE active = true ), small_active AS ( SELECT * FROM active_companies LIMIT 10 ) SELECT * FROM small_active',
      description: 'Each expression builds on the previous. Separate expressions with a blank line.'
    },
    {
      title: 'Only explicitly selected id columns stay joinable',
      expression: 'company | select: id, name |= x\n\nx | employee',
      sql: 'WITH x AS ( SELECT id, name FROM company ) SELECT * FROM x JOIN employee ON x.id = employee.company_id',
      description: 'Once a variable is used, its underlying tables are no longer visible — only its own output columns are. A table stays a valid join source through the variable only if its id was explicitly selected. select: name alone (no id) would make x unjoinable to anything.'
    },
    {
      title: 'Automatic checkpoints after group: or limit:',
      expression: 'company | limit: 10 | employee',
      sql: 'WITH __pine_0__ AS ( SELECT * FROM company LIMIT 10 ) SELECT * FROM __pine_0__ JOIN employee ON __pine_0__.id = employee.company_id',
      description: 'group: and limit: produce a final, bounded result. Piping into another table after one of them automatically wraps the preceding query in an anonymous CTE first, so the join applies on top of the limited/grouped result instead of corrupting it. Name that CTE yourself with |= placed right after the group:/limit: step.'
    }
  ];

  return (
    <DocumentationSection
      id="variables"
      title="Variables"
      operations={['|= name']}
      syntax="<expression> |= <name> [| more operations...]"
      description="Name an intermediate result and use it as a table in later expressions. Variables let you build up queries in readable steps instead of nesting subqueries."
      examples={examples}
      isOperation={true}
      badge="Coming Soon"
    >
    </DocumentationSection>
  );
};

export default Variables;

import React from 'react';
import { useTranslation } from 'react-i18next';
import DocumentationSection from '../../components/DocumentationSection';
import type { DocumentationExample } from '../../components/DocumentationSection';

const Variables: React.FC = () => {
  const { t } = useTranslation('docsContent');

  const examples: DocumentationExample[] = [
    {
      title: t('variables.examples.0.title'),
      expression: 'company | where: active = true |= active_companies\n\nactive_companies | employee',
      sql: 'WITH active_companies AS ( SELECT * FROM company WHERE active = true ) SELECT * FROM active_companies JOIN employee ON active_companies.id = employee.company_id',
      description: t('variables.examples.0.description')
    },
    {
      title: t('variables.examples.1.title'),
      expression: 'company |= all_companies | where: active = true',
      sql: 'WITH all_companies AS ( SELECT * FROM company ) SELECT * FROM company WHERE active = true',
      description: t('variables.examples.1.description')
    },
    {
      title: t('variables.examples.2.title'),
      expression: 'company |= c | employee | s: id, c.id',
      sql: 'SELECT employee.id, company.id FROM company JOIN employee ON company.id = employee.company_id',
      description: t('variables.examples.2.description')
    },
    {
      title: t('variables.examples.3.title'),
      expression: 'company | where: active = true |= active_companies\n\nactive_companies | l: 10 |= small_active\n\nsmall_active',
      sql: 'WITH active_companies AS ( SELECT * FROM company WHERE active = true ), small_active AS ( SELECT * FROM active_companies LIMIT 10 ) SELECT * FROM small_active',
      description: t('variables.examples.3.description')
    },
    {
      title: t('variables.examples.4.title'),
      expression: 'company | select: id, name |= x\n\nx | employee',
      sql: 'WITH x AS ( SELECT id, name FROM company ) SELECT * FROM x JOIN employee ON x.id = employee.company_id',
      description: t('variables.examples.4.description')
    },
    {
      title: t('variables.examples.5.title'),
      expression: 'company | limit: 10 | employee',
      sql: 'WITH __pine_0__ AS ( SELECT * FROM company LIMIT 10 ) SELECT * FROM __pine_0__ JOIN employee ON __pine_0__.id = employee.company_id',
      description: t('variables.examples.5.description')
    },
    {
      title: t('variables.examples.6.title'),
      expression: 'customers as c | orders .customer_id | group: c.id, c.email | select: id, count as order_count | order: count desc |= x\n\ncustomers as c | audit.order_status_changes .customer_id | group: c.id, c.email | select: id, count as status_change_count |= y\n\ncustomers | select: email | x | select: order_count | y | select: status_change_count',
      description: t('variables.examples.6.description')
    }
  ];

  return (
    <DocumentationSection
      id="variables"
      title={t('variables.title')}
      operations={['|= name']}
      syntax="<expression> |= <name> [| more operations...]"
      description={t('variables.description')}
      examples={examples}
      isOperation={true}
    >
    </DocumentationSection>
  );
};

export default Variables;

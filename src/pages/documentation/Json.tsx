import React from 'react';
import { useTranslation } from 'react-i18next';
import DocumentationSection from '../../components/DocumentationSection';
import type { DocumentationExample } from '../../components/DocumentationSection';

const Json: React.FC = () => {
  const { t } = useTranslation('docsContent');

  const examples: DocumentationExample[] = [
    {
      title: t('json.examples.0.title'),
      expression: 'customer | select: name, data.address.city',
      sql: "SELECT name, jsonb_extract_path_text(data, 'address', 'city') AS \"data.address.city\" FROM customer",
      description: t('json.examples.0.description')
    },
    {
      title: t('json.examples.1.title'),
      expression: "customer | where: data.country = 'SE' | where: data.seats > 10",
      sql: "SELECT * FROM customer WHERE jsonb_extract_path(data, 'country') = '\"SE\"' AND jsonb_typeof(jsonb_extract_path(data, 'seats')) = 'number' AND jsonb_extract_path(data, 'seats') > '10'",
      description: t('json.examples.1.description')
    },
    {
      title: t('json.examples.2.title'),
      expression: 'customer | where: data.cancelled_at is null',
      sql: "SELECT * FROM customer WHERE jsonb_extract_path_text(data, 'cancelled_at') IS NULL",
      description: t('json.examples.2.description')
    },
    {
      title: t('json.examples.3.title'),
      expression: 'customer | group: data.plan => count',
      sql: "SELECT jsonb_extract_path_text(data, 'plan') AS \"data.plan\", COUNT(*) FROM customer GROUP BY 1",
      description: t('json.examples.3.description')
    },
    {
      title: t('json.examples.4.title'),
      expression: "customer | select: data.tags[0], data.'home address'",
      sql: "SELECT jsonb_extract_path_text(data, 'tags', '0'), jsonb_extract_path_text(data, 'home address') FROM customer",
      description: t('json.examples.4.description')
    },
    {
      title: t('json.examples.5.title'),
      expression: "customer as c | employee | where: c.data.plan = 'pro'",
      sql: "SELECT * FROM customer AS c JOIN employee ON c.id = employee.customer_id WHERE jsonb_extract_path(c.data, 'plan') = '\"pro\"'",
      description: t('json.examples.5.description')
    }
  ];

  return (
    <DocumentationSection
      id="json"
      title={t('json.title')}
      operations={['select:', 'where:', 'order:', 'group:']}
      syntax="column.key[.key...] | column.'quoted key' | column[index]"
      description={t('json.description')}
      examples={examples}
      isOperation={false}
    >
    </DocumentationSection>
  );
};

export default Json;

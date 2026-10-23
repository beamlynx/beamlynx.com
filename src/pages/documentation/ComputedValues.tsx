import React from 'react';
import { useTranslation } from 'react-i18next';
import DocumentationSection from '../../components/DocumentationSection';
import type { DocumentationExample } from '../../components/DocumentationSection';

const ComputedValues: React.FC = () => {
  const { t } = useTranslation('docsContent');

  const examples: DocumentationExample[] = [
    {
      title: t('computedValues.examples.0.title'),
      expression: "attachment | select: id, coalesce(name, concat('att:', id)) as label",
      sql: "SELECT id, COALESCE(name, 'att:' || id) AS label FROM attachment",
      description: t('computedValues.examples.0.description')
    },
    {
      title: t('computedValues.examples.1.title'),
      expression: 'document | select: id, deleted_at is null as live',
      sql: 'SELECT id, (deleted_at IS NULL) AS live FROM document',
      description: t('computedValues.examples.1.description')
    },
    {
      title: t('computedValues.examples.2.title'),
      expression: "orders | select: id, if status = 'paid' then 'done' else if status = 'new' then 'waiting' else 'other' as stage",
      sql: "SELECT id, CASE WHEN status = 'paid' THEN 'done' WHEN status = 'new' THEN 'waiting' ELSE 'other' END AS stage FROM orders",
      description: t('computedValues.examples.2.description')
    },
    {
      title: t('computedValues.examples.3.title'),
      expression: 'document | select: id, created_at => month as created_month',
      sql: "SELECT id, TO_CHAR(DATE_TRUNC('month', created_at), 'YYYY-MM') AS created_month FROM document",
      description: t('computedValues.examples.3.description')
    },
    {
      title: t('computedValues.examples.4.title'),
      expression: "document | select: id, coalesce(title, 'untitled') as label | where: label != 'untitled'",
      sql: "SELECT id, COALESCE(title, 'untitled') AS label FROM document WHERE COALESCE(title, 'untitled') != 'untitled'",
      description: t('computedValues.examples.4.description')
    },
    {
      title: t('computedValues.examples.5.title'),
      expression: 'orders | group: customer_id with count, total => sum as spent',
      sql: 'SELECT customer_id, COUNT(*) AS count, SUM(total) AS spent FROM orders GROUP BY customer_id',
      description: t('computedValues.examples.5.description')
    }
  ];

  return (
    <DocumentationSection
      id="computed-values"
      title={t('computedValues.title')}
      description={t('computedValues.description')}
      operations={['select:', 'where:', 'order:', 'group:']}
      syntax="<value> as <name>  |  x => f  |  if <condition> then <value> else <value>"
      examples={examples}
      isOperation={false}
    />
  );
};

export default ComputedValues;

import React from 'react';
import { useTranslation } from 'react-i18next';
import DocumentationSection from '../../components/DocumentationSection';
import type { DocumentationExample } from '../../components/DocumentationSection';

const Select: React.FC = () => {
  const { t } = useTranslation('docsContent');

  const examples: DocumentationExample[] = [
    {
      title: t('select.examples.0.title'),
      expression: 'customers | select: id, email',
      sql: 'SELECT id, email FROM customers',
      description: t('select.examples.0.description')
    },
    {
      title: t('select.examples.1.title'),
      expression: 'customers | s: id as customer_id',
      sql: 'SELECT id as customer_id FROM customers',
      description: t('select.examples.1.description')
    },
    {
      title: t('select.examples.2.title'),
      expression: 'customers as c | orders as o | s: c.email, o.total_amount',
      sql: 'SELECT c.id, o.total FROM customers as c JOIN orders as o ON c.id = o.customer_id',
      description: t('select.examples.2.description')
    },
  ];

  return (
    <DocumentationSection
      id="select"
      title={t('select.title')}
      description={t('select.description')}
      operations={['select:', 's:']}
      examples={examples}
      isOperation={true}
    />
  );
};

export default Select; 
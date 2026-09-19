import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import DocumentationSection from '../../components/DocumentationSection';
import type { DocumentationExample } from '../../components/DocumentationSection';

const Join: React.FC = () => {
  const { t } = useTranslation('docsContent');

  const examples: DocumentationExample[] = [
    {
      title: t('join.examples.0.title'),
      expression: 'customers | orders',
      sql: 'SELECT * FROM customers JOIN orders ON customers.id = orders.customer_id',
      description: t('join.examples.0.description')
    },
    {
      title: t('join.examples.1.title'),
      expression: 'customers | orders | order_items',
      sql: 'SELECT * FROM customers JOIN ordesrs ON customers.id = orders.customer_id JOIN order_items ON orders.id = order_items.order_id',
      description: t('join.examples.1.description')
    },
    {
      title: t('join.examples.2.title'),
      expression: 'customers | audit.order_status_changes',
      sql: 'SELECT * FROM customers JOIN audit.order_status_changes ON customers.id = audit.order_status_changes.customer_id',
      description: t('join.examples.2.description')
    },
    {
      title: t('join.examples.3.title'),
      expression: 'customers | orders :left',
      sql: 'SELECT * FROM customers LEFT JOIN orders ON customers.id = orders.customer_id',
      description: t('join.examples.3.description')
    },
    {
      title: t('join.examples.4.title'),
      expression: 'categories as p | categories as c',
      sql: 'SELECT c.* FROM categories as p JOIN categories as c ON p.id = c.parent_id',
      description: t('join.examples.4.description')
    },
    {
      title: t('join.examples.5.title'),
      expression: 'categories as p | categories as c :parent',
      sql: 'SELECT p.* FROM categories as c JOIN categories as p ON c.parent_id = p.id',
      description: t('join.examples.5.description')
    }
  ];

  return (
    <DocumentationSection
      id="join"
      title={t('join.title')}
      description={t('join.description')}
      examples={examples}
      isOperation={true}
    >
      <p>
        {t('join.modifiersIntro')}
      </p>
      <ul>
        <li><Trans i18nKey="join.modifiers.0" ns="docsContent" components={{ 1: <code /> }} /></li>
        <li><Trans i18nKey="join.modifiers.1" ns="docsContent" components={{ 1: <code /> }} /></li>
        <li><Trans i18nKey="join.modifiers.2" ns="docsContent" components={{ 1: <code /> }} /></li>
      </ul>
    </DocumentationSection>
  );
};

export default Join;
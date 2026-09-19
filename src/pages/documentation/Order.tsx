import React from 'react';
import { useTranslation } from 'react-i18next';
import DocumentationSection from '../../components/DocumentationSection';
import type { DocumentationExample } from '../../components/DocumentationSection';

const Order: React.FC = () => {
  const { t } = useTranslation('docsContent');

  const examples: DocumentationExample[] = [
    {
      title: t('order.examples.0.title'),
      expression: 'customers | order: email',
      sql: 'SELECT * FROM customers ORDER BY email',
      description: t('order.examples.0.description')
    },
    {
      title: t('order.examples.1.title'),
      expression: 'customers | order: email desc',
      sql: 'SELECT * FROM customers ORDER BY email DESC',
      description: t('order.examples.1.description')
    },
    {
      title: t('order.examples.2.title'),
      expression: 'customers | order: first_name asc, last_name desc',
      sql: 'SELECT * FROM customers ORDER BY first_name ASC, last_name DESC',
      description: t('order.examples.2.description')
    }
  ];

  return (
    <DocumentationSection
      id="order"
      title={t('order.title')}
      description={t('order.description')}
      operations={['order:', 'o:']}
      examples={examples}
      isOperation={true}
    />
  );
};

export default Order;
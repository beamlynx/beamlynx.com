import React from 'react';
import { useTranslation } from 'react-i18next';
import DocumentationSection from '../../components/DocumentationSection';
import type { DocumentationExample } from '../../components/DocumentationSection';

const Where: React.FC = () => {
  const { t } = useTranslation('docsContent');

  const examples: DocumentationExample[] = [
    {
      title: t('where.examples.0.title'),
      expression: 'customers | where: first_name = \'John\'',
      sql: 'SELECT * FROM customers WHERE first_name = \'John\'',
      description: t('where.examples.0.description')
    },
    {
      title: t('where.examples.1.title'),
      expression: 'customers | where: first_name like \'John%\' | where: last_name = \'Doe\'',
      sql: 'SELECT * FROM customers WHERE first_name LIKE \'John%\' AND last_name = \'Doe\'',
      description: t('where.examples.1.description')
    },
    {
      title: t('where.examples.2.title'),
      expression: 'customers | where: created_at is null',
      sql: 'SELECT * FROM customers WHERE created_at IS NULL',
      description: t('where.examples.2.description')
    },
    {
      title: t('where.examples.3.title'),
      expression: 'customers | where: created_at is not null',
      sql: 'SELECT * FROM customers WHERE created_at IS NOT NULL',
      description: t('where.examples.3.description')
    },
    {
      title: t('where.examples.4.title'),
      expression: 'categories | where: name in (\'Electronics\', \'Computers\')',
      sql: 'SELECT * FROM categories WHERE name IN (\'Electronics\', \'Computers\')',
      description: t('where.examples.4.description')
    },
    {
      title: t('where.examples.5.title'),
      expression: 'customers | where: created_at < updated_at',
      sql: 'SELECT * FROM customers WHERE created_at < updated_at',
      description: t('where.examples.5.description')
    },
    {
      title: t('where.examples.6.title'),
      expression: 'customers | where: first_name like \'Jo%\'',
      sql: 'SELECT * FROM customers WHERE first_name LIKE \'Jo%\'',
      description: t('where.examples.6.description')
    },
    {
      title: t('where.examples.7.title'),
      expression: 'customers | where: first_name ilike \'jo%\'',
      sql: 'SELECT * FROM customers WHERE first_name ILIKE \'jo%\'',
      description: t('where.examples.7.description')
    }
  ];

  return (
    <DocumentationSection
      id="where"
      title={t('where.title')}
      description={t('where.description')}
      operations={['where:', 'w:']}
      examples={examples}
      isOperation={true}
    />
  );
};

export default Where; 
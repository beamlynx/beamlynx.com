import React from 'react';
import { useTranslation } from 'react-i18next';
import DocumentationSection from '../../components/DocumentationSection';
import type { DocumentationExample } from '../../components/DocumentationSection';

const Table: React.FC = () => {
  const { t } = useTranslation('docsContent');

  const examples: DocumentationExample[] = [
    {
      title: t('table.examples.0.title'),
      expression: 'customers',
      sql: 'SELECT * FROM customers',
    },
    {
      title: t('table.examples.1.title'),
      expression: 'public.customers',
      sql: 'SELECT * FROM public.customers',
    },
    {
      title: t('table.examples.2.title'),
      expression: 'customers as c',
      sql: 'SELECT * FROM customers as c',
    }
  ];

  return (
    <DocumentationSection
      id="table"
      title={t('table.title')}
      description={t('table.description')}
      examples={examples}
      isOperation={true}
    />
  );
};

export default Table;
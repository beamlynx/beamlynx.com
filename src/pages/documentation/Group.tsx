import React from 'react';
import { useTranslation } from 'react-i18next';
import DocumentationSection from '../../components/DocumentationSection';
import type { DocumentationExample } from '../../components/DocumentationSection';

const Group: React.FC = () => {
  const { t } = useTranslation('docsContent');

  const examples: DocumentationExample[] = [
    {
      title: t('group.examples.0.title'),
      expression: "categories as c | products .category_id | order_items .product_id | group: c.name => count",
      sql: "SELECT c.name, COUNT(1) FROM categories as c JOIN products ON c.id = products.category_id JOIN order_items ON products.id = order_items.product_id GROUP BY c.name",
      description: t('group.examples.0.description')
    }
  ];

  return (
    <DocumentationSection
      id="group"
      title={t('group.title')}
      operations={['group:', 'g:']}
      syntax="table_name | group: column_name => function"
      description={t('group.description')}
      examples={examples}
      isOperation={true}
    >
    </DocumentationSection>
  );
};

export default Group;
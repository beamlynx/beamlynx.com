import React from 'react';
import { useTranslation } from 'react-i18next';
import DocumentationSection from '../../components/DocumentationSection';

const Limit: React.FC = () => {
  const { t } = useTranslation('docsContent');

  return (
    <DocumentationSection
      id="limit"
      title={t('limit.title')}
      description={t('limit.description')}
      operations={['limit:', 'l:']}
      syntax="table_name | limit: number"
      isOperation={true}
      examples={[
        {
          title: t('limit.examples.0.title'),
          expression: "customers | limit: 10",
          sql: "SELECT * FROM customers LIMIT 10",
          description: t('limit.examples.0.description')
        },
        {
          title: t('limit.examples.1.title'),
          expression: "customers | where: is_active = true | limit: 5",
          sql: "SELECT * FROM customers WHERE is_active = true LIMIT 5",
          description: t('limit.examples.1.description')
        },
        {
          title: t('limit.examples.2.title'),
          expression: "customers | orders | where: total_amount > 100 | limit: 1",
          sql: "SELECT * FROM customers JOIN orders ON customers.id = orders.customer_id WHERE orders.total > 100 LIMIT 1",
          description: t('limit.examples.2.description')
        }
      ]}
    >
    </DocumentationSection>
  );
};

export default Limit;
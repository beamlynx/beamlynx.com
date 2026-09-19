import React from 'react';
import { useTranslation } from 'react-i18next';
import DocumentationSection from '../../components/DocumentationSection';

const Count: React.FC = () => {
  const { t } = useTranslation('docsContent');

  return (
    <DocumentationSection
      id="count"
      title={t('count.title')}
      description={t('count.description')}
      operations={['count:']}
      syntax="table_name | [operations...] | count:"
      isOperation={true}
      examples={[
        {
          title: t('count.examples.0.title'),
          expression: "categories | count:",
          description: t('count.examples.0.description')
        },
      ]}
    >
    </DocumentationSection>
  );
};

export default Count;
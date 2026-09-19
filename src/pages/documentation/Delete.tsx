import React from 'react';
import { useTranslation } from 'react-i18next';
import DocumentationSection from '../../components/DocumentationSection';

const Delete: React.FC = () => {
  const { t } = useTranslation('docsContent');

  return (
    <DocumentationSection
      id="delete"
      title={t('delete.title')}
      description={t('delete.description')}
      operations={['delete!']}
      syntax="table_name | [conditions...] | delete! .id_column_name"
      isOperation={true}
      examples={[
        {
          title: t('delete.examples.0.title'),
          expression: "customers | where: email = 'john.doe@email.com' | delete! .id",
          sql: `DELETE FROM "customers"
    WHERE "id" IN (
             SELECT "c_0"."id"
               FROM "customers" AS "c_0"
              WHERE "c_0"."email" = 'john.doe@email.com'
          )`,
          description: t('delete.examples.0.description')
        },
      ]}
    >
    </DocumentationSection>
  );
};

export default Delete;
import React from 'react';
import { useTranslation } from 'react-i18next';
import DocumentationSection from '../../components/DocumentationSection';

const From: React.FC = () => {
  const { t } = useTranslation('docsContent');

  return (
    <DocumentationSection
      id="from"
      title={t('from.title')}
      description={t('from.description')}
      operations={['from:', 'f:']}
      syntax="table_name as alias | [operations...] | from: alias | [more_operations...]"
      isOperation={true}
      examples={[
        {
          title: t('from.examples.0.title'),
          expression: "public.orders as o | s: status as current_status | where: id = 1 | public.order_items .order_id | from: o | audit.order_status_changes .order_id | select: new_status as changed_in_status, change_timestamp",
          sql: "SELECT o.status as current_status, new_status as changed_in_status, change_timestamp FROM public.orders as o JOIN public.order_items ON o.id = order_items.order_id JOIN audit.order_status_changes ON o.id = order_status_changes.order_id WHERE o.id = 1",
          description: t('from.examples.0.description')
        },
      ]}
    >
    </DocumentationSection>
  );
};

export default From;
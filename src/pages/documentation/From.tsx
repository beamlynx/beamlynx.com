import React from 'react';
import DocumentationSection from '../../components/DocumentationSection';

const From: React.FC = () => {
  return (
    <DocumentationSection
      id="from"
      title="From Operation"
      description="The from operation sets the context for subsequent operations in complex queries. Use 'from:' or the shorthand 'f:' to specify which table or alias to use as the source for the next operations."
      operations={['from:', 'f:']}
      syntax="table_name as alias | [operations...] | from: alias | [more_operations...]"
      examples={[
        {
          title: "Context switch with status tracking",
          expression: "public.orders as o | s: status as current_status | where: id = 1 | public.order_items .order_id | from: o | audit.order_status_changes .order_id | select: new_status as changed_in_status, change_timestamp",
          sql: "SELECT o.status as current_status, new_status as changed_in_status, change_timestamp FROM public.orders as o JOIN public.order_items ON o.id = order_items.order_id JOIN audit.order_status_changes ON o.id = order_status_changes.order_id WHERE o.id = 1",
          description: "Get order status history by joining order items and status changes, using from to maintain order context"
        },
      ]}
    >
    </DocumentationSection>
  );
};

export default From; 
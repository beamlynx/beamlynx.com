import React from 'react';
import DocumentationSection from '../../components/DocumentationSection';

const Delete: React.FC = () => {
  return (
    <DocumentationSection
      id="delete"
      title="Delete Operation"
      description="The delete operation removes rows from a table. All side-effect operations in pine-lang are suffixed with '!' to indicate they modify data. Use delete! to permanently remove records that match your filter conditions."
      operations={['delete!']}
      syntax="table_name | [conditions...] | delete! .id_column_name"
      examples={[
        {
          title: "Delete Specific Record",
          expression: "customers | where: email = 'john.doe@email.com' | delete! .id",
          sql: `DELETE FROM "customers" 
    WHERE "id" IN (
             SELECT "c_0"."id" 
               FROM "customers" AS "c_0"
              WHERE "c_0"."email" = 'john.doe@email.com'
          )`,
          description: "Delete the customer with the email 'john.doe@email.com' from the customers table"
        },
      ]}
    >
    </DocumentationSection>
  );
};

export default Delete; 
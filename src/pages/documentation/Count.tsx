import React from 'react';
import DocumentationSection from '../../components/DocumentationSection';

const Count: React.FC = () => {
  return (
    <DocumentationSection
      id="count"
      title="Count"
      description="The count operation returns the total number of rows in a result set. Use 'count:' to get the row count of your query results."
      operations={['count:']}
      syntax="table_name | [operations...] | count:"
      isOperation={true}
      examples={[
        {
          title: "Simple Count",
          expression: "categories | count:",
          description: "Count all rows in the categories table"
        },
      ]}
    >
    </DocumentationSection>
  );
};

export default Count; 
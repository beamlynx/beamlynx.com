import React from 'react';
import DocumentationSection from '../../components/DocumentationSection';

const Count: React.FC = () => {
  return (
    <DocumentationSection
      id="count"
      title="Count Operation"
      description="The count operation returns the total number of rows in a result set. Use 'count:' to get the row count of your query results."
      operations={['count:']}
      syntax="table_name | [operations...] | count:"
      examples={[
        {
          title: "Simple Count",
          expression: "company | count:",
          description: "Count all rows in the company table"
        },
        {
          title: "Count with Filter",
          expression: "company | where: country = 'US' | count:",
          description: "Count companies located in the US"
        },
        {
          title: "Count After Join",
          expression: "customers | orders | count:",
          description: "Count the total number of customer-order relationships"
        },
        {
          title: "Complex Count",
          expression: "products | where: price > 100 | where: category = 'Electronics' | count:",
          description: "Count expensive electronics products"
        }
      ]}
    >
      <div>
        <h4 className="text-lg font-semibold mb-3">Important Notes</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Aggregation:</strong> Count is an aggregation operation that returns a single number</li>
          <li><strong>Performance:</strong> Count operations are generally fast but can be slower on very large tables</li>
          <li><strong>Null values:</strong> Count includes rows with null values in the specified columns</li>
          <li><strong>Filtering:</strong> Apply filters before count to get conditional counts</li>
        </ul>
      </div>
    </DocumentationSection>
  );
};

export default Count; 
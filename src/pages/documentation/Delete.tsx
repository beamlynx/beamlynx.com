import React from 'react';
import DocumentationSection from '../../components/DocumentationSection';

const Delete: React.FC = () => {
  return (
    <DocumentationSection
      id="delete"
      title="Delete Operation"
      description="The delete operation removes rows from a table. All side-effect operations in pine-lang are suffixed with '!' to indicate they modify data. Use delete! to permanently remove records that match your filter conditions."
      operations={['delete!']}
      syntax="table_name | [filter_operations...] | delete!"
      examples={[
        {
          title: "Delete Specific Record",
          expression: "users | where: name = 'John Doe' | delete!",
          description: "Delete the user named 'John Doe' from the users table"
        },
        {
          title: "Delete Multiple Records",
          expression: "products | where: discontinued = true | delete!",
          description: "Delete all discontinued products"
        },
        {
          title: "Conditional Delete",
          expression: "orders | where: status = 'cancelled' | where: created_at < '2023-01-01' | delete!",
          description: "Delete old cancelled orders from before 2023"
        },
        {
          title: "Delete with Join Filter",
          expression: "users | profile | where: profile.active = false | from: users | delete!",
          description: "Delete users whose profiles are marked as inactive"
        }
      ]}
    >
      <div>
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h5 className="font-semibold text-red-800 mb-2">⚠️ Warning</h5>
          <p className="text-red-700">
            Delete operations are <strong>permanent and irreversible</strong>. Always test your filter conditions 
            with a regular query first to ensure you're targeting the correct records.
          </p>
        </div>
        
        <h4 className="text-lg font-semibold mb-3">Best Practices</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Test first:</strong> Run the query without <code>delete!</code> to verify which records will be affected</li>
          <li><strong>Use transactions:</strong> Wrap delete operations in transactions when possible</li>
          <li><strong>Backup data:</strong> Consider backing up important data before bulk deletions</li>
          <li><strong>Soft deletes:</strong> For important records, consider using update operations to mark as deleted instead</li>
        </ul>
        
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h5 className="font-semibold text-blue-800 mb-2">💡 Testing Tip</h5>
          <p className="text-blue-700">
            Before running <code>users | where: name = 'John Doe' | delete!</code>, 
            first run <code>users | where: name = 'John Doe'</code> to see exactly which records will be deleted.
          </p>
        </div>
      </div>
    </DocumentationSection>
  );
};

export default Delete; 
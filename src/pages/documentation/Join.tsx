import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import DocumentationSection from '../../components/DocumentationSection';
import type { DocumentationExample } from '../../components/DocumentationSection';

const Join: React.FC = () => {
  const { t } = useTranslation('docsContent');

  const examples: DocumentationExample[] = [
    {
      title: t('join.examples.0.title'),
      expression: 'customers | orders',
      sql: 'SELECT * FROM customers JOIN orders ON customers.id = orders.customer_id',
      description: t('join.examples.0.description')
    },
    {
      title: t('join.examples.1.title'),
      expression: 'customers | orders | order_items',
      sql: 'SELECT * FROM customers JOIN ordesrs ON customers.id = orders.customer_id JOIN order_items ON orders.id = order_items.order_id',
      description: t('join.examples.1.description')
    },
    {
      title: t('join.examples.2.title'),
      expression: 'customers | audit.order_status_changes',
      sql: 'SELECT * FROM customers JOIN audit.order_status_changes ON customers.id = audit.order_status_changes.customer_id',
      description: t('join.examples.2.description')
    },
    {
      title: t('join.examples.3.title'),
      expression: 'customers | orders :left',
      sql: 'SELECT * FROM customers LEFT JOIN orders ON customers.id = orders.customer_id',
      description: t('join.examples.3.description')
    },
    {
      title: t('join.examples.4.title'),
      expression: 'categories as p | categories as c',
      sql: 'SELECT c.* FROM categories as p JOIN categories as c ON p.id = c.parent_id',
      description: t('join.examples.4.description')
    },
    {
      title: t('join.examples.5.title'),
      expression: 'categories as p | categories as c :parent',
      sql: 'SELECT p.* FROM categories as c JOIN categories as p ON c.parent_id = p.id',
      description: t('join.examples.5.description')
    },
    {
      title: t('join.examples.6.title'),
      expression: 'projects | employees .id = .members[*].id',
      sql: "SELECT employees.* FROM projects JOIN employees ON projects.members @> jsonb_build_array(jsonb_build_object('id', employees.id))",
      description: t('join.examples.6.description')
    },
    {
      title: t('join.examples.7.title'),
      expression: "activity | where: resource_type = 'company' | select: resource_id as company_id | companies",
      sql: "SELECT companies.* FROM activity JOIN companies ON activity.resource_id = companies.id WHERE activity.resource_type = 'company'",
      description: t('join.examples.7.description')
    },
    {
      title: t('join.examples.8.title'),
      expression: 'orders as o | customers as c c.id = o.customer_id | addresses as a a.customer_id = c.id, a.region_id = o.region_id',
      sql: 'SELECT a.* FROM orders AS o JOIN customers AS c ON c.id = o.customer_id JOIN addresses AS a ON a.customer_id = c.id AND a.region_id = o.region_id',
      description: t('join.examples.8.description'),
      experimental: true, // pine-lang #192
    },
    {
      title: t('join.examples.9.title'),
      expression: "customers as c | orders as o :left o.customer_id = c.id, o.status = 'paid', o.deleted_at is null",
      sql: "SELECT o.* FROM customers AS c LEFT JOIN orders AS o ON o.customer_id = c.id AND o.status = 'paid' AND o.deleted_at IS NULL",
      description: t('join.examples.9.description'),
      experimental: true, // pine-lang #192, #193
    }
  ];

  return (
    <DocumentationSection
      id="join"
      title={t('join.title')}
      description={t('join.description')}
      examples={examples}
      isOperation={true}
    >
      <p>
        {t('join.modifiersIntro')}
      </p>
      <ul>
        <li><Trans i18nKey="join.modifiers.0" ns="docsContent" components={{ 1: <code /> }} /></li>
        <li><Trans i18nKey="join.modifiers.1" ns="docsContent" components={{ 1: <code /> }} /></li>
        <li><Trans i18nKey="join.modifiers.2" ns="docsContent" components={{ 1: <code /> }} /></li>
      </ul>
    </DocumentationSection>
  );
};

export default Join;
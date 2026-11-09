import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import DocumentationSection from '../../components/DocumentationSection';
import type { DocumentationExample } from '../../components/DocumentationSection';

const References: React.FC = () => {
  const { t } = useTranslation('docsContent');

  const examples: DocumentationExample[] = [
    {
      title: t('references.examples.0.title'),
      expression: 'company | references:',
      description: t('references.examples.0.description'),
    },
    {
      title: t('references.examples.1.title'),
      expression: 'employee | references:',
      description: t('references.examples.1.description'),
    },
  ];

  return (
    <DocumentationSection
      id="references"
      title={t('references.title')}
      description={t('references.description')}
      operations={['references:']}
      syntax="table_name | [operations...] | references:"
      examples={examples}
      isOperation={true}
    >
      <p>
        <Trans
          i18nKey="references.intro1"
          ns="docsContent"
          components={{ 1: <code />, 3: <code />, 5: <code />, 7: <code /> }}
        />
      </p>
      <ul>
        <li>{t('references.notes.0')}</li>
        <li>{t('references.notes.1')}</li>
        <li>{t('references.notes.2')}</li>
        <li>
          <Trans i18nKey="references.notes.3" ns="docsContent" components={{ 1: <code />, 3: <code /> }} />
        </li>
      </ul>
    </DocumentationSection>
  );
};

export default References;

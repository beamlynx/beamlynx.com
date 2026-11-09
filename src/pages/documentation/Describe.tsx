import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import DocumentationSection from '../../components/DocumentationSection';
import type { DocumentationExample } from '../../components/DocumentationSection';

const Describe: React.FC = () => {
  const { t } = useTranslation('docsContent');

  const examples: DocumentationExample[] = [
    {
      title: t('describe.examples.0.title'),
      expression: 'company | describe:',
      description: t('describe.examples.0.description'),
      experimental: true, // pine-lang #175, #177
    },
    {
      title: t('describe.examples.1.title'),
      expression: 'company | employee | describe:',
      description: t('describe.examples.1.description'),
      experimental: true, // pine-lang #175, #177
    },
  ];

  return (
    <DocumentationSection
      id="describe"
      title={t('describe.title')}
      description={t('describe.description')}
      operations={['describe:']}
      syntax="table_name | [operations...] | describe:"
      examples={examples}
      isOperation={true}
    >
      <p>
        <Trans
          i18nKey="describe.intro1"
          ns="docsContent"
          components={{ 1: <code />, 3: <code />, 5: <code />, 7: <code />, 9: <code /> }}
        />
      </p>
      <ul>
        <li>{t('describe.notes.0')}</li>
        <li>{t('describe.notes.1')}</li>
        <li>
          <Trans i18nKey="describe.notes.2" ns="docsContent" components={{ 1: <code />, 3: <code /> }} />
        </li>
      </ul>
    </DocumentationSection>
  );
};

export default Describe;

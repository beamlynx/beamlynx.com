import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import DocumentationSection from '../../components/DocumentationSection';
import type { DocumentationExample } from '../../components/DocumentationSection';

const Paths: React.FC = () => {
  const { t } = useTranslation('docsContent');

  const examples: DocumentationExample[] = [
    {
      title: t('paths.examples.0.title'),
      expression: 'company ? document',
      description: t('paths.examples.0.description')
    },
    {
      title: t('paths.examples.1.title'),
      expression: "company | where: active = true | ? document",
      description: t('paths.examples.1.description')
    }
  ];

  return (
    <DocumentationSection
      id="paths"
      title={t('paths.title')}
      description={t('paths.description')}
      operations={['?']}
      syntax="table_a ? table_b\ntable_a | table_b | ? table_c"
      examples={examples}
      isOperation={true}
    >
      <p>
        <Trans i18nKey="paths.intro1" ns="docsContent" components={{ 1: <code />, 3: <code /> }} />
      </p>
      <p>
        <Trans i18nKey="paths.intro2" ns="docsContent" components={{ 1: <code /> }} />
      </p>
      <ul>
        <li>{t('paths.notes.0')}</li>
        <li><Trans i18nKey="paths.notes.1" ns="docsContent" components={{ 1: <code />, 3: <code />, 5: <code /> }} /></li>
        <li><Trans i18nKey="paths.notes.2" ns="docsContent" components={{ 1: <code />, 3: <code />, 5: <code /> }} /></li>
        <li>{t('paths.notes.3')}</li>
      </ul>
    </DocumentationSection>
  );
};

export default Paths;

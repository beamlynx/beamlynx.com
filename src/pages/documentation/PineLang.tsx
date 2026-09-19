
import React from "react";
import { useTranslation } from "react-i18next";
import DocumentationSection from "../../components/DocumentationSection";

const Introduction: React.FC = () => {
  const { t } = useTranslation('docsContent');

  return (
    <DocumentationSection
      id="pine-lang"
      title={t('pineLang.title')}
      description={t('pineLang.description')}
      syntax="table_1 | table_2 | operation_1: args | operation_2: args"
    >

    </DocumentationSection>
  );
};

export default Introduction;

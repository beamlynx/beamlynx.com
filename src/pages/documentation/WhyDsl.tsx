import React from "react";
import { Trans, useTranslation } from "react-i18next";
import DocumentationSection from "../../components/DocumentationSection";

const WhyDsl: React.FC = () => {
  const { t } = useTranslation('docsContent');

  return (
    <DocumentationSection
      id="why-dsl"
      title={t('whyDsl.title')}
      description={t('whyDsl.description')}
    >
      <ul className="mb-6 space-y-2">
        <li><Trans i18nKey="whyDsl.bullets.0" ns="docsContent" components={{ 1: <i />, 3: <i /> }} /></li>
        <li>{t('whyDsl.bullets.1')}</li>
        <li>
          {t('whyDsl.bullets.2')}
        </li>
        <li>{t('whyDsl.bullets.3')}</li>
        <li>
          {t('whyDsl.bullets.4')}
        </li>
      </ul>

      {t('whyDsl.closing')}
    </DocumentationSection>
  );
};

export default WhyDsl;

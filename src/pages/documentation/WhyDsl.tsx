import React from "react";
import DocumentationSection from "../../components/DocumentationSection";

const WhyDsl: React.FC = () => {
  return (
    <DocumentationSection
      id="why-dsl"
      title="Why a DSL?"
      description={`
SQL has been the foundation of data work for decades. It's powerful, expressive, and universal. But for some tasks, it can get in the way.
      `}
    >
      <p className="mb-6">
        <ul className="mb-6 space-y-2">
          <li>SQL blurs the lines between <i>what</i> you want and <i>how</i> to get it.</li>
          <li>Composability isn't its focus.</li>
          <li>
            Results don't help you discover relationships or contenxt in your
            schema.
          </li>
          <li>SQL wasn't designed with visual exploration in mind.</li>
          <li>
            SQL can be unnecessarily verbose.
          </li>
        </ul>
      </p>

      SQL is great - but we can improve the experience with a DSL.
    </DocumentationSection>
  );
};

export default WhyDsl;

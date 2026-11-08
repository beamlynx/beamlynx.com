import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import DocumentationSection from '../../components/DocumentationSection';
import { useColorPalette } from '../../contexts/colorPalette';

// The MCP server's tools, in the order an agent usually meets them. Names
// are the same in every language; what each does is translated.
const TOOLS = [
  'list_connections',
  'find_tables',
  'complete_query',
  'run_query',
  'run_sql_as_pine',
  'get_pine_doc',
  'set_question',
  'note_finding',
  'get_access_policy',
  'propose_policy_change',
  'request_reveal',
  'check_reveal',
  'open_in_desktop',
] as const;

const CLAUDE_CODE_COMMAND = 'claude mcp add beamlynx -- "<path to Beamlynx>" --mcp';

const OTHER_CLIENTS_CONFIG = `{
  "mcpServers": {
    "beamlynx": {
      "type": "stdio",
      "command": "<path to Beamlynx>",
      "args": ["--mcp"]
    }
  }
}`;

const Agents: React.FC = () => {
  const { t } = useTranslation(['docsContent', 'docs']);
  const palette = useColorPalette();

  const h3 = (text: string) => (
    <h3 className="text-xl font-semibold mt-10 mb-3" style={{ color: palette.primary }}>
      {text}
    </h3>
  );
  const pre = (text: string) => (
    <pre
      className="my-4 p-4 rounded-lg overflow-x-auto text-sm font-mono"
      style={{ backgroundColor: 'var(--bp-panel)', border: `1px solid ${palette.secondary}20` }}
    >
      <code>{text}</code>
    </pre>
  );

  return (
    <DocumentationSection
      id="agents"
      title={t('agents.title')}
      description={t('agents.description')}
      badge={t('docs:section.experimental')}
    >
      <p>{t('agents.intro.0')}</p>
      <p>
        <Trans i18nKey="agents.intro.1" ns="docsContent" components={{ 1: <code /> }} />
      </p>

      {h3(t('agents.setup.title'))}
      <ol className="list-decimal pl-6 space-y-2">
        <li>
          <Trans i18nKey="agents.setup.steps.0" ns="docsContent" components={{ 1: <strong />, 3: <strong /> }} />
        </li>
        <li>{t('agents.setup.steps.1')}</li>
      </ol>
      <p className="mt-4">{t('agents.setup.claudeCode')}</p>
      {pre(CLAUDE_CODE_COMMAND)}
      <p>
        <Trans i18nKey="agents.setup.otherClients" ns="docsContent" components={{ 1: <code /> }} />
      </p>
      {pre(OTHER_CLIENTS_CONFIG)}
      <p>
        <Trans i18nKey="agents.setup.databases" ns="docsContent" components={{ 1: <strong /> }} />
      </p>

      {h3(t('agents.tools.title'))}
      <p>{t('agents.tools.intro')}</p>
      <dl className="mt-4 space-y-3">
        {TOOLS.map(tool => (
          <div key={tool}>
            <dt className="font-mono font-semibold" style={{ color: palette.accent }}>
              {tool}
            </dt>
            <dd className="pl-4">
              <Trans i18nKey={`agents.tools.items.${tool}`} ns="docsContent" components={{ 1: <code /> }} />
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4">
        <Trans i18nKey="agents.tools.coming" ns="docsContent" components={{ 1: <code /> }} />
      </p>

      {h3(t('agents.masking.title'))}
      <p>{t('agents.masking.0')}</p>
      <p>{t('agents.masking.1')}</p>

      {h3(t('agents.reveal.title'))}
      <p>{t('agents.reveal.0')}</p>

      {h3(t('agents.proposals.title'))}
      <p>{t('agents.proposals.0')}</p>
    </DocumentationSection>
  );
};

export default Agents;

import { DocumentData } from 'firebase/firestore';

/**
 * @example Widget Payload
 *
 * {
 *   agents: [
 *     'kkubanychbek@snapengage.com',
 *     'gloompi@gmail.com',
 *     'kkubanychbek+2@teamsupport.com',
 *     'bot:api:1746cdac-bf35-4b95-957c-fb2a5c5e7dbe:263994133:routing',
 *   ],
 *   createdTimestamp: 1657119797519,
 *   featureToggles: {
 *     firestore: false,
 *   },
 *   hasAgentLinks: true,
 *   hasKnowledgeBase: true,
 *   hasPersistentAgentLink: true,
 *   id: 6508563027591168,
 *   name: 'Gloompi&#39;s Widget',
 *   orgId: 5257978542424064,
 *   publicId: '1746cdac-bf35-4b95-957c-fb2a5c5e7dbe',
 *   sneakPeak: {
 *     agentTypingEnabled: false,
 *     supervisorTypingEnabled: true,
 *     visitorTypingEnabled: true,
 *   },
 *   supervisors: null,
 *   widgetId: 6508563027591168,
 *   widgetName: 'Gloompi&#39;s Widget',
 *   widgetPublicId: '1746cdac-bf35-4b95-957c-fb2a5c5e7dbe',
 * };
 */

export enum AgentIntroAlertTypes {
  TAB = 'TAB',
  SYS_MESSAGE = 'SYS_MESSAGE',
  TAB_AND_SYS_MESSAGE = 'TAB_AND_SYS_MESSAGE',
}

export type AgentIntroAlertKeys = keyof typeof AgentIntroAlertTypes;
export type AgentIntroAlertValues =
  typeof AgentIntroAlertTypes[AgentIntroAlertKeys];

export enum FileTypeRestrictionTypes {
  WHITELIST = 'WHITELIST',
  EXECUTABLE = 'EXECUTABLE',
  BLACKLIST = 'BLACKLIST',
}

export type AgentIntroAlertSettings = {
  enabled: boolean;
  message: string;
  alertType: AgentIntroAlertTypes;
};

export type SecureDataExchangeSettings = {
  cc: boolean;
  ccWithZip: boolean;
  ssn: boolean;
  secureNote: boolean;
  enabled: boolean;
};

export type FileExchangeSettings = {
  enabled: boolean;
  visitorFileUploadEnabled: boolean;
  agentFileUploadEnabled: boolean;
  fileTypeRestrictionEnabled: boolean;
  fileTypes: string[];
  fileTypeRestriction: FileTypeRestrictionTypes;
  allowVisitorInitiatedFileUpload: boolean;
};

export type ScreenSharingSettings = {
  agentEnabled: boolean;
  visitorEnabled: boolean;
};

export type SneekPeakSettings = {
  agentTypingEnabled: boolean;
  supervisorTypingEnabled: boolean;
  visitorTypingEnabled: boolean;
};

export type SupervisorSettings = {
  agentWhisperEnabled: boolean;
};

export type AIAssistanceSettings = {
  aiAssistEnabled: boolean;
  sentimentOnSupervisorChatView: boolean;
  sentimentOnSupervisorTableView: boolean;
  sentimentOnTransfer: boolean;
  summarizerOnAgentDemand: boolean;
  summarizerOnSupervisorChatView: boolean;
  summarizerOnTransfer: boolean;
};
export interface Widget extends DocumentData {
  agents: string[];
  aiAssistSettings?: AIAssistanceSettings;
  createdTimestamp: number;
  chatShortcuts: string[];
  hasAgentLinks: boolean;
  hasKnowledgeBase: boolean;
  hasPersistentAgentLink: boolean;
  id: number;
  name: string;
  orgId: number;
  publicId: string;
  sneakPeak: SneekPeakSettings;
  // Array of supervisor emails
  supervisors: string[];
  widgetId: string;
  widgetName: string;
  widgetPublicId: string;
  autoTranslateEnabled: boolean;
  agentIntroAlertSettings: AgentIntroAlertSettings;
  secureDataExchangeSettings: SecureDataExchangeSettings;
  screenSharingSettings: ScreenSharingSettings;
  fileExchangeSettings: FileExchangeSettings;
  agentTransferRestricted: boolean;
  language: string;
  secureAccount: boolean;
  visitorTranscriptTracked: boolean;
  hasLabels: boolean;
  supervisorSettings: SupervisorSettings;
}

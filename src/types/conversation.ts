import { Agent } from './agent';
import { Message } from './messages';

export enum CHAT_STATUS {
  AGENT_ASSIGNED = 'AGENT_ASSIGNED',
  AGENT_CONNECTED = 'AGENT_CONNECTED',
  ALL_AGENTS_BUSY = 'ALL_AGENTS_BUSY',
  CLOSED = 'CLOSED',
  NO_AGENT_AVAILABLE = 'NO_AGENT_AVAILABLE',
  PENDING_CLOSED = 'PENDING_CLOSED',
  SEARCHING_AGENT = 'SEARCHING_AGENT',
  UNKNOWN = 'UNKNOWN',
}

export interface ChatStatus {
  lastUpdated: number;
  value: CHAT_STATUS;
}

export const geoData = {
  timezone: 'string',
  latitude: 'string',
  city: 'string',
  countryName: 'string',
  longitude: 'string',
  countryCode: 'string',
  regionCode: 'string',
  isp: 'string',
  organization: 'string',
};

export type GeoDataKeys = keyof typeof geoData;

export type GeoDataValues = typeof geoData[GeoDataKeys];

export type LanguageMap = {
  [language in string]: { code: string; language: string; q?: string };
};

export enum CHANNEL_TYPES {
  POLL = 'POLL',
  FACEBOOK = 'FACEBOOK',
  SMS = 'SMS',
  WHATSAPP = 'WHATSAPP',
  GOOGLE = 'GOOGLE',
}

export enum HMAC_VERIFICATION_RESULT_STATUS {
  VERIFIED = 'VERIFIED',
  INVALID = 'INVALID',
  EXPIRED = 'EXPIRED',
  NULL = 'NULL',
}

export interface LastRespondedParty {
  lastUpdated: number;
  value: 'AGENT' | 'VISITOR';
}

export interface VisitorEmail {
  lastUpdated: number;
  value: string | 'unknown@example.com';
}

export interface VisitorPlatform {
  browser: string[];
  os: string[];
}

export interface TransferDetails {
  transferringAgent: Agent | null;
  inTransfer: boolean;
}

export interface ConversationContact extends Record<string, unknown> {
  age: number;
  title: string;
  companyName: string;
  avatars: string[];
  emails: string[];
  id: number;
  name: string;
  nameProfileLink?: string;
  notes: string;
  otherIds: string[];
  others: string[];
  phones: string[];
  socialProfileLinks: string[];
  source: string;
  widgetId: number;
  decodedSearchData: string[];
}

export interface AutoTranslateOptions {
  enabled: boolean;
  selectedLanguage: string | null;
}

export interface HmacVerificationResult {
  verificationProperty: {
    property: string;
    jsVariableName: string;
  };
  content: string;
  status: HMAC_VERIFICATION_RESULT_STATUS;
}

export type Sentiment = {
  reason?: string;
  summary?: string;
  score?: number;
};

export type GeoData = Partial<Record<GeoDataKeys, GeoDataValues>>;
export const NO_INTEGRATION_FLAG = 'none:donotsend';
export interface ConversationDetails {
  entryUrl: string;
  extraVariables: string[];
  history: ConversationHistory;
  geoData: GeoData;
  hmacVerificationResult?: HmacVerificationResult | null;
  ipAddress?: string;
  language: string;
  languageMap: LanguageMap;
  pageUrl: string;
  visitorPhoneNumber?: string;
  referrer: string;
  variablesJS: string;
  visitorPlatform: VisitorPlatform;
  pageTitle: string;
  destinationUrl: string | null | typeof NO_INTEGRATION_FLAG;
  chatChannel: CHANNEL_TYPES;
  secureChannel: boolean;
  autoTranslateOptions: AutoTranslateOptions;
}

export interface ConversationHistory {
  previousConversations: Array<{ casePublicId: string; timestamp: number }>;
  visitsCount: number;
}

export interface Conversation {
  agents: Agent[];
  assignedAgents: string[];
  casePublicId: string;
  contact: ConversationContact;
  counter?: {
    whisperCount: number;
  } | null;
  createdTimestamp: number;
  duration: number;
  details: ConversationDetails;
  hasVisitorApproval: boolean;
  lastRespondedParty?: LastRespondedParty;
  orgId: number;
  startTime: number;
  status: ChatStatus;
  visitorEmail: VisitorEmail | null;
  widgetId: number;
  widgetName: string;
  widgetPublicId: string;
  redacted: boolean | null;
  transferDetails: TransferDetails;
  sentimentScore?: number;
  summaryDetails?: {
    reason: string;
    summary: string;
    contact: string;
  };
}

export type RecentConversation = Conversation & {
  transcript: Message[];
};

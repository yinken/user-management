import { WebsiteMeta } from 'hubv2/common/rich-snippet/RichSnippet';
import { Message } from './messages';
import { USER_STATUS_TYPES } from './user-status';

export interface SneakPeekRequest {
  text: string;
  sender: 'SUPERVISOR' | 'AGENT';
  status: 'COMPOSING' | 'PAUSED';
  source?: 'MESSAGE' | 'WHISPER';
}
export interface SendMessageRequest {
  visitorNumber: number;
  casePublicId: string;
  from: string;
  body: string;
  type: string;
  identifier: string;
  translations?: Record<string, string | number>;
}

export interface SendMessageResponse {
  messageId: 6228366544994304;
  casePublicId: '31c59e01-ae9c-46a6-a935-7a2bffce3eab';
  from: 'martin.senne@snapengage.com';
  body: 'Lorem Ipsum';
  systemMessage: false;
  translations: Record<string, string | number>;
  createdDate: 1669845909143;
  sender: {
    jid: '';
    alias: '';
    avatar: '';
    type: 'AGENT';
  };
  contentType: 0;
  type: 'message';
  identifier: '1c84c151-6853-44b3-acfb-4988e26b46c0';
  timestamp: 1669845909863;
}

export interface SendWhisperMessageRequest {
  text: string;
  deduplicationId: string;
}

/**
 * @example Shortcuts response
 *
 * [
 *   "lorem,Lorem ipsum dolor sit amet, consetetur sadipscing elitr, ...",
 *   "welcome,Hello, my name is {alias}.<br> How may I help you?"
 * ]
 */

export interface SendInternalMessageRequest {
  visitorNumber: number;
  publicId: string;
  sender: string;
  message: string;
  type: string;
  identifier: string;
}

export type ShortcutsResponse = string[] | [];

/**
 * @example SearchTransfer response
 *
 * {
 *  '1fe68ee7-993c-40f1-9593-4e556474edf5': 'Widget with Labels';
 *  'fd944bb7-5869-4d6a-81ff-a407239e2dbe': 'Widget with no labels';
 * }
 */

export type SearchTransferResponse = Record<string, string> | [];

export type LiveInformationResponse =
  | Record<string, { agentEmail: string; currentChatCount: number }>
  | Record<string, never>;

export type Interaction = {
  interactionId: string;
  timestamp: number;
};

export type InteractionsResponse = {
  casePublicId: string;
  widgetPublicId: string;
  fromUrl: string;
  entryPageUrl: string;
  entryPageReferrer: string;
  transcript: []; // We don't care about this one
  transcriptV2: Message[];
  closedBy: string;
  agentSurvey: {
    score: null;
    comments: null;
    type: null;
  };
  linkToInteraction: string;
  variablesJS: string;
  previousInteractions: Interaction[];
  dataRemoved: boolean;
  operatorVariables: null;
};

export type ChatmonitorResponse = {
  activeChats: number;
  notifiedChats: number;
  waitingChats: number;
  agentsOnline: number;
  agentsPaused: number;
  agentsOffline: number;
};

export type PresenceRequest = {
  from?: string; // email, without wc:
  status: USER_STATUS_TYPES;
  subStatus?: string;
  type: 'presence';
  presenceChangeType: 'manual' | 'sync';
};

export enum HELP_ARTICLE_SOURCES {
  WORDPRESS = 'Wordpress',
  ZENDESK = 'Zendesk',
  GOOGLE = 'Google Search',
  MINDTOUCH = 'Mindtouch',
  SALESFORCE = 'Salesforce',
  TEAMSUPPORT = 'TeamSupport',
}

export type HelpArticle = {
  source: HELP_ARTICLE_SOURCES;
  link: string;
  title: string;
  summary: string;
  description: string;
  visible: boolean;
};

export type SearchActionResponse = HelpArticle[];

export type AgentLink = {
  name: string;
  value: string;
  type: 'url' | 'text';
  persistentLink: boolean;
};

export type AgentLinkResponse = AgentLink[];

export type SecureKeyResponse = {
  salt: string;
  iv: string;
  passphrase: string;
};

export type WeatherImage =
  | 'chanceflurries'
  | 'chancerain'
  | 'chancesleet'
  | 'chancesnow'
  | 'chancetstorms'
  | 'clear'
  | 'cloudy'
  | 'flurries'
  | 'fog'
  | 'hazy'
  | 'mostlycloudy'
  | 'mostlysunny'
  | 'partlycloudy'
  | 'partlysunny'
  | 'sleet'
  | 'rain'
  | 'snow'
  | 'sunny'
  | 'tstorms'
  | 'nt_chanceflurries'
  | 'nt_chancerain'
  | 'nt_chancesleet'
  | 'nt_chancesnow'
  | 'nt_chancetstorms'
  | 'nt_clear'
  | 'nt_cloudy'
  | 'nt_flurries'
  | 'nt_fog'
  | 'nt_hazy'
  | 'nt_mostlycloudy'
  | 'nt_mostlysunny'
  | 'nt_partlycloudy'
  | 'nt_partlysunny'
  | 'nt_sleet'
  | 'nt_rain'
  | 'nt_snow'
  | 'nt_sunny'
  | 'nt_tstorms';

export type WeatherResponse = {
  conditions: string;
  tempC: string;
  tempF: string;
  image: WeatherImage;
};
export type Statistic = {
  startDate: number;
  endDate: number;
  caseCount: number;
  avgResponseTime: number;
  avgChatTime: number;
  surveyCount: number;
  avgSurveyScore: number;
  surveyInfo: [];
};

export type StatisticsResponse = Statistic[];

export type News = {
  link: string;
  title: string;
  description: string;
  publishedDate: 1669845197000;
};

export type NewsResponse = News[];

export type DetailedAgentReport = {
  position: string;
  id: string;
  alias: string;
  status: string;
  subStatus: string;
  widget: string[];
  avatarUrl: string;
  allowChat: boolean;
};

export type AgentStatusResponse = {
  result: 'success' | 'failure'; // unclear about the last one...
  value: DetailedAgentReport[];
};

export type WidgetAvailabilityInfo = {
  chatAssignMode: number;
  maxChatCt: number;
  activeChatCt: number;
  maxNotifiedChatCt: number;
  notifiedChatCt: number;
  waitingChatCt: number;
  agentsOnlineCt: number;
  agentsPausedCt: number;
  agentsOfflineCt: number;
  agentsInChatCt: number;
};

export type AgentAvailabilityInfo = {
  agentId: string;
  agentAlias: string;
  agentAvatar: string;
  maxChatCt: number;
  activeChatCt: number;
  notifiedChatCt: number;
  otherWidgetsChatCt: number;
  activeChats: [];
  notifiedChats: [];
  botTools: {
    userStatusService: {
      userStatusDAO: Record<string, unknown>;
    };
    eventTools: {
      eventDAO: Record<string, unknown>;
    };
  };
};

export type DashboardData = {
  widgetId: number;
  data: {
    agents: {
      online: AgentAvailabilityInfo[];
      pause: AgentAvailabilityInfo[];
      offline: AgentAvailabilityInfo[];
    };
    widget: WidgetAvailabilityInfo;
    waitingChats: [];
  };
};

export type SearchSwitchData = Record<string, string>;

export type WebsiteMetaResponse = WebsiteMeta;

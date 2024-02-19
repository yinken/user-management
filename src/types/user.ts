import {
  DESKTOP_NOTIFICATIONS_ENUM,
  SOUNDS_ENUM,
} from 'hubv2/utils/notifications';
import { USER_STATUS_TYPES } from './user-status';

export interface UserWithStringifiedPreferences {
  id: number;
  name: string;
  email: string;
  registeredDate: string;
  phone: string;
  avatarUrl: string;
  preferences: string;
  agentStatusConfig?: string;
  initialAgentStatus: AgentStatus;
  widgetAdmin: boolean;
  accountStatus: ACCOUNT_STATUSES;
  accountType: ACCOUNT_TYPES;
  instanceName: string;
  gcsBaseFileBucket: string;
  logoURLConfigurator: string;
  supportEmailAddress: string;
  identifier: string;
}

export interface User
  extends Omit<
    UserWithStringifiedPreferences,
    'preferences' | 'agentStatusConfig'
  > {
  hubPreferences?: UserPreferences | null;
  agentStatusConfig?: AgentStatusConfig;
}

export interface AgentStatus {
  status: USER_STATUS_TYPES;
  subStatus: string;
}

export type Analytics = {
  userId: string; //'4800652593201152'
  userEmail: string;
  userFullName: string;
  userFirstName: string;
  userLastName: string;
  userRole: string[];
  userCreatedDate: string; //'2021-12-06T09:05'
  accountId: string; //'4800652593201152'
  accountIDList: string; //'4800652593201152'
  accountPlanName: string; //'Enterprise'
  accountArrBucket: number;
  accountStatus: string;
  accountRegisteredDate: string; // '2021-12-06T09:05'
  accountExpirationDate: string; // '2024-12-13T09:05'
  accountPaymentTerms: string; //'Yearly'
  accountPaymentType: string; //'Invoice'
  accountHipaa: boolean;
  accountARR: number;
  accountDaysUntilRenewal: number;
  instanceName: string; // 'snapabug-hr-staging'
  instanceVersion: string; // 'master'
  ownerEmail: string;
  organizationName: string;
  ownerFirstName: string;
  ownerLastName: string;
};

export type Sounds =
  | 'bonk'
  | 'baby'
  | 'beep'
  | 'chime'
  | 'click'
  | 'deep'
  | 'kiss'
  | 'laugh'
  | 'mallets'
  | 'marimba'
  | 'musical'
  | 'plop'
  | 'snap'
  | 'sneeze'
  | 'staple'
  | 'synthesized'
  | 'tap'
  | 'warning'
  | 'none';

export type UserPreferences = {
  repeatNewChatSound: boolean;
  autoScrollVisitorChatTranscript: boolean;
  temperatureMeasurement: 'F' | 'C';
  autoCollapseVisitorDetails: boolean;
  displayRichShortcuts: boolean;
  timeDisplay: '12' | '24';
  autoPauseDelay: '-1' | '5' | '10' | '15' | '20' | '25' | '30' | '60';
  repeatNewChatReturnVisitorSound: boolean;
  theme: 'light' | 'dark';
  repeatUntilAnswered: { enabled: boolean; data: 15 | 30 | 45 | 60 };
  alertSetting: 'ALL_DISABLED' | 'ALL_ENABLED' | 'NEWCHAT_AND_MENTIONS';
} & Record<SOUNDS_ENUM, Sounds | SOUNDS_ENUM> &
  Record<DESKTOP_NOTIFICATIONS_ENUM, boolean>;

export interface AgentStatusConfig {
  online: {
    statuses: StatusDetail[];
  };
  paused: {
    statuses: StatusDetail[];
  };
}

type StatusDetail = { description: string };

export enum ACCOUNT_TYPES {
  ACCOUNT_ENTERPRISE = 9,
  ACCOUNT_PROFESSIONAL = 15,
  ACCOUNT_RESELLER = 8,
  ACCOUNT_UNLIMITED = 7,
}

export enum ACCOUNT_STATUSES {
  FAILING_PAYMENT = 'failing_payment',
}

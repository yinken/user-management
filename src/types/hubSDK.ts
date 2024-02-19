import { Sender } from './messages';

export type HubSDKSession = {
  casePublicId: string;
  url: string;
  frameRef: HTMLIFrameElement | null;
};

export enum HUBSDK_SEND_EVENT {
  AGENT_MESSAGE_RECEIVED = 'agent_message_received',
  VISITOR_MESSAGE_RECEIVED = 'visitor_message_received',
  NAME_CAPTURED = 'name_captured',
  VISITOR_PAGE_UPDATE = 'visitor_page_update',
  CONVERSATION_CLOSED_BY_SYSTEM = 'conversation_closed_by_system',
  CONVERSATION_CLOSED_BY_VISITOR = 'conversation_closed_by_visitor',
  CONVERSATION_CLOSED_BY_AGENT = 'conversation_closed_by_agent',
  CASE_CALLBACK = 'conversation_sent_integration',
  PHONE_CAPTURED = 'phone_captured',
  EMAIL_CAPTURED = 'email_captured',
  RECLAIM_TRANSFER_REQUEST = 'reclaim_transfer_request',
  REQUEST_FILE = 'request_file',
  SEND_FILE = 'send_file',
  REQUEST_SECURE_DATA = 'request_secure_data',
  BAN_USER = 'ban_user',
  CALL_ME = 'call_me',
  VISITOR_TRANSCRIPT_REQUEST = 'visitor_transcript_request',
  WIDGET_CHANGED = 'widget_changed',
  IGNORE = 'ignore',
  RECORD = 'record',
  AUTO_TRANSLATE_ENABLED = 'auto_translate_enabled',
  AUTO_TRANSLATE_DISABLED = 'auto_translate_disabled',
  AUTO_TRANSLATE_LANGUAGE_CHANGED = 'auto_translate_language_changed',
  WEATHER_INFO_CAPTURED = 'weather_info_captured',
  CONVERSATION_TRANSFERRED = 'conversation_transferred',
}

export enum HUBSDK_RECEIVE_EVENT {
  AGENT_MESSAGE_RECEIVED = 'agent_message_received',
  RECLAIM_TRANSFER_REQUEST = 'reclaim_transfer_request',
  TRANSFER_REQUEST = 'transfer_request',
  BAN_USER = 'ban_user',
  CONVERSATION_CLOSED_BY_AGENT = 'conversation_closed_by_agent',
  REQUEST_FILE = 'request_file',
  REQUEST_SECURE_DATA = 'request_secure_data',
  POPULATE_TEXT = 'populate_text',
  LABEL_ADDED = 'label_added',
  LABEL_REMOVED = 'label_removed',
}

export type HubSDKSendEvent = {
  sender: Sender;
  conversationId: string;
  data: Record<string, number | string> | string | number;
  type: HUBSDK_SEND_EVENT;
  timestamp: number;
};

export type HubSDKDataTypes = TextData | SecureData | TransferData;

export type TextData = { message: string };
export type SecureData = {
  secureDataType: 'SSN' | 'Credit Card' | 'Secure Note';
};
export type BanUserData = {
  type: 'cookie' | 'ip';
};
export type TransferData = {
  type: 'agent' | 'widget';
  widgetId?: string;
  agentEmail?: string;
};
export type LabelData = { labelName: string; value: string; freeForm: boolean };
export type PopulateTextData = { message: string };
export interface BaseHubSDKReceiveEvent {
  type: HUBSDK_RECEIVE_EVENT;
  conversationId: string;
  agent: string;
}

export type HubSDKReceiveEvent<T> = BaseHubSDKReceiveEvent & {
  data: T;
};

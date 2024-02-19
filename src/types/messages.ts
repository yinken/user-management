import { EVENT_TYPES } from './events';
import { Tone } from './tone';
import { Translations } from './translations';

export enum IMAGE_RATIO {
  SQUARE = 'square',
  TALL = 'tall',
  VERY_TALL = 'very-tall',
  LONG = 'long',
  VERY_LONG = 'very-long',
}

export enum MESSAGE_TYPE {
  TEXT = 'TEXT',
  SYSTEM = 'SYSTEM',
  FILE_UPLOAD = 'FILE_UPLOAD',
  SECURE_REDACTED = 'SECURE',
  SCALE = 'SCALE',
  WHISPER = 'WHISPER',
  EVENT = 'EVENT',
  WEATHER_INFO = 'WEATHER_INFO',
  ENCRYPTED_DATA = 'ENCRYPTED_DATA',
  SENTIMENT = 'SENTIMENT',
  DATE_CHANGE = 'DATE_CHANGE',
  COMMENT = 'COMMENT',
  ASSISTANT = 'ASSISTANT',
}

export enum MESSAGE_SUBTYPE {
  EMAIL_CAPTURED = 'EMAIL_CAPTURED',
  NAME_CAPTURED = 'NAME_CAPTURED',
  PHONE_CAPTURED = 'PHONE_CAPTURED',
  VISITOR_PAGE_RELOADED = 'VISITOR_PAGE_RELOADED',
  CONVERSATION_CLOSED_BY_SYSTEM = 'CONVERSATION_CLOSED_BY_SYSTEM',
  CONVERSATION_CLOSED_BY_VISITOR = 'CONVERSATION_CLOSED_BY_VISITOR',
  CONVERSATION_CLOSED_BY_AGENT = 'CONVERSATION_CLOSED_BY_AGENT',
  RECLAIM_TRANSFER_REQUEST = 'RECLAIM_TRANSFER_REQUEST',
  CONVERSATION_TRANSFER = 'CONVERSATION_TRANSFER',
  FILE_REQUESTED = 'FILE_REQUESTED',
  SECURE_DATA_REQUESTED = 'SECURE_DATA_REQUESTED',
  USER_BANNED = 'USER_BANNED',
  CALL_ME_REQUESTED = 'CALL_ME_REQUESTED',
  TRANSCRIPT_REQUESTED = 'TRANSCRIPT_REQUESTED',
  WIDGET_CHANGED = 'WIDGET_CHANGED',
  CONVERSATION_IGNORED = 'CONVERSATION_IGNORED',
  CONVERSATION_RECORDED = 'CONVERSATION_RECORDED',
  AUTO_TRANSLATE_ENABLED = 'AUTO_TRANSLATE_ENABLED',
  AUTO_TRANSLATE_DISABLED = 'AUTO_TRANSLATE_DISABLED',
  AUTO_TRANSLATE_LANGUAGE_CHANGED = 'AUTO_TRANSLATE_LANGUAGE_CHANGED',
  SCREEN_SHARING_REQUEST = 'SCREEN_SHARING_REQUEST',
}

/**
 * Per Kiryl, we still expect SYSTEM as a sender type that can be received by
 * a supervisor, which is why we're not replacing it with "SUPERVISOR" here
 */
export enum SENDER_TYPES {
  AGENT = 'AGENT',
  VISITOR = 'VISITOR',
  SYSTEM = 'SYSTEM',
  ASSISTANT = 'ASSISTANT',
}

export enum SUBSTITUTIONS {
  MENTION = 'MENTION',
  EMAIL = 'EMAIL',
  LINK = 'LINK',
  EMOJI = 'EMOJI',
  CODE = 'CODE',
  VARIABLE = 'VARIABLE',
  NEWLINE = 'NEWLINE',
}

export interface Substitution {
  placeholderId: string;
  value?: string;
  type: SUBSTITUTIONS;
}

export type Sender = {
  id: string;
  alias: string;
  avatar: string;
  senderType: SENDER_TYPES;
};

interface BaseMessage {
  id: string;
  createdTimestamp: number;
  type: MESSAGE_TYPE;
  sender: Sender;
  casePublicId: string;
  read?: boolean;
  orgId: string;
}

export interface EventMessage extends BaseMessage {
  data: Record<string, string>;
  type: MESSAGE_TYPE.EVENT;
  eventType: EVENT_TYPES;
}

export interface TextMessage extends BaseMessage {
  text: string;
  translations?: Translations;
  type: MESSAGE_TYPE.TEXT;
  substitutions?: Record<string, Substitution>;
}

export interface AssistantMessage extends BaseMessage {
  text: string;
  type: MESSAGE_TYPE.ASSISTANT;
}

export interface SystemMessage extends BaseMessage {
  text: string;
  substitutions?: Record<string, Substitution>;
  type: MESSAGE_TYPE.SYSTEM;
  subType: MESSAGE_SUBTYPE;
  data: string;
}

export interface CommentMessage extends BaseMessage {
  text: string;
  type: MESSAGE_TYPE.COMMENT;
}
export interface DateMessage extends BaseMessage {
  text: string;
  type: MESSAGE_TYPE.DATE_CHANGE;
}

export interface WhisperMessage extends BaseMessage {
  text: string;
  substitutions?: Record<string, Substitution>;
  type: MESSAGE_TYPE.WHISPER;
  deduplicationId: string;
}

export interface SentimentMessage extends BaseMessage {
  tone?: Tone;
  text?: string;
  type: MESSAGE_TYPE.SENTIMENT;
  showSummary?: boolean;
  showSentiment?: boolean;
}
export interface SecureMessage extends BaseMessage {
  text: string;
  type: MESSAGE_TYPE.ENCRYPTED_DATA;
  substitutions?: Record<string, Substitution>;
  encryptedData: string;
}

export interface FileUploadMessage extends BaseMessage {
  mimeType: string;
  fileName: string;
  url: string;
  type: MESSAGE_TYPE.FILE_UPLOAD;
}

export interface ScaleMessage extends BaseMessage {
  format: 'NUMBERS' | 'STARS';
  scaleStart: number;
  scaleEnd: number;
  userInput: number;
  type: MESSAGE_TYPE.SCALE;
  isValid: boolean;
  max?: number;
}

export interface WeatherMessage extends BaseMessage {
  conditions: string;
  image: string;
  tempC: string;
  tempF: string;
  type: MESSAGE_TYPE.WEATHER_INFO;
}

export type Message =
  | TextMessage
  | ScaleMessage
  | SystemMessage
  | WhisperMessage
  | SecureMessage
  | EventMessage
  | FileUploadMessage
  | WeatherMessage
  | SentimentMessage
  | DateMessage
  | AssistantMessage
  | CommentMessage;

type BaseInternalMessage = {
  id: string;
  createdTimestamp: number;
  type: MESSAGE_TYPE;
  sender: Sender;
  conversationId: string;
  substitutions?: Substitution[];
  messageType: MESSAGE_TYPE;
  name?: string;
  read?: boolean;
};

export interface TextInternalMessage extends BaseInternalMessage {
  text: string;
  messageType: MESSAGE_TYPE.TEXT;
}

export interface FileUploadInternalMessage extends BaseInternalMessage {
  mimeType: string;
  fileName: string;
  url: string;
  messageType: MESSAGE_TYPE.FILE_UPLOAD;
}

export type InternalMessage = FileUploadInternalMessage | TextInternalMessage;

export interface MessagesGroup {
  sender: Sender;
  messages: Message[];
}

export type RespondedParty = {
  casePublicId: string;
  createdTimestamp: number;
  value: 'AGENT' | 'VISITOR';
};

export enum AUTHOR_TYPE {
  AGENT = 1,
  VISITOR = 2,
  BOT = 5,
}

export enum MESSAGE_MODE {
  VISITOR = 'visitor',
  AGENT_WHISPER = 'agent-whisper',
  SUPERVISOR_WHISPER = 'supervisor-whisper',
  INTERNAL = 'internal',
  ASSISTANT = 'assistant',
}

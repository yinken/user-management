import { DocumentData } from 'firebase/firestore';
import { Agent } from './agent';
import { EVENT_TYPES } from './events';
import { MESSAGE_SUBTYPE, MESSAGE_TYPE, Substitution } from './messages';
import { Translations } from './translations';
type Substitutions = Record<string, Substitution>;

interface BaseMessageDocument extends DocumentData {
  casePublicId: string;
  createdTimestamp: number;
  id: string;
  orgId: number;
  sender: Agent;
  type: MESSAGE_TYPE;
  subType?: string;
}

interface EventMessageDocument extends BaseMessageDocument {
  data: Record<string, string>;
  type: MESSAGE_TYPE.EVENT;
  eventType: EVENT_TYPES;
}

interface TextMessageDocument extends BaseMessageDocument {
  substitutions?: Substitutions;
  text: string;
  translations?: Translations;
  type: MESSAGE_TYPE.TEXT;
}

interface SecureMessageDocument extends BaseMessageDocument {
  text: string;
  type: MESSAGE_TYPE.SECURE_REDACTED;
}

interface SystemMessageDocument extends BaseMessageDocument {
  substitutions?: Substitutions;
  text: string;
  type: MESSAGE_TYPE.SYSTEM;
  subType?: MESSAGE_SUBTYPE;
}

interface WhisperMessageDocument extends BaseMessageDocument {
  deduplicationId: string;
  substitutions?: Substitutions;
  text: string;
  translations?: Record<string, unknown>;
  type: MESSAGE_TYPE.WHISPER;
}

interface FileUploadMessageDocument extends BaseMessageDocument {
  fileName: string;
  mimeType: string;
  type: MESSAGE_TYPE.FILE_UPLOAD;
  url: string;
}

interface ScaleMessageDocument extends BaseMessageDocument {
  format: 'NUMBERS' | 'STARS';
  isValid: boolean;
  scaleEnd: number;
  scaleStart: number;
  type: MESSAGE_TYPE.SCALE;
  userInput: number;
}

interface WeatherMessageDocument extends BaseMessageDocument {
  conditions: string;
  deduplicationId: string;
  image: string;
  tempC: string;
  tempF: string;
}

export type FirebaseMessageDocument =
  | FileUploadMessageDocument
  | ScaleMessageDocument
  | SecureMessageDocument
  | SystemMessageDocument
  | TextMessageDocument
  | WhisperMessageDocument
  | EventMessageDocument
  | WeatherMessageDocument;

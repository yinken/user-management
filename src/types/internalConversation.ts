import { SENDER_TYPES } from './messages';

export type InternalConversation = {
  createdTimestamp: number;
  participants: Participant[];
  participantsEmails: string[];
  id: string;
  name: string;
};

export type Participant = {
  id: string;
  phone: string;
  agentAvatar: string;
  agentType: 'AGENT' | 'SUPERVISOR';
  avatar: string;
  alias: string;
  agentAlias: string;
  agentJid: string;
  senderType: SENDER_TYPES;
};

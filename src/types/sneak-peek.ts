import { DocumentData } from 'firebase/firestore';

export const enum SNEAK_PEEK_SENDER_TYPES {
  AGENT = 'AGENT',
  VISITOR = 'VISITOR',
  SUPERVISOR = 'SUPERVISOR',
  ASSISTANT = 'ASSISTANT',
}

export const enum TEXT_MESSAGE_SOURCE_TYPE {
  MESSAGE = 'MESSAGE',
  WHISPER = 'WHISPER',
}

/**
 * @example SneakPeek payload
 *
 * {
 *   orgId: 12345,
 *   casePublicId: "123-abc",
 *   createdTimestamp: 123456789,
 *   text: "sneak peek",
 *   source: "WHISPER",
 *   sender: {
 *     alias: "Agent Smith",
 *     avatar: "https://avatars.com/agent-smith.png"
 *     id: "wc:agent.smith@matrix.com",
 *     senderType: "AGENT"
 *    }
 *  }
 */
export interface SneakPeek extends DocumentData {
  casePublicId: string;
  createdTimestamp: number;
  orgId: number;
  text: string;
  source: TEXT_MESSAGE_SOURCE_TYPE;
  sender: {
    alias: string;
    avatar: string;
    id: string;
    senderType: SNEAK_PEEK_SENDER_TYPES;
  };
}

import { DocumentData } from 'firebase/firestore';

/**
 * @example InternalChat payload
 *
 * {}
 */
export interface InternalChat extends DocumentData {
  // Datetime
  createdDate: string;
  id: string;
  name: string;
  // Array of avatas URLs
  participantsAvatarUrls: string[];
  // Array of paticipant emails
  participantsEmails: string[];
  // Array of participant names
  participantsNames: string[];
}

/**
 * @example InternalChatMessage payload
 *
 * {}
 */
export interface InternalChatMessage extends DocumentData {
  chatPublicId: string;
  id: number;
  // Datetime
  sent: string;
  text: string;
  userEmail: string;
  userName: string;
}

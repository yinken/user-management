import { SENDER_TYPES } from './messages';
/**
 * @example FirebaseAgent Payload
 *
 * {}
 */

export type Agent = {
  alias: string;
  avatar: string;
  id: string;
  senderType: SENDER_TYPES;
  phone?: string;
};

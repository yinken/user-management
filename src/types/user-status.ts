import { DocumentData } from 'firebase/firestore';

export enum USER_STATUS_CHANGE_TYPES {
  AUTO = 'AUTO',
  CONNECTION_LOSS = 'CONNECTION_LOSS',
  END_SESSION = 'END_SESSION',
  SYNC = 'SYNC',
}

export enum USER_STATUS_TYPES {
  ONLINE = 'online',
  PAUSE = 'pause',
  OFFLINE = 'offline',
}

/**
 * @example UserStatus Payload
 *
 * {
 *   email: "agent@test.com",
 *   status: 'PAUSE',
 *   subStatus: "out for lunch",
 *   statusChangeType: 'END_SESSION'
 * }
 */
export interface UserStatus extends DocumentData {
  email: string;
  status: USER_STATUS_TYPES;
  // Possible reason of status change.
  statusChangeType: USER_STATUS_CHANGE_TYPES;
  // One of available sub statuses, which are configured in admin dashboard.
  subStatus: string;
}

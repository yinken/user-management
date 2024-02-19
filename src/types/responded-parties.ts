import { DocumentData } from 'firebase/firestore';

/**
 * @example FirebaseRespondedParties payload
 *
 * {
 *   casePublicId: "123-abc",
 *   createdTimestamp: 123456789,
 *   orgId: 12345,
 *   value: "AGENT",
 *   widgetPublicId: "1212412"
 */
export interface FirebaseRespondedParties extends DocumentData {
  casePublicId: string;
  createdTimestamp: number;
  orgId: number;
  value: 'AGENT' | 'VISITOR';
  widgetPublicId: string;
}

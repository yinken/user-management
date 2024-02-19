export enum SUMMARY_STATUS {
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE',
  PENDING = 'PENDING',
}

export interface Tone {
  orgId: string;
  casePublicId: string;
  createdTimestamp: number;
  sentimentScore?: { value: number };
  summary?: {
    reason?: string;
    summary?: string;
    status?: SUMMARY_STATUS;
    timestamp?: number;
    triggerTimestamp?: number;
    contact?: {
      name: string;
      email: string;
      phone: string;
    };
  };
}

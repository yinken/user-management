export enum EVENT_TYPES {
  VISITOR_PAGE_UPDATE = 'VISITOR_PAGE_UPDATE',
  VISITOR_MESSAGE_RECEIVED = 'VISITOR_MESSAGE_RECEIVED',
  AGENT_MESSAGE_RECEIVED = 'AGENT_MESSAGE_RECEIVED',
  FILE = 'FILE',
  WEATHER_INFO_CAPTURED = 'WEATHER_INFO_CAPTURED',
  CONVERSATION_SENT_INTEGRATION = 'CONVERSATION_SENT_INTEGRATION',
  VISITOR_TYPING = 'VISITOR_TYPING',
  CONVERSATION_STARRED = 'CONVERSATION_STARRED',
  CONVERSATION_TRANSFERRED = 'CONVERSATION_TRANSFERRED',
  RECLAIM_TRANSFER_REQUEST = 'RECLAIM_TRANSFER_REQUEST',
  TRANSFER_REQUEST = 'TRANSFER_REQUEST',
  CONVERSATION_CLOSED_BY_VISITOR = 'CONVERSATION_CLOSED_BY_VISITOR',
  CONVERSATION_CLOSED_BY_AGENT = 'CONVERSATION_CLOSED_BY_AGENT',
  CONVERSATION_CLOSED_BY_SYSTEM = 'CONVERSATION_CLOSED_BY_SYSTEM',
  REQUEST_FILE = 'REQUEST_FILE',
  CALL_ME = 'CALL_ME',
  VISITOR_TRANSCRIPT_REQUEST = 'VISITOR_TRANSCRIPT_REQUEST',
  IGNORE = 'IGNORE',
  RECORD = 'RECORD',
  AUTO_TRANSLATE_ENABLED = 'AUTO_TRANSLATE_ENABLED',
  AUTO_TRANSLATE_DISABLED = 'AUTO_TRANSLATE_DISABLED',
  AUTO_TRANSLATE_LANGUAGE_CHANGED = 'AUTO_TRANSLATE_LANGUAGE_CHANGED',
  BAN_USER = 'BAN_USER',
  REQUEST_SECURE_DATA = 'REQUEST_SECURE_DATA',
  WIDGET_CHANGED = 'WIDGET_CHANGED',
  LABEL_ADDED = 'LABEL_ADDED',
  LABEL_REMOVED = 'LABEL_REMOVED',
  POPULATE_TEXT = 'POPULATE_TEXT',
}

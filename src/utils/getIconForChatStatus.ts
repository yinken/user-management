import { IconName } from '@fortawesome/fontawesome-svg-core';
import { CHAT_STATUS } from 'hubv2/types';

const sourceIcons: Record<CHAT_STATUS, IconName> = {
  [CHAT_STATUS.AGENT_ASSIGNED]: 'messages',
  [CHAT_STATUS.AGENT_CONNECTED]: 'messages',
  [CHAT_STATUS.ALL_AGENTS_BUSY]: 'person-circle-exclamation',
  [CHAT_STATUS.CLOSED]: 'message-xmark',
  [CHAT_STATUS.NO_AGENT_AVAILABLE]: 'person-circle-xmark',
  [CHAT_STATUS.PENDING_CLOSED]: 'tags',
  [CHAT_STATUS.SEARCHING_AGENT]: 'person-circle-question',
  [CHAT_STATUS.UNKNOWN]: 'question',
};

export const getIconForChatStatus = (status: CHAT_STATUS): IconName => {
  return sourceIcons[status];
};

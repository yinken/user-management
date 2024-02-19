import { CHAT_STATUS, Conversation } from 'hubv2/types';
import { determineDuration, getTimeAndTimeUnit } from './time';
import i18next from 'i18next';

export const getConversationDetails = (conversation?: Conversation) => {
  const isActiveConversation =
    conversation?.status.value !== CHAT_STATUS.CLOSED || false;

  const isPendingClosed =
    conversation?.status.value === CHAT_STATUS.PENDING_CLOSED;

  // FIXME: There might be a better way to determine if a conversation is a visitor chat
  const isVisitorChannel = true;

  const isTransferInProgress =
    conversation?.transferDetails?.inTransfer ?? false;

  const isSecureChannel = conversation?.details?.secureChannel ?? false;

  const hasSentiment =
    conversation?.summaryDetails?.reason ||
    conversation?.summaryDetails?.summary ||
    conversation?.sentimentScore;

  const visitorName =
    conversation?.contact?.name ||
    conversation?.contact?.emails[0] ||
    (i18next.t('unknown') as string);

  const destinationUrl = conversation?.details.destinationUrl;

  const d = determineDuration(conversation?.duration, conversation?.startTime);
  const duration = getTimeAndTimeUnit(d);

  return {
    isActiveConversation,
    isPendingClosed,
    isVisitorChannel,
    isSecureChannel,
    isTransferInProgress,
    hasSentiment,
    visitorName,
    duration,
    destinationUrl,
  };
};

export const deduplicateConversations = (
  conversations: Conversation[]
): Conversation[] => {
  return conversations.reduce((acc, conversation) => {
    const existingConversation = acc.find(
      (c) => c.casePublicId === conversation.casePublicId
    );
    if (!existingConversation) {
      acc.push(conversation);
    }
    return acc;
  }, [] as Conversation[]);
};

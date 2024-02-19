import { User } from 'hubv2/types/user';
import { removeWC } from './removeWC';

import {
  Message,
  MESSAGE_SUBTYPE,
  MESSAGE_TYPE,
  SENDER_TYPES,
  SentimentMessage,
  Substitution,
  SystemMessage,
} from 'hubv2/types/messages';
import { SUMMARY_STATUS } from 'hubv2/types/tone';

export function groupMessages(messages: Message[]) {
  return messages.reduce((acc: Message[][], message: Message) => {
    const lastGroup = acc[acc.length - 1];
    if (lastGroup) {
      if (
        lastGroup[0].sender.id === message.sender.id &&
        lastGroup[0].type === message.type
      ) {
        return [...acc.slice(0, -1), lastGroup.concat(message)];
      } else {
        return [...acc, [message]];
      }
    } else {
      return [[message]];
    }
  }, []);
}

export const placeInGroup = (
  message: Message,
  previousMessage?: Message,
  nextMessage?: Message
) => {
  const isFirstMessageInGroup = !previousMessage
    ? true
    : previousMessage?.sender.id !== message.sender.id ||
      previousMessage?.sender.senderType !== message.sender.senderType ||
      previousMessage?.type !== message.type;

  const isLastMessageInGroup = !nextMessage
    ? true
    : message.sender.id !== nextMessage?.sender.id ||
      message.sender.senderType !== nextMessage?.sender.senderType ||
      message.type !== nextMessage?.type;

  return {
    isFirstMessageInGroup,
    isLastMessageInGroup,
  };
};

export const isUserMessage = (message: Message, user?: User) => {
  let isUserMessage = false;
  if (message.sender && message.sender.id) {
    isUserMessage = removeWC(message.sender.id) === user?.email;
  }
  return isUserMessage;
};

export const organizeMessages = (messageArray: Message[]) => {
  const organizedMessages: Record<MESSAGE_TYPE | SENDER_TYPES, Message[]> =
    messageArray.reduce((acc, message) => {
      if (message.type) {
        acc[message.type] = acc[message.type] || [];
        acc[message.type].push(message);
      }
      if (message.sender.senderType) {
        acc[message.sender.senderType] = acc[message.sender.senderType] || [];
        acc[message.sender.senderType].push(message);
      }
      return acc;
    }, {} as Record<string, Message[]>);

  return {
    ...organizedMessages,
  };
};

export const copyMessageToClipboard = (message: Message) => {
  if (message.type !== MESSAGE_TYPE.TEXT) {
    return;
  }
  const textArea = document.createElement('textarea');
  textArea.value = message.text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('Copy');
  textArea.remove();
};

export const createSentimentMessage = (
  conversationId: string,
  sentiment: { score?: number; reason?: string; summary?: string },
  timestamp?: number
) => {
  const date = timestamp
    ? new Date(timestamp + 1).getTime()
    : new Date().getTime();
  const { score, summary, reason } = sentiment;
  return {
    id: 'tone-recent',
    createdTimestamp: date,
    sender: {
      id: '',
      alias: '',
      avatar: '',
      senderType: SENDER_TYPES.SYSTEM,
    },
    casePublicId: conversationId,
    orgId: 'temp',
    tone: {
      orgId: 'temp',
      casePublicId: conversationId,
      createdTimestamp: date,
      sentimentScore: {
        value: score || 0,
      },
      summary: {
        status: SUMMARY_STATUS.AVAILABLE,
        reason: reason,
        summary: summary,
      },
    },
    type: MESSAGE_TYPE.SENTIMENT,
    showSummary: true,
    showSentiment: true,
  } as SentimentMessage;
};

export const createSystemMessage = (
  text: string,
  conversationId: string,
  substitutions?: Record<string, Substitution>,
  timestamp?: number,
  subType?: MESSAGE_SUBTYPE
) => {
  const date = timestamp
    ? new Date(timestamp + 2).getTime()
    : new Date().getTime();
  return {
    id: 'integration',
    createdTimestamp: date,
    subType: subType,
    text,
    substitutions: substitutions,
    sender: {
      id: '',
      alias: '',
      avatar: '',
      senderType: SENDER_TYPES.SYSTEM,
    },
    casePublicId: conversationId,
    orgId: 'temp',

    type: MESSAGE_TYPE.SYSTEM,
  } as SystemMessage;
};

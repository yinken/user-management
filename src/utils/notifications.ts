export const enum SOUNDS_ENUM {
  silent = 'silent',
  warning = 'warning',
  newChatSound = 'newChatSound',
  newChatReturnVisitorSound = 'newChatReturnVisitorSound',
  messageReceivedSound = 'messageReceivedSound',
  systemMessageReceivedSound = 'systemMessageReceivedSound',
  messageSentSound = 'messageSentSound',
  internalChatNewSound = 'internalChatNewSound',
  internalChatMessageSentSound = 'internalChatMessageSentSound',
  internalChatMessageReceivedSound = 'internalChatMessageReceivedSound',
  internalChatMentionSound = 'internalChatMentionSound',
  autoPauseSound = 'autoPauseSound',
  empty = '',
}

export const enum DESKTOP_NOTIFICATIONS_ENUM {
  chatDesktopNotification = 'chatDesktopNotification',
  internalChatDesktopNotification = 'internalChatDesktopNotification',
  internalChatMentionDesktopNotification = 'internalChatMentionDesktopNotification',
  internalChatMessageDesktopNotification = 'internalChatMessageDesktopNotification',
  messageDesktopNotification = 'messageDesktopNotification',
  systemMessageDesktopNotification = 'systemMessageDesktopNotification',
  autoPauseDesktopNotification = 'autoPauseDesktopNotification',
  showAlways = 'SHOW_ALWAYS',
}

export default {
  SILENT: {
    key: 'SILENT',
    priority: 4,
    sound: SOUNDS_ENUM.silent,
  },
  WARNING: {
    key: 'WARNING',
    priority: 4,
    sound: SOUNDS_ENUM.warning,
  },
  CHAT_NEW_VISITOR: {
    key: 'CHAT_NEW_VISITOR',
    priority: 1,
    sound: SOUNDS_ENUM.newChatSound,
    desktop: DESKTOP_NOTIFICATIONS_ENUM.chatDesktopNotification,
  },
  CHAT_NEW_REPEAT_UNTIL_ANSWERED: {
    key: 'CHAT_NEW_REPEAT_UNTIL_ANSWERED',
    priority: 4,
    sound: SOUNDS_ENUM.newChatSound,
    desktop: DESKTOP_NOTIFICATIONS_ENUM.chatDesktopNotification,
  },
  CHAT_RETURNING_VISITOR: {
    key: 'CHAT_RETURNING_VISITOR',
    priority: 1,
    sound: SOUNDS_ENUM.newChatReturnVisitorSound,
    desktop: DESKTOP_NOTIFICATIONS_ENUM.chatDesktopNotification,
  },
  CHAT_MESSAGE_RECEIVED: {
    key: 'CHAT_MESSAGE',
    priority: 2,
    sound: SOUNDS_ENUM.messageReceivedSound,
    desktop: DESKTOP_NOTIFICATIONS_ENUM.messageDesktopNotification,
  },
  SYSTEM_MESSAGE: {
    key: 'SYSTEM_MESSAGE',
    priority: 4,
    sound: SOUNDS_ENUM.systemMessageReceivedSound,
    desktop: DESKTOP_NOTIFICATIONS_ENUM.systemMessageDesktopNotification,
  },
  CHAT_MESSAGE_SENT: {
    key: 'CHAT_MESSAGE_SENT',
    priority: 4,
    sound: SOUNDS_ENUM.messageSentSound,
  },
  NEW_TEAM_CHAT: {
    key: 'NEW_TEAM_CHAT',
    priority: 4,
    sound: SOUNDS_ENUM.internalChatNewSound,
    desktop: DESKTOP_NOTIFICATIONS_ENUM.internalChatDesktopNotification,
  },
  TEAM_CHAT_MESSAGE_SENT: {
    key: 'TEAM_CHAT_MESSAGE_SENT',
    priority: 4,
    sound: SOUNDS_ENUM.internalChatMessageSentSound,
  },
  TEAM_CHAT_MESSAGE_RECIEVED: {
    key: 'TEAM_CHAT_MESSAGE_RECIEVED',
    priority: 4,
    sound: SOUNDS_ENUM.internalChatMessageReceivedSound,
    desktop: DESKTOP_NOTIFICATIONS_ENUM.internalChatMessageDesktopNotification,
  },
  NEW_IC: { key: 'NEW_IC', priority: 4, sound: '' },
  IC_MSG_RECEIVED: {
    key: 'IC_MSG_RECEIVED',
    priority: 4,
    sound: '',
  },
  IC_MSG_SENT: { key: 'IC_MSG_SENT', priority: 4, sound: '' },
  IC_MENTION: {
    key: 'IC_MENTION',
    priority: 3,
    sound: SOUNDS_ENUM.internalChatMentionSound,
    desktop: DESKTOP_NOTIFICATIONS_ENUM.internalChatMentionDesktopNotification,
  },
  PAUSE: {
    key: 'PAUSE',
    priority: 0,
    sound: SOUNDS_ENUM.autoPauseSound,
    desktop: DESKTOP_NOTIFICATIONS_ENUM.autoPauseDesktopNotification,
  },
  CONN_GOOD: { key: 'CONN_GOOD', priority: 4, sound: '' },
  CONN_POOR: { key: 'CONN_POOR', priority: 4, sound: '' },
  CONN_BROKEN: {
    key: 'CONN_BROKEN',
    priority: 4,
    sound: '',
    desktop: DESKTOP_NOTIFICATIONS_ENUM.showAlways,
  },
};

export const Alerts = {
  ALL_ENABLED: {
    key: 'ALL_ENABLED',
    text: 'All Alerts Enabled',
    icon: 'icn-alerts-all',
  },
  NEWCHAT_AND_MENTIONS: {
    key: 'NEWCHAT_AND_MENTIONS',
    text: 'Only New Chat and @ Mentions',
    icon: 'icn-alerts-mention',
  },
  ALL_DISABLED: {
    key: 'ALL_DISABLED',
    text: 'All Alerts Disabled',
    icon: 'icn-alerts-none',
  },
};

export function ifKeyExist<T>(contact: T, propertyName: keyof T): boolean {
  if (!contact) {
    return false;
  }

  const value = contact[propertyName] as unknown as string;
  return value !== null && value !== '';
}

import { BACKGROUND_IMAGES } from 'hubv2/types/user-preferences';

export enum STORAGE_ITEMS {
  CHAT_PANEL_WIDTH = 'CHAT_PANEL_WIDTH',
  CONTACT_PANEL_WIDTH = 'CONTACT_PANEL_WIDTH',
  RECENT_CHAT_PANEL_HEIGHT = 'RECENT_CHAT_PANEL_HEIGHT',
  LIVE_CHAT_PANEL_HEIGHT = 'LIVE_CHAT_PANEL_HEIGHT',
  TRANSCRIPT_BACKGROUND = 'TRANSCRIPT_BACKGROUND',
  READ_MESSAGES = 'READ_MESSAGES',
}

export const Storage = {
  get: (key: STORAGE_ITEMS) => {
    switch (key) {
      case STORAGE_ITEMS.CHAT_PANEL_WIDTH:
      case STORAGE_ITEMS.CONTACT_PANEL_WIDTH: {
        const widthString = localStorage.getItem(key);
        if (widthString) {
          const width = parseInt(widthString);
          return width;
        } else {
          return 400;
        }
      }
      case STORAGE_ITEMS.RECENT_CHAT_PANEL_HEIGHT:
      case STORAGE_ITEMS.LIVE_CHAT_PANEL_HEIGHT: {
        const heightString = localStorage.getItem(key);
        if (heightString) {
          const height = parseInt(heightString);
          return height;
        } else {
          return 300;
        }
      }

      case STORAGE_ITEMS.TRANSCRIPT_BACKGROUND: {
        const backgroundString = localStorage.getItem(key);
        if (backgroundString) {
          const background = JSON.parse(backgroundString);
          return background;
        } else {
          return BACKGROUND_IMAGES.NONE;
        }
      }

      default:
        throw new Error(`Invalid storage item ${key}`);
    }
  },
  set: (key: STORAGE_ITEMS, value: string | number) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  delete: (key: STORAGE_ITEMS) => {
    localStorage.removeItem(key);
  },
  setDraftMessage: (casePublicId: string, message: string) => {
    localStorage.setItem(
      `DRAFT_MESSAGE_${casePublicId}`,
      JSON.stringify(message)
    );
  },
  getDraftMessage: (casePublicId: string) => {
    const draftMessage = localStorage.getItem(`DRAFT_MESSAGE_${casePublicId}`);
    if (draftMessage) {
      return JSON.parse(draftMessage);
    } else {
      return '';
    }
  },
  getAllDraftMessages: () => {
    const draftMessages: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('DRAFT_MESSAGE_')) {
        const conversationId = key.replace('DRAFT_MESSAGE_', '');
        const draftMessage = localStorage.getItem(key);
        if (draftMessage) {
          draftMessages[conversationId] = JSON.parse(draftMessage);
        }
      }
    }
    return draftMessages;
  },
  deleteDraftMessage: (casePublicId: string) => {
    localStorage.removeItem(`DRAFT_MESSAGE_${casePublicId}`);
  },
  addReadMessageIds: (casePublicId: string, messageId: string) => {
    const readMessages = localStorage.getItem(`READ_MESSAGES_${casePublicId}`);
    if (readMessages) {
      const readMessagesArray = JSON.parse(readMessages);
      if (readMessagesArray.includes(messageId)) {
        return;
      }
      const newReadMessages = [...readMessagesArray, messageId];
      localStorage.setItem(
        `READ_MESSAGES_${casePublicId}`,
        JSON.stringify(newReadMessages)
      );
    } else {
      localStorage.setItem(
        `READ_MESSAGES_${casePublicId}`,
        JSON.stringify([messageId])
      );
    }
  },
  getReadMessageIds: (casePublicId: string): string[] => {
    const readMessages = localStorage.getItem(`READ_MESSAGES_${casePublicId}`);
    if (readMessages) {
      return JSON.parse(readMessages);
    } else {
      return [];
    }
  },
  deleteReadMessageIds: (casePublicId: string) => {
    localStorage.removeItem(`READ_MESSAGES_${casePublicId}`);
  },
};

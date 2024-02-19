import { IconName } from '@fortawesome/fontawesome-svg-core';
import { MESSAGE_SUBTYPE } from 'hubv2/types/messages';

export const getIconForSystemMessage = (messageSubType: MESSAGE_SUBTYPE) => {
  let icon;
  switch (messageSubType) {
    case MESSAGE_SUBTYPE.AUTO_TRANSLATE_LANGUAGE_CHANGED:
    case MESSAGE_SUBTYPE.AUTO_TRANSLATE_ENABLED: {
      icon = 'language';
      break;
    }
    case MESSAGE_SUBTYPE.AUTO_TRANSLATE_DISABLED: {
      icon = 'language';
      break;
    }
    case MESSAGE_SUBTYPE.NAME_CAPTURED: {
      icon = 'user';
      break;
    }
    case MESSAGE_SUBTYPE.EMAIL_CAPTURED: {
      icon = 'envelope';
      break;
    }
    case MESSAGE_SUBTYPE.PHONE_CAPTURED: {
      icon = 'phone';
      break;
    }
    case MESSAGE_SUBTYPE.FILE_REQUESTED: {
      icon = 'file';
      break;
    }
    case MESSAGE_SUBTYPE.VISITOR_PAGE_RELOADED: {
      icon = 'sync';
      break;
    }
    case MESSAGE_SUBTYPE.SECURE_DATA_REQUESTED: {
      icon = 'lock';
      break;
    }
    case MESSAGE_SUBTYPE.USER_BANNED: {
      icon = 'ban';
      break;
    }
    case MESSAGE_SUBTYPE.CONVERSATION_CLOSED_BY_AGENT:
    case MESSAGE_SUBTYPE.CONVERSATION_CLOSED_BY_VISITOR:
    case MESSAGE_SUBTYPE.CONVERSATION_CLOSED_BY_SYSTEM: {
      icon = 'person-from-portal';
      break;
    }

    case MESSAGE_SUBTYPE.CALL_ME_REQUESTED: {
      icon = 'phone-arrow-down-left';
      break;
    }

    case MESSAGE_SUBTYPE.CONVERSATION_TRANSFER:
    case MESSAGE_SUBTYPE.RECLAIM_TRANSFER_REQUEST: {
      icon = 'arrow-right-arrow-left';
      break;
    }

    case MESSAGE_SUBTYPE.SCREEN_SHARING_REQUEST: {
      icon = 'bolt-lightning';
      break;
    }

    case MESSAGE_SUBTYPE.WIDGET_CHANGED: {
      icon = 'right-left-large';
      break;
    }

    default: {
      icon = 'sparkles';
    }
  }
  return icon as IconName;
};

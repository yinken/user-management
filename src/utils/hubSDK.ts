import { HubSDKSendEvent, HUBSDK_SEND_EVENT } from 'hubv2/types/hubSDK';
import {
  Message,
  MESSAGE_SUBTYPE,
  MESSAGE_TYPE,
  SENDER_TYPES,
} from 'hubv2/types/messages';
import { removeWC } from 'hubv2/utils/removeWC';

export const convertMessageToHubSDKEvent = (
  message: Message
): HubSDKSendEvent | undefined => {
  const { sender, casePublicId, createdTimestamp } = message;

  let data;
  let type;

  if (message.type === MESSAGE_TYPE.WEATHER_INFO) {
    type = HUBSDK_SEND_EVENT.WEATHER_INFO_CAPTURED;
    data = {
      temperature_celsius: message.tempC,
      temperature_fahrenheit: message.tempF,
      description: message.conditions,
    };
  } else if (message.type === MESSAGE_TYPE.TEXT) {
    if (sender.senderType === SENDER_TYPES.AGENT) {
      type = HUBSDK_SEND_EVENT.AGENT_MESSAGE_RECEIVED;
    } else if (sender.senderType === SENDER_TYPES.VISITOR) {
      type = HUBSDK_SEND_EVENT.VISITOR_MESSAGE_RECEIVED;
    }
    data = {
      type: 'Text',
      text: message.text,
    };
  } else if (message.type === MESSAGE_TYPE.FILE_UPLOAD) {
    type = HUBSDK_SEND_EVENT.SEND_FILE;
    data = {
      type: 'File',
      mimeType: message.mimeType,
      fileName: message.fileName,
      url: message.url,
    };
  } else if (message.type === MESSAGE_TYPE.SYSTEM) {
    data = message.data;
    switch (message.subType) {
      case MESSAGE_SUBTYPE.EMAIL_CAPTURED:
        type = HUBSDK_SEND_EVENT.EMAIL_CAPTURED;
        break;
      case MESSAGE_SUBTYPE.NAME_CAPTURED:
        type = HUBSDK_SEND_EVENT.NAME_CAPTURED;
        break;
      case MESSAGE_SUBTYPE.PHONE_CAPTURED:
        type = HUBSDK_SEND_EVENT.PHONE_CAPTURED;
        break;
      case MESSAGE_SUBTYPE.VISITOR_PAGE_RELOADED:
        type = HUBSDK_SEND_EVENT.VISITOR_PAGE_UPDATE;
        break;
      case MESSAGE_SUBTYPE.CONVERSATION_CLOSED_BY_SYSTEM:
        type = HUBSDK_SEND_EVENT.CONVERSATION_CLOSED_BY_SYSTEM;
        break;
      case MESSAGE_SUBTYPE.CONVERSATION_CLOSED_BY_AGENT:
        type = HUBSDK_SEND_EVENT.CONVERSATION_CLOSED_BY_AGENT;
        break;
      case MESSAGE_SUBTYPE.CONVERSATION_CLOSED_BY_VISITOR:
        type = HUBSDK_SEND_EVENT.CONVERSATION_CLOSED_BY_VISITOR;
        break;
      case MESSAGE_SUBTYPE.RECLAIM_TRANSFER_REQUEST:
        type = HUBSDK_SEND_EVENT.RECLAIM_TRANSFER_REQUEST;
        break;
      case MESSAGE_SUBTYPE.CONVERSATION_TRANSFER:
        type = HUBSDK_SEND_EVENT.CONVERSATION_TRANSFERRED;
        break;
      case MESSAGE_SUBTYPE.FILE_REQUESTED:
        type = HUBSDK_SEND_EVENT.REQUEST_FILE;
        break;
      case MESSAGE_SUBTYPE.SECURE_DATA_REQUESTED:
        type = HUBSDK_SEND_EVENT.REQUEST_SECURE_DATA;
        break;
      case MESSAGE_SUBTYPE.USER_BANNED:
        type = HUBSDK_SEND_EVENT.BAN_USER;
        break;
      case MESSAGE_SUBTYPE.CALL_ME_REQUESTED:
        type = HUBSDK_SEND_EVENT.CALL_ME;
        break;
      case MESSAGE_SUBTYPE.TRANSCRIPT_REQUESTED:
        type = HUBSDK_SEND_EVENT.VISITOR_TRANSCRIPT_REQUEST;
        break;
      case MESSAGE_SUBTYPE.WIDGET_CHANGED:
        type = HUBSDK_SEND_EVENT.WIDGET_CHANGED;
        break;
      case MESSAGE_SUBTYPE.CONVERSATION_IGNORED:
        type = HUBSDK_SEND_EVENT.IGNORE;
        break;
      case MESSAGE_SUBTYPE.CONVERSATION_RECORDED:
        type = HUBSDK_SEND_EVENT.RECORD;
        break;
      case MESSAGE_SUBTYPE.AUTO_TRANSLATE_ENABLED:
        type = HUBSDK_SEND_EVENT.AUTO_TRANSLATE_ENABLED;
        break;
      case MESSAGE_SUBTYPE.AUTO_TRANSLATE_DISABLED:
        type = HUBSDK_SEND_EVENT.AUTO_TRANSLATE_DISABLED;
        break;
      case MESSAGE_SUBTYPE.AUTO_TRANSLATE_LANGUAGE_CHANGED:
        type = HUBSDK_SEND_EVENT.AUTO_TRANSLATE_LANGUAGE_CHANGED;
        break;
      default:
        console.log('Unknown message subtype', message.subType);
    }
  }

  if (type === undefined || data === undefined) {
    return;
  }

  if (sender.id) {
    sender.id = removeWC(sender.id);
  }
  const timestamp = createdTimestamp;
  return {
    sender,
    conversationId: casePublicId,
    data,
    type,
    timestamp,
  };
};

import {
  BanUserData,
  BaseHubSDKReceiveEvent,
  HubSDKReceiveEvent,
  HUBSDK_RECEIVE_EVENT,
  SecureData,
  TextData,
  TransferData,
} from 'hubv2/types/hubSDK';

export function convertHubSDKEventToMessage(
  hubSDKEvent: BaseHubSDKReceiveEvent
) {
  const messageData = hubSDKEvent;
  const eventType = messageData.type;
  switch (eventType) {
    case HUBSDK_RECEIVE_EVENT.BAN_USER: {
      const d = messageData as HubSDKReceiveEvent<BanUserData>;
      if (typeof d.data.type !== 'undefined') {
        const banType = d.data.type === 'cookie' ? '\\ban' : '\\banip';
        return banType;
      }
      break;
    }
    case HUBSDK_RECEIVE_EVENT.RECLAIM_TRANSFER_REQUEST: {
      return '\\backtransfer';
    }
    case HUBSDK_RECEIVE_EVENT.TRANSFER_REQUEST: {
      const d = messageData as HubSDKReceiveEvent<TransferData>;
      if (typeof d.data.type !== 'undefined') {
        if (d.data.type === 'widget') {
          return '\\grouptransfer ' + d.data.widgetId;
        } else if (d.data.type === 'agent') {
          return '\\transfer ' + d.data.agentEmail;
        }
      }
      break;
    }
    case HUBSDK_RECEIVE_EVENT.AGENT_MESSAGE_RECEIVED: {
      const d = messageData as HubSDKReceiveEvent<TextData>;
      if (typeof d.data.message !== 'undefined') {
        return d.data.message;
      }
      break;
    }
    case HUBSDK_RECEIVE_EVENT.CONVERSATION_CLOSED_BY_AGENT: {
      return '\\bye';
    }
    case HUBSDK_RECEIVE_EVENT.REQUEST_FILE: {
      return '\\FURV';
    }
    case HUBSDK_RECEIVE_EVENT.REQUEST_SECURE_DATA: {
      const d = messageData as HubSDKReceiveEvent<SecureData>;
      if (typeof d.data.secureDataType !== 'undefined') {
        if (d.data.secureDataType === 'SSN') {
          return '\\SDR_SSN';
        } else if (d.data.secureDataType === 'Credit Card') {
          return '\\SDR_CCZ';
        } else if (d.data.secureDataType === 'Secure Note') {
          return '\\SDR_SN';
        }
      }
      break;
    }

    default: {
      return;
    }
  }
}

// we will pick this up later
// case HUBSDK_RECEIVE_EVENT.POPULATE_TEXT: {
//   const d = messageData as HubSDKReceiveEvent<PopulateTextData>;
//   if (typeof d.data.message !== 'undefined') {
//     // TODO: This will probably need reworking...
//     const messageComposer = document.getElementById(
//       'message-composer'
//     ) as HTMLInputElement;
//     if (messageComposer) {
//       messageComposer.value = d.data.message;
//     }
//   }
//   break;
// }

// case HUBSDK_RECEIVE_EVENT.LABEL_ADDED:
// case HUBSDK_RECEIVE_EVENT.LABEL_REMOVED: {
//   const d = messageData as HubSDKReceiveEvent<LabelData>;
//   const messageLabelData = d.data;
//   if (!labels) {
//     break;
//   }
//   const index = labels.findIndex(
//     (label) => label.name === messageLabelData.labelName
//   );
//   if (index !== -1) {
//     if (
//       Boolean(messageLabelData.freeForm) === true &&
//       labels[index].freeForm === true
//     ) {
//       eventType === HUBSDK_RECEIVE_EVENT.LABEL_ADDED
//         ? labels[index].freeFormValues.push(messageLabelData.value)
//         : labels[index].freeFormValues.splice(
//             labels[index].freeFormValues.indexOf(messageLabelData.value),
//             1
//           );
//       postOperatorLabel(labels, messageData.conversationId);
//     } else if (
//       Boolean(messageLabelData.freeForm) === false &&
//       messageLabelData.value in labels[index].options
//     ) {
//       labels[index].options[messageLabelData.value] =
//         eventType === HUBSDK_RECEIVE_EVENT.LABEL_ADDED ? true : false;
//       postOperatorLabel(labels, messageData.conversationId);
//     }
//   }
//   break;
// }

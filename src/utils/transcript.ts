import {
  Message,
  MESSAGE_TYPE,
  SENDER_TYPES,
  TextMessage,
} from 'hubv2/types/messages';
import moment from 'moment';

type ClipboardData = {
  widgetName: string;
  email: string;
  name: string;
  date: number;
  transcripts: ClipboardMessage[];
};

type ClipboardMessage = {
  text: string;
  timestamp: number;
  alias: string;
  id: string;
};

export const copyChatToClipboard = (params: {
  widgetName: string;
  email: string;
  timestamp: number;
  transcript?: Message[];
  visitorName: string;
}) => {
  const { widgetName, email, timestamp, transcript, visitorName } = params;
  const name = visitorName;

  if (!transcript || transcript.length === 0) {
    return;
  }

  const dataToBeSent = {
    widgetName,
    email,
    name,
    date: timestamp,
    transcripts: transcript.map((message) => {
      return {
        text: (message as TextMessage).text,
        timestamp: message.createdTimestamp,
        alias: message.sender.senderType,
        id: message.id,
      };
    }),
  };

  copyToClipboard(dataToBeSent);
};

export const downloadChatAsTextFile = (
  params: {
    widgetName: string;
    email: string;
    timestamp: number;
    transcript?: Message[];
    visitorName: string;
  },
  filename: string
) => {
  const { widgetName, email, timestamp, transcript, visitorName } = params;
  const name = visitorName;

  if (!transcript || transcript.length === 0) {
    return;
  }

  const dataToBeSent = {
    widgetName,
    email,
    name,
    date: timestamp,
    transcripts: transcript.map((message) => {
      return {
        text: (message as TextMessage).text,
        timestamp: message.createdTimestamp,
        alias: message.sender.senderType,
        id: message.id,
      };
    }),
  };

  downloadAsTextFile(dataToBeSent, filename);
};

const downloadAsTextFile = (data: ClipboardData, filename: string) => {
  const textHeader = `Widget Name: ${data.widgetName}
  Date: ${moment(data.date).format('YYYY-MM-DD HH:mm:ss')}
  Email: ${data.email}
  Name: ${data.name}`;
  const formattedString = data.transcripts.reduce(
    reduceArrayIntoFormattedString,
    textHeader
  );
  const element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(formattedString)
  );
  element.setAttribute('download', `${filename}.txt`);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

const copyToClipboard = (data: ClipboardData) => {
  const dummyTextarea = document.createElement('textarea');
  const textHeader = `Widget Name: ${data.widgetName}
  Date: ${moment(data.date).format('YYYY-MM-DD HH:mm:ss')}
  Email: ${data.email}
  Name: ${data.name}`;
  const formattedString = data.transcripts.reduce(
    reduceArrayIntoFormattedString,
    textHeader
  );
  dummyTextarea.value = formattedString;
  document.body.appendChild(dummyTextarea);
  dummyTextarea.select();
  document.execCommand('copy');
  document.body.removeChild(dummyTextarea);
};

const reduceArrayIntoFormattedString = (
  generatedString: string,
  currentMessage: ClipboardMessage
) => {
  const formatedTimestamp = moment
    .unix(currentMessage.timestamp / 1000)
    .toDate();
  const msgTime = moment(formatedTimestamp).format('HH:mm:ss');
  return `${generatedString}
     ${msgTime} - ${currentMessage.alias}: ${currentMessage.text};`;
};

export const organizeTranscript = (transcript: Message[]) => {
  const transcriptByTimestamp = transcript?.sort(
    (a, b) => a.createdTimestamp - b.createdTimestamp
  );
  const organizedTranscript: Message[] = [];
  transcriptByTimestamp?.forEach((message, index) => {
    const currentMessage = message;
    const nextMessage = transcriptByTimestamp[index + 1];

    // add custom DATE_CHANGE message to show date changes in transcript
    const currentMessageDate = new Date(
      currentMessage.createdTimestamp
    ).setHours(0, 0, 0, 0);
    const nextMessageDate = nextMessage
      ? new Date(nextMessage.createdTimestamp).setHours(0, 0, 0, 0)
      : currentMessageDate;

    const date = nextMessageDate ? nextMessageDate : currentMessageDate;
    const dateMessage = {
      id: index.toString(),
      createdTimestamp: date,
      type: MESSAGE_TYPE.DATE_CHANGE as MESSAGE_TYPE.DATE_CHANGE,
      sender: {
        id: '',
        alias: '',
        avatar: '',
        senderType: SENDER_TYPES.SYSTEM,
      },
      casePublicId: currentMessage.casePublicId,
      orgId: currentMessage.orgId,
      text: date.toString(),
    };

    if (index === 0) {
      organizedTranscript.push(dateMessage, currentMessage);
      return organizedTranscript;
    } else if (currentMessageDate !== nextMessageDate) {
      organizedTranscript.push(currentMessage, dateMessage);
    } else {
      organizedTranscript.push(currentMessage);
    }
  });
  return organizedTranscript;
};

export const serializeTranscriptText = (transcript?: Message[]) => {
  return transcript
    ?.map((message) => {
      if (
        message?.sender.senderType === SENDER_TYPES.SYSTEM ||
        (message.type !== MESSAGE_TYPE.TEXT &&
          message.type !== MESSAGE_TYPE.ASSISTANT)
      ) {
        return;
      }
      if (message?.sender.senderType === SENDER_TYPES.AGENT) {
        return `${message?.sender.alias}: '${message.text}'\n`;
      }
      if (message?.sender.senderType === SENDER_TYPES.VISITOR) {
        return `Visitor: '${message.text}'\n`;
      }
      if (message?.sender.senderType === SENDER_TYPES.ASSISTANT) {
        return `AI Assistant: '${message.text}'\n`;
      }
    })
    .join(' ');
};

export const simplifyTranscript = (transcript?: Message[]) => {
  return transcript?.map((message) => {
    if (
      message?.sender.senderType === SENDER_TYPES.SYSTEM ||
      (message.type !== MESSAGE_TYPE.TEXT &&
        message.type !== MESSAGE_TYPE.ASSISTANT)
    ) {
      return;
    }
    if (message?.sender.senderType === SENDER_TYPES.AGENT) {
      return `${message?.sender.alias}: ${message.text}`;
    }
    if (message?.sender.senderType === SENDER_TYPES.VISITOR) {
      return `Visitor: ${message.text}`;
    }
    if (message?.sender.senderType === SENDER_TYPES.ASSISTANT) {
      return `AI Assistant: ${message.text}`;
    }
  });
};

const JSON_MESSAGE_AS_STRING = '/SYS MSG2 ';

export const formatDesktopNotificationMessage = (message?: string) => {
  if (!message) {
    return '';
  }
  const isSystemMessage = message.startsWith(JSON_MESSAGE_AS_STRING);
  if (!isSystemMessage) {
    return message;
  }

  const messageObj = JSON.parse(
    message.substring(JSON_MESSAGE_AS_STRING.length)
  );

  if (messageObj?.type === 'scale') {
    // A scale type message has the following format:
    // /SYS MSG2 {"type":"scale","format":"STARS","scaleStart":1,"scaleEnd":5,"userInput":"1","isValid":true}
    try {
      const { userInput, scaleEnd } = messageObj;
      return `Rating: ${userInput} out of ${scaleEnd}.`;
    } catch (e) {
      console.error(e);
      return message;
    }
  } else {
    return message;
  }
};

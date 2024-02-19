import { MESSAGE_MODE } from 'hubv2/types/messages';
import i18n from '../../i18n';

export const getPlaceholder = (messageMode: MESSAGE_MODE) => {
  let placeholder = '';
  if (messageMode === MESSAGE_MODE.VISITOR) {
    placeholder = i18n.t('Send a message to your visitor');
  }
  if (messageMode === MESSAGE_MODE.AGENT_WHISPER) {
    placeholder = i18n.t('Send a whisper message to your supervisor');
  }
  if (messageMode === MESSAGE_MODE.SUPERVISOR_WHISPER) {
    placeholder = i18n.t('Send a whisper message to your agent');
  }
  if (messageMode === MESSAGE_MODE.INTERNAL) {
    placeholder = i18n.t('Send an internal message');
  }
  return placeholder;
};

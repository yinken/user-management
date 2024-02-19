import { CHANNEL_TYPES, CHAT_STATUS, USER_STATUS_TYPES } from "@/types";
import i18n from "../i18n";

type SingularPluralParams = {
  count: number;
  singular: string;
  plural: string;
};

export const determineSingularOrPlural = (params: SingularPluralParams) => {
  const { count, singular, plural } = params;
  return count === 1 ? singular : plural;
};

export const translationMap = {
  entryUrl: i18n.t("Entry URL"),
  extraVariables: i18n.t("Extra Variables"),
  history: i18n.t("History"),
  geoData: i18n.t("Geo Data"),
  hmacVerificationResult: i18n.t("HMAC Verification Result"),
  ipAddress: i18n.t("IP Address"),
  language: i18n.t("Language"),
  languageMap: i18n.t("Language Map"),
  pageUrl: i18n.t("Page URL"),
  visitorPhoneNumber: i18n.t("Phone Number"),
  referrer: i18n.t("Referrer"),
  variablesJS: i18n.t("JS Variables"),
  visitorPlatform: i18n.t("Platform"),
  pageTitle: i18n.t("Page Title"),
  destinationUrl: i18n.t("Destination URL"),
  chatChannel: i18n.t("Channel"),
  secureChannel: i18n.t("Secure Channel"),
  autoTranslateOptions: i18n.t("Auto-Translation Options"),
  age: i18n.t("Age"),
  avatars: i18n.t("Avatars"),
  emails: i18n.t("Emails"),
  id: i18n.t("ID"),
  name: i18n.t("Name"),
  nameProfileLink: i18n.t("Integration"),
  notes: i18n.t("Notes"),
  otherIds: i18n.t("Other IDs"),
  others: i18n.t("Others"),
  phones: i18n.t("Phones"),
  socialProfileLinks: i18n.t("Social Profile Links"),
  source: i18n.t("Source"),
  widgetId: i18n.t("Widget ID"),
  decodedSearchData: i18n.t("Decoded Search Data"),
  labels: i18n.t("Labels"),
  city: i18n.t("City"),
  countryName: i18n.t("Country"),
  latitude: i18n.t("Latitude"),
  longitude: i18n.t("Longitude"),
  regionCode: i18n.t("Region"),
  organization: i18n.t("Organization"),
  countryCode: i18n.t("Country Code"),
  timezone: i18n.t("Timezone"),
  isp: i18n.t("ISP"),
  sentiment: i18n.t("Sentiment"),
  sentimentScore: i18n.t("Sentiment"),
  summary: i18n.t("Summary"),
  reason: i18n.t("Reason"),
  tone: i18n.t("Tone"),
  title: i18n.t("Title"),
  min: i18n.t("Min"),
  max: i18n.t("Max"),
  avg: i18n.t("Avg"),
  median: i18n.t("Median"),
  count: i18n.t("Count"),
  range: i18n.t("Range"),
  variance: i18n.t("Variance"),
  modes: i18n.t("Modes"),
  sum: i18n.t("Sum"),
  companyName: i18n.t("Company Name"),

  AGENT: i18n.t("Agent"),
  VISITOR: i18n.t("Visitor"),
  SYSTEM: i18n.t("System"),
  TEXT: i18n.t("Text"),
  FILE_UPLOAD: i18n.t("File"),
  SECURE: i18n.t("Secure"),
  SCALE: i18n.t("Scale"),
  WHISPER: i18n.t("Whisper"),
  EVENT: i18n.t("Event"),
  WEATHER_INFO: i18n.t("Weather Info"),
  ENCRYPTED_DATA: i18n.t("Encrypted"),
  SENTIMENT: i18n.t("Sentiment"),
  DATE_CHANGE: i18n.t("Date Change"),
  COMMENT: i18n.t("Comment"),
};

export const getTranslationFromMap = (key: string) => {
  const k = key as keyof typeof translationMap;
  const translation = translationMap[k] as string;
  return translation || key;
};

export const mapChannelTypeToName = (channelType?: CHANNEL_TYPES) => {
  if (!channelType) {
    return "";
  }
  const map = {
    [CHANNEL_TYPES.GOOGLE]: "Google Business Messages",
    [CHANNEL_TYPES.FACEBOOK]: "Facebook Messenger",
    [CHANNEL_TYPES.WHATSAPP]: "WhatsApp for Business",
    [CHANNEL_TYPES.SMS]: i18n.t("SMS"),
    [CHANNEL_TYPES.POLL]: i18n.t("Web Client"),
  };
  return map[channelType] || channelType;
};

export const mapChatStatusToName = (status?: CHAT_STATUS) => {
  if (!status) {
    return i18n.t("Unknown");
  }
  const map = {
    [CHAT_STATUS.AGENT_ASSIGNED]: i18n.t("Agent Assigned"),
    [CHAT_STATUS.AGENT_CONNECTED]: i18n.t("Agent Connected"),
    [CHAT_STATUS.ALL_AGENTS_BUSY]: i18n.t("All Agengs Busy"),
    [CHAT_STATUS.CLOSED]: i18n.t("Closed"),
    [CHAT_STATUS.NO_AGENT_AVAILABLE]: i18n.t("No Agent Available"),
    [CHAT_STATUS.PENDING_CLOSED]: i18n.t("Requires Labels"),
    [CHAT_STATUS.SEARCHING_AGENT]: i18n.t("Searching Agent"),
    [CHAT_STATUS.UNKNOWN]: i18n.t("Unknown"),
  };
  return map[status] || status;
};

export const mapUserStatusToName = (status?: USER_STATUS_TYPES) => {
  if (!status) {
    return i18n.t("Unknown");
  }
  const map = {
    [USER_STATUS_TYPES.ONLINE]: i18n.t("Online"),
    [USER_STATUS_TYPES.PAUSE]: i18n.t("Paused"),
    [USER_STATUS_TYPES.OFFLINE]: i18n.t("Offline"),
  };
  return map[status] || status;
};

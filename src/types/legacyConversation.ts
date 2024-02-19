import { CHANNEL_TYPES } from './conversation';

export type LegacyConversation = {
  type: 'chat';
  timestamp: number;
  visitorNumber: -1;
  widgetPublicId: string;
  widgetName: 'Widget with Labels';
  agentTransferRestricted: false;
  knowledgebaseAvailable: true;
  visitorTypingMessageEnabled: true;
  visitorFileExchangeEnabled: true;
  visitorFileExchangeSettings: '{"visitorChatEnabled":true,"visitorFileUploadEnabled":true,"agentFileUploadEnabled":true,"fileTypeRestrictionEnabled":true,"fileTypes":[],"fileTypeRestriction":"executable","allowVisitorInitiatedFileUpload":true}';
  secureDataExchangeEnabled: true;
  secureDataExchangeSettings: '{"cc":false, "ccWithZip":true, "ssn":true, "secureNote":true}';
  cobrowsingEnabled: false;
  secureChannel: true;
  secureAccount: false;
  createdDate: 1669996429967;
  casePublicId: '721fa521-09c5-45e9-84df-37f92697d74b';
  status: 5;
  orgId: 4800652593201152;
  agentId: 'martin.senne@snapengage.com';
  agentAlias: 'Martin Senne Supervisor';
  agentAvatar: '';
  pageTitle: 'CodePen Demo';
  descriptionText: 'yo';
  language: 'en-US,en;q=0.9,de;q=0.8,la;q=0.7,ru;q=0.6';
  widgetLanguage: 'en';
  decodedLanguages: ['English', 'English', 'German', 'Latin', 'Russian'];
  formattedGeoLocation: 'Berlin, Germany';
  sentimentScore: number;
  summaryDetails: {
    reason: string;
    summary: string;
    contact: string;
  };
  geoCity: 'Berlin';
  geoRegionCode: 'BE';
  geoCountryName: 'Germany';
  geoCountryCode: 'DE';
  geoLatitude: '52.520007';
  geoLongitude: '13.404954';
  geoIsp: '';
  geoOrganization: 'Kabeldeutschland Route';
  ipAddress: '95.91.243.58';
  locale: 'en';
  timezone: 'Europe/Berlin';
  agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36';
  browser: ['Chrome', 'Chrome', 'Chrome (107.0.0.0)'];
  os: ['Win', 'Win10', 'Microsoft Windows 10'];
  userVisitCount: 1;
  userCommunicationsCount: 5;
  userLastContacts: [
    'e70a6e65-8c21-4123-bdb3-ee79374094de,1669925035880',
    '66d98c6f-681d-4274-80ee-80e291576b4b,1669924442288',
    'ba719a75-97e4-454b-8499-23fce212b926,1669921608798',
    '62afd1e0-febc-422e-947d-a33704a2f717,1669909053402',
    'ef84981a-da19-4776-b796-604255ba887f,1669907745606'
  ];
  visitorTranscriptTracked: true;
  fromUrl: 'https://cdpn.io/cpe/boomboom/index.html?key=index.html-3183ce8d-036b-1734-0e94-c4ca0d15153c';
  entryPageUrl: '';
  entryPageReferrer: '';
  decodedSearchData: ['', ''];
  variablesJS: 'greeting=undefined,number=undefined,boolean=undefined,string=undefined';
  transfer: false;
  transferAgentJid?: string;
  transferAgentAvatar?: string;
  reconnect: false;
  widgetSwitch: false;
  email: 'test@test.com';
  agentIntroMsg: 'Hello, new chat';
  agentIntroMsgAlertType: 1;
  transcript: [];
  transcriptV2: [];
  chatDuration: 46;
  destinationUrl: 'error:Endpoint HTTP response code 404';
  channelType: CHANNEL_TYPES.POLL;
  autoTranslateEnabledForWidget: true;
  autoTranslateOptions: {
    enabled: false;
    selectedLanguage: null;
  };
};

export interface Config {
  statusCode: number;
  data: {
    pusherApiKey: string;
    apiKey: string;
    instanceName: string;
    firebaseConfig: FirebaseConfig;
    stackdriverApiKey: string;
    pusherCluster: string;
    projectId: string;
    authDomain: string;
  };
}

type FirebaseConfig = {
  storageBucket: string;
  emulator: boolean;
  apiKey: string;
  messagingSenderId: string;
  appId: string;
  projectId: string;
  databaseURL: string;
  enabled: boolean;
  authDomain: string;
};

export type WidgetSettings = {
  widgetPublicId: string;
  widgetName: string;
  agentTransferRestricted: boolean;
  knowledgebaseAvailable: boolean;
  visitorTypingMessageEnabled: boolean;
  visitorFileExchangeEnabled: boolean;
  visitorFileExchangeSettings: {
    visitorChatEnabled: boolean;
    visitorFileUploadEnabled: boolean;
    agentFileUploadEnabled: boolean;
    fileTypeRestrictionEnabled: boolean;
    fileTypes: string[];
    allowVisitorInitiatedFileUpload: boolean;
    restrictionType: string;
  };
  secureDataExchangeEnabled: boolean;
  secureDataExchangeSettings: {
    enabled: boolean;
    cc: boolean;
    ccWithZip: boolean;
    ssn: boolean;
    secureNote: boolean;
  };
  cobrowsingEnabled: boolean;
  widgetLanguage: string;
  agentAlert: {
    message: string;
    alertType: string;
  };
  autoTranslateEnabledForWidget: boolean;
  whisperFeatureEnabled: boolean;
  labelsEnabled: boolean;
  secureAccount: boolean;
};

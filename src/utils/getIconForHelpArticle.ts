import { IconName } from '@fortawesome/fontawesome-svg-core';
import { CUSTOM_ICON } from 'hubv2/services/icons';
import { HELP_ARTICLE_SOURCES } from 'hubv2/types/requests';

const sourceIcons: Record<
  HELP_ARTICLE_SOURCES,
  {
    library: 'fas' | 'fab' | 'custom';
    icon: IconName | CUSTOM_ICON;
  }
> = {
  [HELP_ARTICLE_SOURCES.WORDPRESS]: {
    library: 'fab',
    icon: 'wordpress',
  },
  [HELP_ARTICLE_SOURCES.GOOGLE]: {
    library: 'fab',
    icon: 'google',
  },
  [HELP_ARTICLE_SOURCES.ZENDESK]: {
    library: 'fab',
    icon: 'brain',
  },
  [HELP_ARTICLE_SOURCES.MINDTOUCH]: {
    library: 'fab',
    icon: 'wordpress',
  },
  [HELP_ARTICLE_SOURCES.SALESFORCE]: {
    library: 'fab',
    icon: 'salesforce',
  },
  [HELP_ARTICLE_SOURCES.TEAMSUPPORT]: {
    library: 'custom',
    icon: CUSTOM_ICON.TEAMSUPPORT,
  },
};

export const getIconForHelpArticle = (articleSource: HELP_ARTICLE_SOURCES) => {
  return sourceIcons[articleSource];
};

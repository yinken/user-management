import * as React from 'react';

export const useHighlightSearchTerm = (
  searchTerm?: string,
  returnAsString?: boolean
) => {
  const highlightSearchTerm = React.useCallback(
    (text: string) => {
      if (!searchTerm || searchTerm.length < 2 || !text) {
        return text;
      }
      const regex = new RegExp(searchTerm, 'gi');
      const replacement = text.replace(regex, (match) => {
        return `<mark>${match}</mark>`;
      });

      if (returnAsString) {
        return replacement;
      }

      return <span dangerouslySetInnerHTML={{ __html: replacement }} />;
    },
    [searchTerm, returnAsString]
  );

  return { highlightSearchTerm };
};

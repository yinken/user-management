import { OperatorLabel } from 'hubv2/types/labels';

export const isLabelUnset = (
  label: OperatorLabel,
  labelObj: Record<string, OperatorLabel>
) => {
  const labelToCheck: OperatorLabel = labelObj[label.name];
  if (!labelToCheck) {
    return true;
  }
  if (label.freeForm) {
    return (
      Object.values(labelToCheck.options).every((value) => !value) &&
      !labelToCheck.freeFormValues.length
    );
  } else {
    return Object.values(labelToCheck.options).every((value) => !value);
  }
};

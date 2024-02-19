export type OperatorLabel = {
  name: string;
  required: false;
  freeForm: true;
  multipleOptions: false;
  freeFormValues: string[];
  options: Record<string, boolean>;
  readOnly: false;
};

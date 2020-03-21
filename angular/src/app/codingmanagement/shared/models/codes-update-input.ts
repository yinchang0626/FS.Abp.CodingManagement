
export class CodesUpdateInput  {
  no: string;
  displayName: string;
  description: string;
  code: string;
  definitionId?: string;
  parentId?: string;
  enable: boolean;

  constructor(initialValues: Partial<CodesUpdateInput> = {}) {
    if (initialValues) {
      for (const key in initialValues) {
        if (initialValues.hasOwnProperty(key)) {
          this[key] = initialValues[key];
        }
      }
    }
  }
}


export class CodesCreateInput  {
  no: string;
  displayName: string;
  description: string;
  code: string;
  definitionId?: string;
  parentId?: string;
  enable: boolean;

  constructor(initialValues: Partial<CodesCreateInput> = {}) {
    if (initialValues) {
      for (const key in initialValues) {
        if (initialValues.hasOwnProperty(key)) {
          this[key] = initialValues[key];
        }
      }
    }
  }
}

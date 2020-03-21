
export class CodesMoveInput  {
  id: string;
  newParentId?: string;

  constructor(initialValues: Partial<CodesMoveInput> = {}) {
    if (initialValues) {
      for (const key in initialValues) {
        if (initialValues.hasOwnProperty(key)) {
          this[key] = initialValues[key];
        }
      }
    }
  }
}


export class CreateOrUpdateCodeSettingsInput  {
  editItems: any[];
  deleteItemIds: string[];

  constructor(initialValues: Partial<CreateOrUpdateCodeSettingsInput> = {}) {
    if (initialValues) {
      for (const key in initialValues) {
        if (initialValues.hasOwnProperty(key)) {
          this[key] = initialValues[key];
        }
      }
    }
  }
}

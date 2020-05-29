
export class PostLoadCodeSettingsInputDto  {
  codeIds: string[];
  settingKeys: string[];

  constructor(initialValues: Partial<PostLoadCodeSettingsInputDto> = {}) {
    if (initialValues) {
      for (const key in initialValues) {
        if (initialValues.hasOwnProperty(key)) {
          this[key] = initialValues[key];
        }
      }
    }
  }
}

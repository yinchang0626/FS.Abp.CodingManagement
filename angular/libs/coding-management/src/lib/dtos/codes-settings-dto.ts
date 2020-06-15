import { CodesDto } from './codes-dto';

export class CodeSettingsDto {
    codes: CodesDto;
    settingValues: [
        {
            name: string,
            value: string
        }
    ];
    availableSettingsDefinitions: [
      {
          name: string,
          displayName: string,
          description: string,
          defaultValue: string,
          isVisibleToClients: boolean,
          isInherited: boolean,
          providers: string[],
          isEncrypted: boolean,
          value: string,
          properties: {}
      }
    ]
  
    constructor(initialValues: Partial<CodeSettingsDto> = {}) {
      if (initialValues) {
        for (const key in initialValues) {
          if (initialValues.hasOwnProperty(key)) {
            this[key] = initialValues[key];
          }
        }
      }
    }
  }
  
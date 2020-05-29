import { CodesWithDetailsDto } from './codes-with-details-dto';
import { SettingManagementDto } from '@fs/setting-management';
import * as _ from 'lodash';

export class CodeDetailWithSettingObj extends CodesWithDetailsDto {
    settings: SettingManagementDto.setting[];
    settingObj: { [key: string]: any };
  
    constructor(item) {
      super(item);
      if (item.settings) {
        this.settingObj = {};
        item.settings.forEach(setting => {
          var rename = _.last(setting.name.split("."));
          this.settingObj[rename] = setting.value
        });
      }
    }
  }
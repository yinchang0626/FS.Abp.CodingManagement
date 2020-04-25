import { CodesWithDetailsDto } from './codes-with-details-dto';
import { SettingManagementDto } from '@fs/setting-management';

export class CodesWithSettingDto extends CodesWithDetailsDto {
    settings: SettingManagementDto.setting[];
  }
  
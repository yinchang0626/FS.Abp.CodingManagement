import { CodesWithDetailsDto } from './codes-with-details-dto';
import { SettingManagementDto } from '@fs/setting-management';

export class CodesWthSettingDto extends CodesWithDetailsDto {
    settings: SettingManagementDto.setting[];
  }
  
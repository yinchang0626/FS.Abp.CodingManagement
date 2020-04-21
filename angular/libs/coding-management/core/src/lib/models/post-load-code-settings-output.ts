import { SettingManagementDto } from '@fs/setting-management';

export interface PostLoadCodeSettingsOutputDto{
    settings:SettingManagementDto.setting[];
    no:string;
    displayName:string;
    description:string;
    code:string;
    definitionId:string;
    parentId:string;
    enable:boolean;
    lastModificationTime:string;
    lastModifierId:string;
    creatorId:string;
    id:string;
  }
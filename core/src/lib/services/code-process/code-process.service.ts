import { Injectable } from '@angular/core';
import {CodesDto} from '../../models/codes-dto';
import {CodesWithDetailsDto} from '../../models/codes-with-details-dto';
import {CodeDetailWithSettingObj} from '../../models/codes-detail-with-setting-obj';
import { CodesWithSettingDto } from '../../models/codes-with-setting';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CodeProcessService {

  constructor() { }

  getCodeChildrenDetail(children: CodesDto[], codeList: CodesDto[]): CodesWithDetailsDto[] {
    var childrenIds = children.map(x => x.id);
    codeList = codeList.filter(x => !childrenIds.includes(x.id));

    var datas: CodesWithDetailsDto[] = [];
    for (var i = 0; i < children.length; i++) {
      var item = new CodesWithDetailsDto(children[i]);
      var childrenCodes = codeList.filter(x => x.parentId == children[i].id);
      var codeListCodes = codeList.filter(x => _.startsWith(x.code, children[i].code));

      item.children = this.getCodeChildrenDetail(childrenCodes, codeListCodes)
      item.codeList = codeListCodes;

      datas.push(item);
    }
    return datas;
  }


  getCodeChildrenDetailWithSetting(children: CodesWithSettingDto[], codeList: CodesWithSettingDto[], HidefalseEnable:boolean = false): CodeDetailWithSettingObj[] {
    console.log(codeList)
    var childrenIds = children.map(x => x.id);
    codeList = codeList.filter(x => !childrenIds.includes(x.id));

    var datas: CodeDetailWithSettingObj[] = [];
    for (var i = 0; i < children.length; i++) {
      var item = children[i];

      if(HidefalseEnable){
        var codeList = codeList.filter(x => x.enable == true)
      }

      var childrenCodes = _.sortBy(codeList.filter(x => x.parentId == children[i].id ), "no");
      var codeListCodes = codeList.filter(x => _.startsWith(x.code, children[i].code));
      item.children = this.getCodeChildrenDetail(childrenCodes, codeListCodes);
      item.codeList = codeListCodes;

      var check = codeList.find(x => { return children[i].id == x.id });
      if (check && check.settings) item.settings = check.settings;
      datas.push(new CodeDetailWithSettingObj(item));

    }
    return datas;
  }

}

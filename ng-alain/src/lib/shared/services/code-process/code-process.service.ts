import { Injectable } from '@angular/core';
import { CodesDto, CodesWithDetailsDto } from '@fs/coding-management/core';
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
    for(var i = 0; i < children.length; i++) {
      var item = new CodesWithDetailsDto(children[i]);
      // item.children = codeList.filter(x => x.parentId == children[i].id);
      // item.codeList = codeList.filter(x => _.startsWith(x.code, children[i].code));

      var childrenCodes = codeList.filter(x => x.parentId == children[i].id);
      var codeListCodes = codeList.filter(x => _.startsWith(x.code, children[i].code));
      
      item.children = this.getCodeChildrenDetail(childrenCodes, codeListCodes)
      item.codeList = codeListCodes;

      datas.push(item);
    }

    return datas;
  }
}

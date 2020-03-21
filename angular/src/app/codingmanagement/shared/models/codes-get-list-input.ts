import { PagedAndSortedResultRequestDto } from '@abp/ng.core';

export class CodesGetListInput extends PagedAndSortedResultRequestDto {
  sorting: string;
  skipCount: number;
  maxResultCount: number;

  constructor(initialValues: Partial<CodesGetListInput> = {}) {
    super(initialValues);
  }
}

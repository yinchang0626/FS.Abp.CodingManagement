import { async, TestBed } from '@angular/core/testing';
import { FsCodingManagementModule } from './fs-coding-management.module';

describe('FsCodingManagementModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FsCodingManagementModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FsCodingManagementModule).toBeDefined();
  });
});

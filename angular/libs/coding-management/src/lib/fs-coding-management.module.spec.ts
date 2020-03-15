import { async, TestBed } from '@angular/core/testing';
import { CodingManagementModule } from './fs-coding-management.module';

describe('CodingManagementModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CodingManagementModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CodingManagementModule).toBeDefined();
  });
});

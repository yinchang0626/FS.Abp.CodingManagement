import { async, TestBed } from '@angular/core/testing';
import { CodingManagementCoreModule } from './core.module';

describe('CodingManagementCoreModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CodingManagementCoreModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CodingManagementCoreModule).toBeDefined();
  });
});

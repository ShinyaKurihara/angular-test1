import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataListPager } from './data-list-pager';

describe('DataListPager', () => {
  let component: DataListPager;
  let fixture: ComponentFixture<DataListPager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataListPager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataListPager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

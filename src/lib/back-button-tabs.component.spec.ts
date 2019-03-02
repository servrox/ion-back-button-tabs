import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackButtonTabsPage } from './back-button-tabs.page';

describe('BackButtonTabsPage', () => {
  let component: BackButtonTabsPage;
  let fixture: ComponentFixture<BackButtonTabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackButtonTabsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackButtonTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

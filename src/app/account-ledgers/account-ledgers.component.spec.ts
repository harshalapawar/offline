import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountLedgersComponent } from './account-ledgers.component';

describe('AccountLedgersComponent', () => {
  let component: AccountLedgersComponent;
  let fixture: ComponentFixture<AccountLedgersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountLedgersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountLedgersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

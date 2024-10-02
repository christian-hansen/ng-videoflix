import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticImprintComponent } from './static-imprint.component';

describe('StaticImprintComponent', () => {
  let component: StaticImprintComponent;
  let fixture: ComponentFixture<StaticImprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaticImprintComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaticImprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

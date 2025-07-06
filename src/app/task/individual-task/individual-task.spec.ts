import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualTask } from './individual-task';

describe('IndividualTask', () => {
  let component: IndividualTask;
  let fixture: ComponentFixture<IndividualTask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualTask]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualTask);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

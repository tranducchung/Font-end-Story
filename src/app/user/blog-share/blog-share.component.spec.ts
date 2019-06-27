import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogShareComponent } from './blog-share.component';

describe('BlogShareComponent', () => {
  let component: BlogShareComponent;
  let fixture: ComponentFixture<BlogShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

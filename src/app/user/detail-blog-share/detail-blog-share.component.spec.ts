import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBlogShareComponent } from './detail-blog-share.component';

describe('DetailBlogShareComponent', () => {
  let component: DetailBlogShareComponent;
  let fixture: ComponentFixture<DetailBlogShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailBlogShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailBlogShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

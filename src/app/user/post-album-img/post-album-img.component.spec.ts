import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAlbumImgComponent } from './post-album-img.component';

describe('PostAlbumImgComponent', () => {
  let component: PostAlbumImgComponent;
  let fixture: ComponentFixture<PostAlbumImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostAlbumImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostAlbumImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

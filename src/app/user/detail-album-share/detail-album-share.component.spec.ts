import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAlbumShareComponent } from './detail-album-share.component';

describe('DetailAlbumShareComponent', () => {
  let component: DetailAlbumShareComponent;
  let fixture: ComponentFixture<DetailAlbumShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailAlbumShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAlbumShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

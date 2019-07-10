import { TestBed } from '@angular/core/testing';

import { PostAlbumImgService } from './post-album-img.service';

describe('PostAlbumImgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostAlbumImgService = TestBed.get(PostAlbumImgService);
    expect(service).toBeTruthy();
  });
});

import { Component, OnInit } from '@angular/core';
import {Blog} from '../ipost';
import {PostService} from '../../service/post.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blogList: Blog[];

  constructor(
    private postService: PostService,
  ) { }

  ngOnInit() {
    this.postService.getBlogs().subscribe(next => (this.blogList = next), error => (this.blogList = []) );
  }
  delete(i) {
    const blog = this.blogList[i];
    this.postService.deleteBlog(blog.id).subscribe(() =>
    this.blogList = this.blogList.filter(t => t.id !== blog.id));
  }
}

import { Component, OnInit } from '@angular/core';
import {Blog} from '../ipost';
import {PostService} from '../../service/post.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-blog-management',
  templateUrl: './blog-management.component.html',
  styleUrls: ['./blog-management.component.scss']
})
export class BlogManagementComponent implements OnInit {
  listBlog: Blog[];

  constructor(
    private postService: PostService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.postService.getBlogs().subscribe(next =>
      (this.listBlog = next), error => (this.listBlog = []));
  }
  delete(i) {
    const r = confirm('Do you want delete this blog?');
    if (r) {
      const blog = this.listBlog[i];
      this.postService.deleteBlog(blog.id).subscribe(() => {
        this.postService.getBlogs().subscribe(next => {
          this.listBlog = next;
        });
      }, error => console.log(error)  );
    }
  }
}

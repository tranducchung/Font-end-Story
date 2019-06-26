import { Component, OnInit } from '@angular/core';
import {Blog} from '../ipost';
import {PostService} from '../../service/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-detail-blog',
  templateUrl: './detail-blog.component.html',
  styleUrls: ['./detail-blog.component.scss']
})
export class DetailBlogComponent implements OnInit {
  blog: Blog;
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getBlogById(id).subscribe( next => {
      this.blog = next;
      // this.blogForm.patchValue(this.blog);
    }, error => {
      console.log(error);
      this.blog = null;
    } );
  }
}

import { Component, OnInit } from '@angular/core';
import {Blog, User} from '../ipost';
import {PostService} from '../../service/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-detail-blog',
  templateUrl: './detail-blog.component.html',
  styleUrls: ['./detail-blog.component.scss']
})
export class DetailBlogComponent implements OnInit {
  blog: Blog;
  listUser: User[];
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private userService: UserService
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
    this.userService.getUsers().subscribe(next => (this.listUser = next), error => (this.listUser = []) );
  }
}

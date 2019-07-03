import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Blog} from '../ipost';
import {PostService} from '../../service/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenService} from '../../auth/token.service';

@Component({
  selector: 'app-post-blog',

  templateUrl: './post-blog.component.html',
  styleUrls: ['./post-blog.component.scss']
})


export class PostBlogComponent implements OnInit {

  blogForm: FormGroup;
  blog: Blog;
  info: any;

  constructor(
    private postService: PostService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService
  ) {
  }

  ngOnInit() {
    this.info = {
      token: this.tokenService.getToken(),
      username: this.tokenService.getUsername(),
      email: this.tokenService.getEmail(),
      authorities: this.tokenService.getAuthor()
    };
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      content: ['', [Validators.required, Validators.minLength(2)]],
      video: ['']
    });
  }

  onSubmit() {
    const {value} = this.blogForm;
    const data = {
      ...this.blog,
      ...value
    };
    this.postService.addBlog(data).subscribe(next => {
      this.router.navigate(['/listBlog']);
    }, error => console.log(error));
  }
}

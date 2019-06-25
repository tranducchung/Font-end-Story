import { Component, OnInit } from '@angular/core';
import {Blog} from '../ipost';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../../service/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit {
  private Editor = ClassicEditor;
  blog: Blog;
  blogForm: FormGroup;
  constructor(
    private postService: PostService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.blogForm = this.fb.group(
      {
        title: ['', [Validators.required, Validators.minLength(2)]],
        content: ['', [Validators.required, Validators.minLength(2)]]
      }
    );
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getBlogById(id).subscribe(next => {
        this.blog = next;
        this.blogForm.patchValue(this.blog);
      }, error => {
      console.log(error);
      this.blog = null;
      }
    );
  }

  onSubmit() {
    if (this.blogForm.valid) {
      const {value} = this.blogForm;
      const data = {
        ...this.blog,
        ...value
      };
      this.postService.update(data).subscribe(() => {
        this.router.navigate(['/listBlog']);
      }, error => console.log(error) );
    }
  }
}

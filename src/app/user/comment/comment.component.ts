import {Component, Input, OnInit} from '@angular/core';
import {Blog, Comment} from '../ipost';
import {CommentService} from '../../service/comment.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PostService} from '../../service/post.service';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  listComment: Comment[];
  commentForm: FormGroup;
  comment: Comment;
  @Input() blog: Blog;
  constructor(
    private commentService: CommentService,
    private fb: FormBuilder,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.commentForm = this.fb.group( {
      content: ['']
      }
    );
  }
  onSubmit(idBlog: number) {
    const {value} = this.commentForm;
    const data = {
      ...this.comment,
      ...value
    };
    this.commentService.createComment(idBlog, data).subscribe(() => {
      console.log('Comment Success');
      this.commentForm.reset({
        content: ''
      });
      this.postService.getBlogById(this.blog.id).subscribe( next => this.blog = next, error => console.log(error));
    }, error => console.log(error));
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {Blog, Comment, ReplyCommnent} from '../ipost';
import {CommentService} from '../../service/comment.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../../service/post.service';
import {TokenService} from '../../auth/token.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  commentForm: FormGroup;
  comment: Comment;
  replyForm: FormGroup;
  repComment: ReplyCommnent;
  check = false;
  indexOfShow = -1;
  @Input() blog: Blog;
  info: any;
  constructor(
    private commentService: CommentService,
    private fb: FormBuilder,
    private postService: PostService,
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
    this.commentForm = this.fb.group({
        content: ['', [Validators.required]]
      }
    );
    this.replyForm = this.fb.group({
        content: ['', [Validators.required]]
      }
    );
  }

  onSubmit(idBlog: number) {
    if (this.commentForm.valid) {
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
        this.postService.getBlogById(this.blog.id).subscribe(next => this.blog = next, error => console.log(error));
      }, error => console.log(error));
    }
  }

  reply(anble: boolean) {
    this.check = anble;
  }

  readReply(i) {
    this.indexOfShow = i;
  }

  submit(idRep: number) {
    if (this.replyForm.valid) {
      const {value} = this.replyForm;
      const data = {
        ...this.repComment,
        ...value
      };
      this.commentService.createRepComment(idRep, data).subscribe(() => {
        console.log('Reply success');
        this.replyForm.reset({
          content: ''
        });
        this.postService.getBlogById(this.blog.id).subscribe(next => this.blog = next, error => console.log(error));
      }, error => console.log(error));
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {Blog} from '../ipost';
import {PostService} from '../../service/post.service';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.scss']
})
export class AllUserComponent implements OnInit {
  listBlog: Blog[];
  indexOfShow = -1;
  showButton = false;
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getAllBlogByAllUser().subscribe(next => this.listBlog = next, error => console.log(error) );
  }
  readMore(i) {
    this.indexOfShow = i;
  }

  showContent(enable: boolean) {
    this.showButton = enable;
  }
}

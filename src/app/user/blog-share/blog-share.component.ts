import { Component, OnInit } from '@angular/core';
import {User} from '../ipost';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-blog-share',
  templateUrl: './blog-share.component.html',
  styleUrls: ['./blog-share.component.scss']
})
export class BlogShareComponent implements OnInit {
  user: User;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUserById(id).subscribe(next => {
        this.user = next;
      }, error => {
        console.log(error);
        this.user = null;
      }
    );
  }

}

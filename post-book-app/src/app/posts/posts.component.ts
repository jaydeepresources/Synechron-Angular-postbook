import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../model/post';
import { User } from '../model/user';
import { FirstNamePipe } from '../pipes/first-name-pipe';
import { PostFormComponent } from '../post-form/post-form.component';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [PostFormComponent, CommonModule, FirstNamePipe],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {

  post: Post

  constructor(public auth: AuthService, public postService: PostService, public router: Router) {
    this.post = {
      postId: 0,
      postTitle: '',
      postBody: '',
      user: new User(0, '', '', '')
    }
  }

  ngOnInit() {
    if (!this.auth.isLoggedIn)
      this.router.navigateByUrl('/signin')

    if (this.auth.isLoggedIn) {
      console.log('User from Posts')
      this.auth.user$.subscribe(res => console.log(res))
      this.postService.getPosts()
    }
  }

}
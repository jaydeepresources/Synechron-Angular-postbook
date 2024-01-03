import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostFormComponent } from '../post-form/post-form.component';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, UserFormComponent, PostFormComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor(public auth: AuthService, public postService: PostService, public router: Router) {

  }

  ngOnInit() {
    console.log('User from Profile')
    this.auth.user$.subscribe(res => console.log(res))

    if (!this.auth.isLoggedIn)
      this.router.navigateByUrl('/signin')

    if (this.auth.isLoggedIn) {
      this.postService.getMyPosts(this.auth.user.userId)
    }
  }
}

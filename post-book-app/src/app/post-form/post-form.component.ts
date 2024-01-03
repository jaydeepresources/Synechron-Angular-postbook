import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post } from '../model/post';
import { User } from '../model/user';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})
export class PostFormComponent {

  @Input('post')
  post: Post

  postForm: FormGroup

  constructor(public auth: AuthService, public formBuilder: FormBuilder, public postService: PostService) {
    this.post = {
      postId: 0,
      postTitle: '',
      postBody: '',
      user: new User(0, '', '', '')
    }
    this.postForm = formBuilder.group({
      postTitle: [this.post.postTitle, Validators.required],
      postBody: [this.post.postBody, Validators.required]
    })
  }

  postSubmit() {

    this.post = {
      postId: this.post.postId,
      postTitle: this.postForm.controls['postTitle'].value,
      postBody: this.postForm.controls['postBody'].value,
      user: new User(this.auth.user.userId, '', '', '')
    }

    this.postService.savePost(this.post).subscribe(data => {

      if (data) {

        // inserted post
        if (this.post.postId === 0) {
          // this.postService.posts.push(data)
          this.post = {
            postId: 0,
            postTitle: '',
            postBody: '',
            user: new User(0, '', '', '')
          }
          this.postForm = this.formBuilder.group({
            postTitle: ['', Validators.required],
            postBody: ['', Validators.required]
          })
          this.postService.getPosts()
        }

        // edited post
        else if (this.post.postId > 0) {
          Object.assign(this.post, data)
          this.postService.getPosts()
          this.postService.getMyPosts(this.auth.user.userId)
        }

        this.postForm.markAsPristine()
      }
      else {
      }
    })
  }

  deletePost() {
    this.postService.deletePost(this.post.postId).subscribe(data => {
      if (data.msg === 'deleted') {
        this.postService.getPosts()
        this.postService.getMyPosts(this.auth.user.userId)
      }
    })
  }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      postTitle: [this.post.postTitle, Validators.required],
      postBody: [this.post.postBody, Validators.required]
    })
  }
}

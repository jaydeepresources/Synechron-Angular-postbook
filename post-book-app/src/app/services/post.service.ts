import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../model/post';
import { Status } from '../model/status';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Post[]
  myPosts: Post[]

  constructor(public http: HttpClient) {
    this.posts = []
    this.myPosts = []
  }

  getPosts() {
    this.http.get<Post[]>('http://localhost:8081/posts/all').subscribe(data => {
      this.posts = data
    })
  }

  getMyPosts(userId: number) {
    this.http.get<Post[]>('http://localhost:8081/posts/find/' + userId).subscribe(data => {
      this.myPosts = data
    })
  }

  savePost(post: Post): Observable<Post> {
    return this.http.post<Post>('http://localhost:8081/posts/add', post)
  }

  deletePost(postId: number) {
    return this.http.delete<Status>('http://localhost:8081/posts/delete/' + postId)
  }
}

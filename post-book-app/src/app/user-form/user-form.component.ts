import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmailDirective } from '../directives/email.directive';
import { User } from '../model/user';
import { PasswordValidatorDirective } from '../password-validator.directive';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule, CommonModule, PasswordValidatorDirective, EmailDirective, RouterLink],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

  @Input('parentName')
  parentName: string
  user: User
  successFlag: boolean
  errorFlag: boolean

  constructor(public auth: AuthService, public router: Router) {
    this.user = new User(0, '', '', '')
    this.parentName = ''
    this.successFlag = false
    this.errorFlag = false
  }

  handleSignUp(signUpForm: any) {
    this.successFlag = false
    this.errorFlag = false

    this.auth.signUp(this.user).subscribe(data => {

      // sign up failed
      if (!data) {
        this.errorFlag = true
        this.auth.userSubject.next(this.user)
      }

      // sign up succeeded
      else if (data) {
        this.successFlag = true
        this.auth.userSubject.next(data)
      }

      this.auth.user = data
      signUpForm.form.markAsPristine()
    })

  }

  ngOnInit() {
    if (this.auth.user)
      Object.assign(this.user, this.auth.user)
  }
}

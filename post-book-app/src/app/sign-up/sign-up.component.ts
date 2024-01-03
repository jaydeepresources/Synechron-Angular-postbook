import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailDirective } from '../directives/email.directive';
import { User } from '../model/user';
import { PasswordValidatorDirective } from '../password-validator.directive';
import { AuthService } from '../services/auth.service';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  user: User
  successFlag: boolean
  errorFlag: boolean

  constructor(public auth: AuthService, public router: Router) {
    this.user = new User(0, '', '', '')
    this.successFlag = false
    this.errorFlag = false
  }

  handleSignUp(signUpForm: any) {
    this.successFlag = false
    this.errorFlag = false


    this.auth.signUp(this.user).subscribe(data => {

      // sign up failed
      if (!data)
        this.errorFlag = true

      // sign up succeeded
      else if (data)
        this.successFlag = true

      this.auth.user = data
      signUpForm.markAsPristine()
      setTimeout(() => {
        this.router.navigateByUrl('/signin')
      }, 5000);
    })

  }
}
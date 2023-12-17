import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,5}$/;
  constructor(
    private auth: AuthService,
    private user: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.auth.user.subscribe((user) => {
      console.log(user);
      if (user) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  login(form: any) {
    if (form.valid) {
      let data = form.value;
      console.log(data);
      this.auth
        .login(data.email, data.password)
        .then((res) => {
          console.log('fire', res);
          this.toastr.success('Welcome on Kanban Board!');
          // this.user.addNewUser(res.user?.uid, data.name, data.email).then(() => {
          this.router.navigate(['/dashboard']);
          // });
        })
        .catch((err) => {
          console.log('err', err);
          this.toastr.error(this.convertMessage(err['code']), 'Opps!');
        });
    } else {
      this.toastr.error('Invalid Data', 'Opps!');
    }
  }

  convertMessage(code: string): string {
    switch (code) {
      case 'auth/user-disabled': {
        return 'Sorry your user is disabled.';
      }
      case 'auth/invalid-credential': {
        return 'Sorry user not found.';
      }

      default: {
        return 'Login error try again later.';
      }
    }
  }
}

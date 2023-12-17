import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
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

  ngOnInit() {}
  public EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,5}$/;

  register(form: any) {
    if (form.valid) {
      let data = form.value;
      console.log(data);
      this.auth
        .register(data.email, data.password)
        .then((res) => {
          console.log('fire', res);
          this.toastr.success('Welcome on Kanban Board!');
          this.user
            .addNewUser(res.user?.uid, data.name, data.email)
            .then(() => {
              this.router.navigate(['/dashboard']);
            });
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
      case 'auth/email-already-in-use': {
        return 'This Email Already use.';
      }

      default: {
        return 'Login error try again later.';
      }
    }
  }
}

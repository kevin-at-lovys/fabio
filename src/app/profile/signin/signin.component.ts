import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: any;
  user;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,

  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
      password: ['', Validators.required]
    });


  }


  ngOnInit(): void {

  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.userService.login(this.f.username.value, this.f.password.value)
      .then(user => {
        this.loading = false;
        if (user) {
          if (!user.message) {
            this.user = user;
            this.router.navigateByUrl("/home")
          } else { this.error = user.message }
        }
      }).catch(err => {
        console.log(err)
        this.error = err.message || err
        this.loading = false
      });
  }
}

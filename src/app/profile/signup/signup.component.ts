
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { UserService } from '../user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: any;
  user: any;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
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

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.userService.register(this.f.username.value, this.f.password.value)
      .then(user => {
        if(user){
          if (!user.message) {
            this.user = user;
            this.router.navigateByUrl("/home")
          } else { this.error = user.message }
        }
        this.loading = false
      }).catch(err => {
        console.log(err)
        this.loading = false
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { first } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string='';
  showPassword:boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toast: ToastrService
  ) { 
    if (this.authService.currentUserValue) { 
      this.router.navigate(['/']);
  }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });

  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this.authService.login(this.f['username'].value, this.f['password'].value)
          .pipe(first())
          .subscribe({
            next: (v) => {
              this.router.navigate([this.returnUrl]);
              this.toast.success("Welcome to the Docs App","Login Sucess");
            },
            error:(e)=>{
              this.toast.error('user not found,check the useranme and password correctly', 'Wrong Credentials')
              // this.alertService.error(e);
              this.loading = false;
            }
          
          });
  }

}

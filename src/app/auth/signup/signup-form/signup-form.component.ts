import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  signUpForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    confirmPassword: new FormControl('', [Validators.required])
  });
  constructor(
    private router: Router, 
    private httpClient: HttpClient, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
  }
  onSubmit(){
    console.log(this.signUpForm.value);
    this.httpClient.post(
      "https://e-consult-angular-app-default-rtdb.firebaseio.com/users.json",
      this.signUpForm.value
      ).subscribe(
        (response) => {
        console.log(response);        
        this.router.navigate(['/auth', 'login']);
        this.signUpForm.reset();
      },
      (error) => {console.log(error)}
      );
  }

}

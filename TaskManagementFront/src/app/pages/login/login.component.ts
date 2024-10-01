import { Component, OnInit } from '@angular/core';
import { AccesService } from '../../services/acces.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
    loginForm!: FormGroup;
     
    constructor(
      private accesService: AccesService,
      private service: RoleService,
      private router: Router,
      private fb: FormBuilder
    ){}

    ngOnInit(): void {
      this.loginForm = this.fb.group({
        fullname: ['', []],
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
        role: ['', []]
      });
    }

    onSubmit(): void {
      if(this.loginForm.valid){
        this.accesService.login(this.loginForm.value).subscribe({
          next:(data) =>{
               if(data.result){
                localStorage.setItem("token",data.data.token);
                    this.service.Get('task/getPermissionByUserId').then((response)=>{
                      if (response.result) {
                        localStorage.setItem('permissions', JSON.stringify(response.data));
                        this.router.navigateByUrl('home');
                      }
                    });
               }else{
                    alert("Credenciales incorrectas")
               }
          },
          error:(error) =>{
               console.log(error.message);
          }
     });
      }
    }

}
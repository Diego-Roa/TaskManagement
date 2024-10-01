import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RoleService } from '../../services/role.service';
import { UserManagementComponent } from '../../components/user-management/user-management.component';
import { TaskManagementComponent } from '../../components/task-management/task-management.component';
import { HaspermissionService } from '../../shared/directives/haspermissions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ MatIconModule,
    MatCardModule,
    MatFormFieldModule, 
    MatButtonModule,
    MatInputModule, 
    MatSidenavModule, 
    MatToolbarModule,
    MatListModule, 
    MatTabsModule, 
    UserManagementComponent,
    TaskManagementComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isUser: boolean = false;
  menuItems: string[] = []; 
  
  constructor(
    private router: Router,
    public hasPermissionService: HaspermissionService
  ){};

  logout(): void{
    localStorage.removeItem('token');
    localStorage.removeItem('permissions');
    this.router.navigate(['login']);
  }


}

import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../shared/table/table.component';
import { TableVieModel } from '../../shared/table/Models/TableViewModel';
import { RoleService } from '../../services/role.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { User } from '../../interfaces/User';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HaspermissionService } from '../../shared/directives/haspermissions.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [TableComponent, MatIconModule, MatButtonModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
})
export class UserManagementComponent implements OnInit {
  table!: TableVieModel;
  user!: User[];
  showTable: boolean = false;

  constructor(
    private roleService: RoleService, 
    public dialog: MatDialog,
    public hasPermissionService: HaspermissionService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.roleService.Get('applicationrole/getUsers').then((response) => {
      if (response.result) {
        this.user = response.data;
        this.table = {
          columns: [
            { key: 'userName', value: 'Usuario' },
            { key: 'role', value: 'Rol' },
            { key: 'email', value: 'Email' },
          ],
          data: this.user,
          showActions: true,
        };
        console.log(this.table);
        this.showTable = true;
      }
    });
  }

  createUser() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '60vh',
    });
    dialogRef.afterClosed().subscribe((response) => {
      if (response.result) {
        this.getUsers();
        alert(response.message);
      }
    });
  }

  updateUser(updateUser: any) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '60vh',
      data: { ...updateUser },
    });
    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        this.getUsers();
        alert(response.message)
      }
    });
  }

  deleteUser(user: any) {
    this.roleService.Get('applicationrole/deleteUser/'+ user.id).then((response =>{
      if (response.result) {
        this.getUsers();
        alert(response.message);
      }
    }))
  }
}

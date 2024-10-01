import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TableComponent } from '../../shared/table/table.component';
import { TableVieModel } from '../../shared/table/Models/TableViewModel';
import { RoleService } from '../../services/role.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalTaskComponent } from './modal-task/modal-task.component';
import { Task } from '../../interfaces/task';
import { HaspermissionService } from '../../shared/directives/haspermissions.service';

@Component({
  selector: 'app-task-management',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule, 
    TableComponent],
  templateUrl: './task-management.component.html',
  styleUrl: './task-management.component.css'
})
export class TaskManagementComponent implements OnInit{
  table!: TableVieModel;
  showTable: boolean = false;
  tasks!: Task[];

  constructor(
    private service: RoleService,
    public dialog: MatDialog,
    public hasPermissionService: HaspermissionService
  ){}

  ngOnInit(){
    this.getTasks();
  }

  getTasks(){
    this.service.Get('task/getTasks').then((response) => {
      if (response.result) {
        this.tasks = response.data;
        this.table = {
          columns: [
            { key: 'id', value: 'Id'},
            { key: 'name', value: 'Tarea' },
            { key: 'employeeName', value: 'Responsable' },
            { key: 'status', value: 'Estado' },
          ],
          data: this.tasks,
          showActions: true,
        };
        this.showTable = true;
      }
    });
  }

  createTask(){
    const dialogRef = this.dialog.open(ModalTaskComponent, {
      width: '60vh',
    });
    dialogRef.afterClosed().subscribe((response) => {
      if (response && response.result) {
        this.getTasks();
        alert(response.message);
      }
    });
  }

  updateTask(updateUser: any) {
    const dialogRef = this.dialog.open(ModalTaskComponent, {
      width: '60vh',
      data: {...updateUser}
    });
    dialogRef.afterClosed().subscribe((response) => {
      if (response && response.result) {
        this.getTasks();
        alert(response.message);
      }
    });
  }

  deleteTask(task: any) {
    this.service.Get('task/deleteTask/' + task.id).then((response =>{
      if (response.result) {
        this.getTasks();
        alert(response.message);
      }
    }))
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl,
} from '@angular/forms';
import { RoleService } from '../../../services/role.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../../interfaces/User';
import { HaspermissionService } from '../../../shared/directives/haspermissions.service';

@Component({
  selector: 'app-modal-task',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './modal-task.component.html',
  styleUrl: './modal-task.component.css'
})
export class ModalTaskComponent implements OnInit {
  
  formTask!: FormGroup;
  buttonSubmit: string = '';
  title: string = '';
  states: string[] = ['Pendiente', 'En proceso', 'Completada'];
  employees!: User[];
  isSupervisor: boolean = false;

  constructor(
    private service: RoleService,
    public dialogRef: MatDialogRef<ModalTaskComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public haspermissions: HaspermissionService,
    private fb: FormBuilder
  ){
    this.isSupervisor = haspermissions.checkPermission('/tasks','_Create');
    this.title = data != null ? 'Editar Tarea' : 'Crear Tarea';
    this.buttonSubmit = data != null ? 'Guardar' : 'Crear';
  }

  ngOnInit(): void {
    this.getEmployee();
    this.formInit();
  }

  getEmployee(){
    this.service.Get('applicationRole/getEmployees').then((response) => {
      if (response.result) {
        this.employees = response.data;
      }
    })
  }

  formInit(){
    this.formTask = this.fb.group({
      id: new FormControl( this.data?.id ? this.data?.id : 0 ),
      name: new FormControl({value: this.data?.name ? this.data.name : '', disabled: !this.isSupervisor}, [Validators.required]),
      description: new FormControl({value:this.data?.description? this.data.description : '', disabled: !this.isSupervisor}, Validators.required),
      employeeId: new FormControl({ value:this.data?.employeeId ? this.data.employeeId : '', disabled: !this.isSupervisor}, Validators.required),
      employeeName: new FormControl({value: this.data?.employeeName ? this.data.employeeName : '', disabled:!this.isSupervisor}),
      status: new FormControl(this.data?.status ? this.data.status : '', Validators.required),
      supervisor: new FormControl(this.data?.supervisor ? this.data.supervisor : 'supervisor'),
    })
  }

  onSave(){
    if (this.formTask.valid) {
      switch (this.buttonSubmit) {
        case 'Guardar':
          this.updateTask(this.formTask.value);
          break;

        case 'Crear':
          this.createTask(this.formTask.value);
          break;

        default:
          this.dialogRef.close(this.formTask.value);
          break;
      }
    }
  }

  updateTask(task: any){
    this.formTask.enable();
    this.service.Post('task/updateTask', this.formTask.value).then((response) => {
      if(response.result){
        this.dialogRef.close(response);
      }
    });
  }

  createTask(task: any){
    this.service.Post('task/createTask', task).then((response) => {
      if(response.result){
        this.dialogRef.close(response);
      }
    });
  }

  onCancel(){
    this.dialogRef.close();
  }

}

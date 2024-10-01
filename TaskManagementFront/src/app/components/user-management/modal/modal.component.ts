import { Component, Inject } from '@angular/core';
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
import { role } from '../../../interfaces/role';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  form!: FormGroup;
  title: string = 'Crear';
  buttonSubmit: string = 'Crear';
  roles!: role[];

  constructor(
    private roleService: RoleService,
    public dialogRef: MatDialogRef<ModalComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.title = data != null ? 'Editar ' : 'Crear';
    this.buttonSubmit = data != null ? 'Guardar' : 'Crear';
  }

  ngOnInit(): void {
   this.getRoles();
   this.formInit()
  }

  getRoles() {
    this.roleService.Get('applicationrole/getRoles').then((response) => {
      if (response.result) {
        this.roles = response.data;
      }
    });
  }

  formInit(){
    this.form = this.fb.group({
      fullName: new FormControl(
        this.data?.fullName != null ? this.data?.fullName : '',
        Validators.required
      ),
      id: new FormControl(
        this.data?.id != null ? this.data?.id : ''),
      username: new FormControl(
        this.data?.email != null ? this.data?.email : '',
        [Validators.required, Validators.email]
      ),
      password: new FormControl({value: '',disabled: this.data ? true : false}, [Validators.required]),
      role: new FormControl(this.data?.role != null ? this.data?.role : '', [
        Validators.required,
      ]),
    });
  }

  onSave(): void {
    if (this.form.valid) {
      switch (this.buttonSubmit) {
        case 'Guardar':
          this.updateUser(this.form.value);
          break;

        case 'Crear':
          this.createUser(this.form.value);
          break;

        default:
          this.dialogRef.close(this.form.value);
          break;
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  createUser(formValue: any) {
    this.roleService.Post('applicationrole/createUser', formValue).then((response) => {
      if (response.result) {
        this.dialogRef.close(response);
      }
    });
  }

  updateUser(formValue: any) {
    this.form.enable();
    this.roleService.Post('applicationrole/updateUser', this.form.value).then((response) => {
      if (response.result) {
        this.dialogRef.close(response);
      }
    });
  }
}

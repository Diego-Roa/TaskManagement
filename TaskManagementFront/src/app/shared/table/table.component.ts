import { Component, Input, OnInit, output } from '@angular/core';
import { TableVieModel } from './Models/TableViewModel';
import { MatIconModule } from '@angular/material/icon';
import { HaspermissionService } from '../directives/haspermissions.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {

  @Input() columns: any;
  @Input() rows: any;
  @Input() table!: TableVieModel;

  showTable: boolean = false;
  deleteChange = output<any>();
  updateChange = output<any>();

  constructor(public hasPermissions: HaspermissionService) {}

  ngOnInit(): void {
    console.log(this.table);
  }

  updateRow(row: any){
    this.updateChange.emit(row);
  }

  deleteRow(row:any){
    this.deleteChange.emit(row)
  }

}

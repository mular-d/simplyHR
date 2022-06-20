import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { EmployeeService } from './../../services/employee-service';
import { Employee } from './../../models/employee-model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'employees-list',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Email', 'Date Joined', 'Department', 'Options'];
  empList = new MatTableDataSource<Employee>();
  empty: boolean = false

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.empList.paginator = this.paginator;
    this.refreashEmpList()
  }

  constructor(
    private service: EmployeeService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog ) {
      this.service.listen().subscribe((m: any) => {
        this.refreashEmpList();
      })
    }

  refreashEmpList() {
    this.service.getEmployeesList().subscribe(data => {
      this.empList = new MatTableDataSource(data)
      if (data.length == 0) {
        this.empty = true
      }
    })
  }

  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddEmployeeComponent, dialogConfig);
  }

  onEdit(row: Employee) {
    this.service.formData = row;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%"
    this.dialog.open(EditEmployeeComponent, dialogConfig)
  }

  onDelete(id: string) {
    if (confirm('Are you sure to delete?')) {
      this.service.deleteEmployee(id).subscribe(res => {
        this.refreashEmpList();
        this.snackBar.open("Employee Deleted Successfully.", '', {
          duration: 3000
        })
      })
    }
  }
}

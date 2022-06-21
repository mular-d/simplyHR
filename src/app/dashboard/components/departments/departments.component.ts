import { EditDepartmentComponent } from './edit-department/edit-department.component';
import { DepartmentService } from './../../services/department-service';
import { Department } from './../../models/department-model';

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material';

import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { AddDepartmentComponent } from './add-department/add-department.component';

@Component({
  selector: 'departments-list',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {
  
  constructor(
    private service: DepartmentService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.service.listen().subscribe((m: any) => {
      this.refreashDeptList();
    })
  }

  displayedColumns: string[] = ['Title', 'Description', 'Location', 'Options'];
  deptList = new MatTableDataSource<Department>();
  empty: boolean = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.deptList.paginator = this.paginator;
    this.refreashDeptList()
  }


  refreashDeptList() {
    this.service.getDeptList().subscribe(data => {
      this.deptList = new MatTableDataSource(data)
      if (data.length == 0){
        this.empty = true
      }
    })
  }

  onEdit(dept: Department) {
    this.service.formData = dept;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%";
    this.dialog.open(EditDepartmentComponent, dialogConfig)
  }

  onDelete(id: string) {
    if (confirm('Are you sure to delete?')) {
      this.service.deleteDepartment(id).subscribe(res => {
        this.refreashDeptList();
        this.snackBar.open("Department Deleted Successfully.", '', {
          duration: 3000
        })
      })
    }
  }

  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%";
    this.dialog.open(AddDepartmentComponent, dialogConfig)
  }

}

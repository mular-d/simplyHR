import { DepartmentService } from './../../../services/department-service';
import { Component, OnInit } from "@angular/core";
import { MatDialogRef, MatSnackBar } from "@angular/material";
import { NgForm } from '@angular/forms';

@Component({
    selector: 'edit-department',
    templateUrl: './edit-department.component.html',
    styleUrls: ['./edit-department.component.scss']
  })
export class EditDepartmentComponent implements OnInit{
  constructor(
    public dialogbox: MatDialogRef<EditDepartmentComponent>,
    private _snackBar: MatSnackBar,
    public service: DepartmentService) {}

  ngOnInit() {
  }


  onClose() {
    this.dialogbox.close()
    this.service.filter('Register click')
  }

  onSubmit(form: NgForm) {
    this.service.updateDepartment(form.value).subscribe(res => {
      this._snackBar.open('Department updated Successfully.', '', {
        duration: 3000
      })
    })
  }
}
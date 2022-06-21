import { DepartmentService } from './../../../services/department-service';
import { Component, OnInit } from "@angular/core";
import { MatDialogRef, MatSnackBar } from "@angular/material";
import { NgForm } from '@angular/forms';

@Component({
    selector: 'add-department',
    templateUrl: './add-department.component.html',
    styleUrls: ['./add-department.component.scss']
  })
export class AddDepartmentComponent implements OnInit{
  constructor(
    public dialogbox: MatDialogRef<AddDepartmentComponent>,
    private _snackBar: MatSnackBar,
    public service: DepartmentService) {}

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      id: '',
      name: '',
      description: '',
      location: '',
      company: {
        id: 'cl4lo1rv800705klcz7hhd56s'
      }
    } 
  }

  onClose() {
    this.dialogbox.close()
    this.service.filter('Register click')
  }

  onSubmit(form: NgForm) {
    this.service.addDepartment(form.value).subscribe(res => {
      this.resetForm(form)
      this._snackBar.open('Department added Successfully.', '', {
        duration: 3000
      })
    })
  }
}
import { EmployeeService } from './../../../services/employee-service';
import { Component, OnInit } from "@angular/core";
import { MatDialogRef, MatSnackBar } from "@angular/material";
import { NgForm } from '@angular/forms';

interface dropDown {
  id: string;
  name: string;
}

@Component({
    selector: 'add-department',
    templateUrl: './add-employee.component.html',
    styleUrls: ['./add-employee.component.scss']
  })
export class AddEmployeeComponent implements OnInit{

  public deptListItems: Array<dropDown> = []

  constructor(
    public dialogbox: MatDialogRef<AddEmployeeComponent>,
    private _snackBar: MatSnackBar,
    public service: EmployeeService) {}

  ngOnInit() {
    this.resetForm();
    this.dropdownRefreash();
  }

  dropdownRefreash() {
    this.service.getDeptDropDown().subscribe(data => {
      data.forEach(element => {
        this.deptListItems.push({
          id: element["id"],
          name: element["name"]
        });
      });
    })
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      id: '',
      name: '',
      email_address: '',
      doj: new Date,
      department: {
        id: '',
        name: ''
      }
    } 
  }

  onClose() {
    this.dialogbox.close()
    this.service.filter('Register click')
  }

  onSubmit(form: NgForm) {
    this.service.addEmployee(form.value).subscribe(res => {
      this.resetForm(form)
      this._snackBar.open('Employee added Successfully.', '', {
        duration: 3000
      })
    }, error => {
      error = error.error.error;
      this._snackBar.open(error, '', {
        duration: 3000
      })
    })
  }
}
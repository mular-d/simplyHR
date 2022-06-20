import { Component, OnInit } from "@angular/core";
import { MatDialogRef, MatSnackBar } from "@angular/material";
import { FormControl, NgForm, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/dashboard/services/employee-service';

interface dropDown {
  id: string;
  name: string;
}

@Component({
    selector: 'edit-employee',
    templateUrl: './edit-employee.component.html',
    styleUrls: ['./edit-employee.component.scss']
  })
export class EditEmployeeComponent implements OnInit{
  public deptListItems: Array<dropDown> = [];
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ])

  constructor(
    public dialogbox: MatDialogRef<EditEmployeeComponent>,
    private _snackBar: MatSnackBar,
    public service: EmployeeService) {}

  ngOnInit() {
    this.dropdownRefreash()
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


  onClose() {
    this.dialogbox.close()
    this.service.filter('Register click')
  }

  onSubmit(form: NgForm) {
    console.log(form.value)
    this.service.updateEmployee(form.value).subscribe(res => {
      this._snackBar.open('Employee updated Successfully.', '', {
        duration: 3000
      })
    })
  }
}
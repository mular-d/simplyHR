import { JobService } from './../../../services/job-service';
import { Component, OnInit } from "@angular/core";
import { MatDialogRef, MatSnackBar } from "@angular/material";
import { NgForm } from '@angular/forms';

interface dropDown {
  id: string;
  name: string;
}

@Component({
    selector: 'add-department',
    templateUrl: './add-job.component.html',
    styleUrls: ['./add-job.component.scss']
  })
export class AddJobComponent implements OnInit{

  public deptListItems: Array<dropDown> = []

  constructor(
    public dialogbox: MatDialogRef<AddJobComponent>,
    private _snackBar: MatSnackBar,
    public service: JobService) {}

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
      title: '',
      role: '',
      description: '',
      skill: '',
      salary: 0,
      final_date: new Date,
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
    this.service.addJob(form.value).subscribe(res => {
      this.resetForm(form)
      this._snackBar.open('Job added Successfully.', '', {
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
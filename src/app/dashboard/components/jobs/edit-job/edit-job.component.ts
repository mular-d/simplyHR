import { JobService } from './../../../services/job-service';
import { Component, OnInit } from "@angular/core";
import { MatDialogRef, MatSnackBar } from "@angular/material";
import { NgForm } from '@angular/forms';

interface dropDown {
  id: string;
  name: string;
}

@Component({
    selector: 'edit-employee',
    templateUrl: './edit-job.component.html',
    styleUrls: ['./edit-job.component.scss']
  })
export class EditJobComponent implements OnInit{
  public deptListItems: Array<dropDown> = [];

  constructor(
    public dialogbox: MatDialogRef<EditJobComponent>,
    private _snackBar: MatSnackBar,
    public service: JobService) {}

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
    this.service.updateJob(form.value).subscribe(res => {
      this._snackBar.open('Job updated Successfully.', '', {
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
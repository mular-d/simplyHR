import { EditJobComponent } from './edit-job/edit-job.component';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AddJobComponent } from './add-job/add-job.component';
import { Job } from './../../models/job-model';
import { JobService } from './../../services/job-service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'jobs-list',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  displayedColumns: string[] = ['Title', 'Role', 'Skill', 'Expire Date', 'Options'];
  jobList = new MatTableDataSource<Job>();
  empty: boolean = false

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.jobList.paginator = this.paginator;
    this.refreashDeptList()
  }

  constructor(
    private service: JobService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {
      this.service.listen().subscribe((m: any) => {
        this.refreashDeptList();
      })
    }

  refreashDeptList() {
    this.service.getJobsList().subscribe(data => {
      this.jobList = new MatTableDataSource(data)
      if (data.length == 0){
        this.empty = true
      }
    })
  }

  onEdit(row: Job) {
    this.service.formData = row;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%"
    this.dialog.open(EditJobComponent, dialogConfig)
  }

  onDelete(id: string) {
    if (confirm('Are you sure to delete?')) {
      this.service.removeJob(id).subscribe(res => {
        this.refreashDeptList();
        this.snackBar.open("Job Deleted Successfully.", '', {
          duration: 3000
        })
      })
    }
  }

  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddJobComponent, dialogConfig);
  }
}

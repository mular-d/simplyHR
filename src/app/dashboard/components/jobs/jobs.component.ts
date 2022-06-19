import { Job } from './../../models/job-model';
import { JobService } from './../../services/job-service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material';

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

  constructor(private service: JobService) {}

  refreashDeptList() {
    this.service.getJobsList().subscribe(data => {
      this.jobList = new MatTableDataSource(data)
      if (data.length == 0){
        this.empty = true
      }
    })
  }

  onEdit(row: Job) {
    console.log(row)
  }

  onDelete(id: string) {
    console.log(id)
  }
}

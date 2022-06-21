import { NgForm, Validators } from '@angular/forms';
import { Candidate } from './../../models/candidate-model';
import { CandidateService } from './../../services/candidate-service';
import { MatSnackBar } from '@angular/material';
import { Job } from './../../models/job-model';
import { JobService } from './../../services/job-service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit {
  jobId: string;
  job: Job

  constructor(
    private route: ActivatedRoute,
    public jobService: JobService,
    public candidateService: CandidateService,
    private snackBar: MatSnackBar) { }

  candidateForm = new FormGroup({
    id: new FormControl(''),
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    email_address: new FormControl('', [Validators.required, Validators.email]),
    edu_level: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    region: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.getJobInfo()
  }

  getJobInfo() {
    this.route.params.subscribe((params: Params) => {
      this.jobId = params.id;
    })

    this.jobService.getSingleJob(this.jobId).subscribe(data => {
      this.job = data[0]
      this.candidateForm.patchValue({
        id: this.job.id
      })

    }, error => {
      this.snackBar.open("Job doesn't exist or expired.", '', {
        duration: 3000
      })
    })
  }

  onAdd(){

    this.candidateService.addCandidate(this.candidateForm.value).subscribe(data => {
      this.snackBar.open("You have Successfully Applied for the job.", '', {
        duration: 3000
      })
    }, error => {
      this.snackBar.open("Couldn't apply for the job.", '', {
        duration: 3000
      })
    })
  }

}


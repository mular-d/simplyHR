import { EmployeeService } from './../../services/employee-service';
import { Employee } from './../../models/employee-model';
import { MatSnackBar } from '@angular/material';
import { CandidateService } from './../../services/candidate-service';
import { Candidate } from './../../models/candidate-model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'candidates-list',
  templateUrl: 'candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {

  displayedColumns: string[] = ['Name', 'Email', 'Edu. Level', 'Address', 'Job Title', 'Options'];
  candidateList = new MatTableDataSource<Candidate>();
  empty: boolean = false

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.candidateList.paginator = this.paginator;
    this.refreashCanditateList()
  }

  constructor( 
    private service: CandidateService,
    private empService: EmployeeService,
    private snackBar: MatSnackBar) {}

  refreashCanditateList() {
    this.service.getCandidateList().subscribe(data => {
      this.candidateList = new MatTableDataSource(data)
      if (data.length == 0){
        this.empty = true
      }
    })
  }

  onEdit(row: Candidate) {
    const employee = new Employee()
    employee.name = row.fname + ' ' + row.lname
    employee.email_address = row.email_address
    employee.doj = new Date
    employee.deptId = row.job.department.id

    this.empService.addEmployee(employee).subscribe(res => {
      this.snackBar.open('You have hired successfully.', '', {
        duration: 3000
      })
      this.service.removeCandidate(row.id).subscribe(res => {})
      this.refreashCanditateList()
    }, error => {
      error = error.error.error;
      this.snackBar.open(error, '', {
        duration: 3000
      })
    })
  }

  onDelete(id: string) {
    if (confirm('Are you sure to delete the candidate?')) {
      this.service.removeCandidate(id).subscribe(res => {
        this.refreashCanditateList();
        this.snackBar.open('Candidate Deleted Successfully.', '', {
          duration: 3000
        })
      })
    }
  }

}

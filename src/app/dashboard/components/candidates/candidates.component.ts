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

  displayedColumns: string[] = ['Name', 'Email', 'Edu. Level', 'Address', 'Options'];
  candidateList = new MatTableDataSource<Candidate>();
  empty: boolean = false

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.candidateList.paginator = this.paginator;
    this.refreashDeptList()
  }

  constructor(private service: CandidateService) {}

  refreashDeptList() {
    this.service.getCandidateList().subscribe(data => {
      this.candidateList = new MatTableDataSource(data)
      if (data.length == 0){
        console.log(data)
        this.empty = true
      }
    })
  }

  onEdit(row: Candidate) {
    console.log(row)
  }

  onDelete(id: string) {
    console.log(id)
  }

}

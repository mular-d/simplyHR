import { DepartmentService } from './../../services/department-service';
import { Department } from './../../models/department-model';

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'departments-list',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {
  displayedColumns: string[] = ['Title', 'Description', 'Location', 'Options'];
  deptList = new MatTableDataSource<Department>();
  empty: boolean = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.deptList.paginator = this.paginator;
    this.refreashDeptList()
  }

  constructor(private service: DepartmentService) {}

  refreashDeptList() {
    this.service.getDeptList().subscribe(data => {
      this.deptList = new MatTableDataSource(data)
      if (data.length == 0){
        this.empty = true
      }
    })
  }

  onEdit(row: Department) {
    console.log(row)
  }

  onDelete(id: string) {
    console.log(id)
  }

}

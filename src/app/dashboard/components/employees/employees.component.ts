import { EmployeeService } from './../../services/employee-service';
import { Employee } from './../../models/employee-model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'employees-list',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Email', 'Date Joined', 'Department', 'Options'];
  empList = new MatTableDataSource<Employee>();
  empty: boolean = false

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.empList.paginator = this.paginator;
    this.refreashEmpList()
  }

  constructor(private service: EmployeeService) {}

  refreashEmpList() {
    this.service.getEmployeesList().subscribe(data => {
      this.empList = new MatTableDataSource(data)
      if (data.length == 0) {
        this.empty = true
      }
    })
  }

  onEdit(row: Employee) {
    console.log(row)
  }

  onDelete(id: string) {
    console.log(id)
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Student } from './models/Student';
import { GetDataService } from './services/get-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  observable$!: Observable<Student[]>;
  promesa$!: Promise<Student[]>;
  subscription!: Subscription;

  filterObservable: string = "2B";
  filterPromesa: string = "3A";
  students: Student[] = [];

  constructor(private data: GetDataService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();    
  }

  ngOnInit(): void {

    this.subscription = this.data.getStudents()
      .subscribe(
        (students: Student[]) => {
          this.students = students;
        },
        (error) => {
          console.log('Error al cargar los estudiantes:', error);
        }
      );

    this.observable$ = this.data.getStudentsByCourse(this.filterObservable);
    this.promesa$ = this.data.getStudentsByCourseAsync(this.filterPromesa);
  }
}

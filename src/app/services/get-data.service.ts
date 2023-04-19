import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/Student';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  readonly url = '../../assets/data/json/students.json';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<any> {
    return this.http.get(this.url);
  }

  getStudentsByCourse(course: string): Observable<Student[]> {
    return this.http.get<Student[]>(this.url).pipe(
      map((students: Student[]) => students.filter((e: Student) => e.course === course))
    );
  }

  getStudentsByCourseAsync(course: string): Promise<Student[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Student[]>(this.url).toPromise()
        .then(students => {
            resolve(students?.filter((e: Student) => e.course === course) ?? []);
        })
        .catch((error: any) => reject(error));
    });
  }
  
  
}

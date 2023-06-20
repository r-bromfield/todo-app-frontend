import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Todo from '../models/Todo';
import { Observable } from 'rxjs';
import MessageResponse from '../models/MessageResponse';



@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private baseURL = `${environment.apiURL}/todo`

  constructor(private httpClient: HttpClient) { }

  public getAllTodo(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(`${this.baseURL}`);
  }

  public getTodoById(id: string): Observable<Todo> {
    return this.httpClient.get<Todo>(`${this.baseURL}/${id}`);
  }

  public createTodo(todo: any) {
    return this.httpClient.post<MessageResponse>(`${this.baseURL}`, todo);
  }

  public updateTodo(todo: any) {
    return this.httpClient.put<MessageResponse>(`${this.baseURL}/${todo?.id}`, todo);
  }

  public deleteTodo(id: string) {
    return this.httpClient.delete<MessageResponse>(`${this.baseURL}/${id}`);
  }
}

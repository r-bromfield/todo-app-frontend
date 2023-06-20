import { Component, inject, OnInit } from '@angular/core';
import { RefresherCustomEvent, SearchbarCustomEvent, ToastController } from '@ionic/angular';

import { TodoService } from '../../services/todo.service';
import Todo from 'src/app/models/Todo';
import Status from 'src/app/models/status';
import { showToast } from 'src/app/utils/helpers';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  todoList: Todo[] = []
  filteredTodoList: Todo[] = []
  options = Object.values(Status)

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getList()
  }

  refresh(event: Event) {
    this.getList(event)
  }

  private getList(event?: Event) {
    this.todoService.getAllTodo().subscribe({
      next: (res) => {
        this.todoList = res;
        this.filteredTodoList = this.todoList
      },
      error: (err) => console.error(err),
      complete: () => (event as RefresherCustomEvent)?.detail.complete()
    })
  }


  handleSearch(event: Event) {
    const searchTerm = (event as SearchbarCustomEvent).detail?.value?.toLowerCase();
    this.filter(searchTerm)
  }

  handleStatusFilter(status?: Status) {
    this.filter(status, true)
  }


  /**
   * Filters the list base on the value provided 
   * @param searchTerm 
   */
  private filter(searchTerm?: string, statusFilter?: boolean) {
    if (searchTerm && !statusFilter) {
      this.filteredTodoList = this.todoList.filter(todo => `${todo.name} ${todo.description}`.toLowerCase().includes(searchTerm.toLowerCase()));
    } else if (searchTerm && statusFilter) {
      this.filteredTodoList = this.todoList.filter(todo => todo.status == searchTerm)
    } else {
      this.filteredTodoList = this.todoList
    }

  }




}

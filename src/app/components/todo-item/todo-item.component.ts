import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import Todo from 'src/app/models/Todo';
import Status from 'src/app/models/status';
import { TodoService } from 'src/app/services/todo.service';
import { showToast } from 'src/app/utils/helpers';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  todoItem?: Todo
  options?: { color: 'warning' | 'success', label: string, icon:string }
  @Output() refresh:EventEmitter<Event> = new EventEmitter();



  constructor(private todoService: TodoService, private toastController: ToastController) { }

  @Input() set todo(todo: Todo) {
    this.todoItem = todo;
    this.options = this.isComplete(todo.status) ? 
    { color: 'warning', label: Status.INCOMPLETE, icon: 'close-circle-outline' }:
    { color: 'success', label: Status.COMPLETE, icon:'checkmark-circle-outline' }
  }

  isComplete(status: Status) {
    return status === Status.COMPLETE
  }

  toggleStatus(payload:Todo) {
    
    this.todoService.updateTodo({...payload, status: this.options?.label}).subscribe({
      next: (res) => {
        this.refresh.emit()
        showToast(this.toastController, {
          message: res?.message,
          color: 'success'
        })
      },
      error: (err) => {
        console.error(err)
        showToast(this.toastController, {
          message: err.error?.message ?? 'An error occurred while updating todo',
          color: 'danger'
        })

      }
    })
  }

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id).subscribe({
      next: (res) => {
        this.refresh.emit()
        showToast(this.toastController, {
          message: res?.message,
          color: 'success'
        })
      },
      error: (err) => {
        console.error(err)
        showToast(this.toastController, {
          message: err.error?.message ?? 'An error occurred while updating todo',
          color: 'danger'
        })

      }
    })
  }




}

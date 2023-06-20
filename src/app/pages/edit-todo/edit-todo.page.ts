import { Component } from '@angular/core';
import { TodoService } from './../../services/todo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, ToastOptions } from '@ionic/angular';
import Status from 'src/app/models/status';
import { showToast } from 'src/app/utils/helpers';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.page.html',
  styleUrls: ['./edit-todo.page.scss'],
})
export class EditTodoPage {

  isEditMode: boolean = false;
  lastModified?: string | null
  options = Object.values<Status>(Status)
  title: string = `${this.isEditMode ? 'Edit' : 'Create'} Todo`
  datePipe = new DatePipe('en-US')

  form = new FormGroup({
    id: new FormControl<string | null>(null),
    name: new FormControl<string | null>(null, Validators.required),
    status: new FormControl<Status>(Status.INCOMPLETE, Validators.required),
    description: new FormControl<string | null>(null)
  })

  constructor(private todoService: TodoService, private activatedRoute: ActivatedRoute, private router: Router, private toastController: ToastController) {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    console.log(id);

    if (id && id != 'new') {
      this.todoService.getTodoById(id).subscribe({
        next: (res) => {
          this.form.patchValue({
            id: res.id ?? null,
            name: res.name ?? null,
            description: res.description ?? null,
            status: res.status ?? null

          })
          this.lastModified = formatDate(res.updatedAt!, 'MMM dd, yyyy hh:mm a', 'en-US')
          console.log(this.lastModified);
          
        },
        error: (err) => console.error(err),
      })
    }

    this.form.get('id')?.statusChanges.subscribe(value => {
      if (value) {
        this.isEditMode = true
      } else {
        this.isEditMode = false
      }

      this.title = `${this.isEditMode ? 'Edit' : 'Create'} Todo`

    })

  }


  counterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  handleSubmit() {

    const payload = { ...this.form.value }
    console.log(this.form)

    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else if (this.isEditMode) {

      this.todoService.updateTodo(payload).subscribe({
        next: (res) => {
          showToast(this.toastController, {
            message: res?.message,
            color: 'success'
          })
          this.router.navigateByUrl('home')
        },
        error: (err) => {
          console.error(err)
          showToast(this.toastController, {
            message: err.error?.message ?? 'An error occurred while updating todo',
            color: 'danger'
          })

        }
      })
    } else {
      this.todoService.createTodo(payload).subscribe({
        next: (res) => {
          showToast(this.toastController, {
            message: res?.message,
            color: 'success'
          })
          this.router.navigateByUrl('home')

        },
        error: (err) => {
          console.error(err)
          showToast(this.toastController, {
            message: err.error?.message ?? 'An error occurred while saving todo',
            color: 'danger'

          })

        }
      })
    }

  }


}

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TodoItemComponent } from "./todo-item/todo-item.component";
import { RouterModule } from "@angular/router";


@NgModule({
    imports: [CommonModule, IonicModule, RouterModule],
    declarations: [TodoItemComponent],
    exports: [TodoItemComponent]
})
export class SharedComponentsModule { }
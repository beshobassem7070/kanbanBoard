import { Component } from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { AddTodoTaskComponent } from '../../components/add-todo-task/add-todo-task.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { TaskService } from '../../services/task.service';
import { AddInprogressTaskComponent } from '../../components/add-inprogress-task/add-inprogress-task.component';
import { AddDoneTaskComponent } from '../../components/add-done-task/add-done-task.component';
import { ToastrService } from 'ngx-toastr';
import { TaskDetailsComponent } from '../../components/task-details/task-details.component';
import { CustomizationComponent } from '../../components/customization/customization.component';
import { CustomizationService } from '../../services/customization.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  currentUser: any;
  todoList: any;
  inProgressList: any;
  doneList: any;
  taskMovedId: any;
  todoTitle: any = 'To do';
  inprogressTitle: any = 'In Progress';
  doneTitle: any = 'Done';
  todoColor: any = '#DD9F2C';
  inprogressColor: any = '#2C47DD';
  doneColor: any = '#2CDD85';
  sectionTitle: any;

  constructor(
    private dialog: MatDialog,
    private auth: AuthService,
    private user: UserService,
    private task: TaskService,
    private toastr: ToastrService,
    private customization: CustomizationService
  ) {}

  ngOnInit() {
    this.auth.user.subscribe((user) => {
      console.log(user);
      if (user) {
        this.auth.userId = user.uid;
        this.getUser(user.uid);
        this.loadData(user.uid);
      }
    });
  }

  getUser(id: any) {
    console.log('user id', id);

    this.user.getUser(id).subscribe((res) => {
      console.log('user', res);
      this.currentUser = {
        id: res.payload.id,
        ...(res.payload.data() as Record<string, unknown>),
      };
      console.log('this.currentUser ', this.currentUser);
    });
  }

  async loadData(id: any) {
    await this.todoTasksList(id);
    await this.inprogressTasksList();
    this.doneTasksList();
    this.getColumnTitle(id);
  }

  getColumnTitle(id: any) {
    this.customization.getColumnsTitle(id).subscribe((res) => {
      this.sectionTitle = res.map((el) => {
        return {
          id: el.payload.doc.id,
          ...(el.payload.doc.data() as Record<string, unknown>),
        };
      });
      this.sectionTitle = this.sectionTitle[0];
      console.log('sectionTitle', this.sectionTitle);
      if (this.sectionTitle == null || this.sectionTitle.length == 0) {
        this.setColumnTitle(id);
      }
      // this.backgroundColor(this.sectionTitle.todoColor, 'to-do');
    });
  }
  todoTasksList(id: any) {
    this.task.getTodoTasksList(id).subscribe((res) => {
      this.todoList = res.map((el) => {
        return {
          id: el.payload.doc.id,
          ...(el.payload.doc.data() as Record<string, unknown>),
        };
      });
      console.log('todo list', this.todoList);
    });
  }

  inprogressTasksList() {
    this.task.getInprogressTasksList().subscribe((res) => {
      this.inProgressList = res.map((el) => {
        return {
          id: el.payload.doc.id,
          ...(el.payload.doc.data() as Record<string, unknown>),
        };
      });
      console.log('todo list', this.todoList);
    });
  }

  doneTasksList() {
    this.task.getDoneTasksList().subscribe((res) => {
      this.doneList = res.map((el) => {
        return {
          id: el.payload.doc.id,
          ...(el.payload.doc.data() as Record<string, unknown>),
        };
      });
      console.log('todo list', this.todoList);
    });
  }

  deleteTask(id: any, phase: any) {
    this.task
      .deleteTask(id, phase)
      .then(() => {
        this.toastr.success('Your Task delete Succesfully', 'Success!');
      })
      .catch((err) => {
        this.toastr.error('Something went Wrong', 'Opps!');
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log('event', event);
    console.log('current', event.container.id[event.container.id.length - 1]);
    console.log(
      'previousContainer',
      event.previousContainer.id[event.previousContainer.id.length - 1]
    );
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    let id = event.container.data[event.currentIndex][<any>'id'];
    let currentPhase = event.container.id[event.container.id.length - 1];
    let previousPhase =
      event.previousContainer.id[event.previousContainer.id.length - 1];
    if (currentPhase == '0') {
      let task = this.todoList.find((el: any) => el.id == id);
      console.log('task', task);
      this.taskMovedId = task.id;
      delete task.id;
      this.task.addNewTodoTask({ ...task, status: 'Todo' });
    }
    if (currentPhase == '1') {
      var task = this.inProgressList.find((el: any) => el.id == id);
      console.log('task', task);
      this.taskMovedId = task.id;
      delete task.id;
      this.task.addNewInprogressTask({ ...task, status: 'Inprogress' });
    }
    if (currentPhase == '2') {
      var task = this.doneList.find((el: any) => el.id == id);
      console.log('task', task);
      this.taskMovedId = task.id;
      delete task.id;
      this.task.addNewDoneTask({ ...task, status: 'Done' });
    }
    // //////////////////////////////////////////////////
    if (previousPhase == '0') {
      // let task = this.todoList.find((el: any) => el.id == id);
      console.log('task', this.taskMovedId);
      this.task.deleteTask(this.taskMovedId, 'todoTasks');
    }
    if (previousPhase == '1') {
      console.log('this.inProgressList', this.inProgressList);

      // let task = this.inProgressList.find((el: any) => el.id == id);
      console.log('task', this.taskMovedId);
      this.task.deleteTask(this.taskMovedId, 'inprogressTasks');
    }
    if (previousPhase == '2') {
      // let task = this.doneList.find((el: any) => el.id == id);
      console.log('task', this.taskMovedId);
      this.task.deleteTask(this.taskMovedId, 'doneTasks');
    }
  }

  addTodoList(item?: any) {
    let create = this.dialog.open(AddTodoTaskComponent, {
      width: '80%',
      maxWidth: '600px',
      maxHeight: '80vh',
      data: item
        ? {
            TaskDetails: item,
          }
        : null,
    });
  }

  addInprogressList(item?: any) {
    let create = this.dialog.open(AddInprogressTaskComponent, {
      width: '80%',
      maxWidth: '600px',
      maxHeight: '80vh',
      data: item
        ? {
            TaskDetails: item,
          }
        : null,
    });
  }

  addDoneList(item?: any) {
    let create = this.dialog.open(AddDoneTaskComponent, {
      width: '80%',
      maxWidth: '600px',
      maxHeight: '80vh',
      data: item
        ? {
            TaskDetails: item,
          }
        : null,
    });
  }

  taskDetails(item: any, color: any) {
    let create = this.dialog.open(TaskDetailsComponent, {
      width: '80%',
      maxWidth: '600px',
      maxHeight: '80vh',
      data: {
        TaskDetails: item,
        color: color,
      },
    });
  }

  setColumnTitle(id: any) {
    this.customization.addColumnTitle(id, {
      todoTitle: this.todoTitle,
      todoColor: this.todoColor,
      inprogressTitle: this.inprogressTitle,
      inprogressColor: this.inprogressColor,
      doneTitle: this.doneTitle,
      doneColor: this.doneColor,
    });
  }

  editColumnTitle(section: any, title: any, color: any, id: any) {
    let create = this.dialog.open(CustomizationComponent, {
      width: '80%',
      maxWidth: '600px',
      maxHeight: '80vh',
      data: {
        section: section,
        title: title,
        color: color,
        id: id,
      },
    });
  }

  backgroundColor(color: any) {
    let hexToRgbValue = hexToRgb(color);
    let r = hexToRgbValue[0];
    let g = hexToRgbValue[1];
    let b = hexToRgbValue[2];
    return `rgba(${r},${g},${b}, 20%)`;
  }
}

function hexToRgb(hex: any) {
  return hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (r: any, g: any, b: any) => '#' + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)
    .map((x: any) => parseInt(x, 16));
}

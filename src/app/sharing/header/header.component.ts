import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { TaskService } from '../../services/task.service';
import { CustomizationService } from '../../services/customization.service';
import { TaskDetailsComponent } from '../../components/task-details/task-details.component';
import { MatDialog } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isUser: boolean = false;
  currentUser: any;
  imageSrc: any = null;
  todoList: any;
  inProgressList: any;
  taskisNotDone: any;
  approachingTasks: any;
  sectionTitle: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private fireAuth: AngularFireAuth,
    private user: UserService,
    private task: TaskService,
    private customization: CustomizationService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    console.log('this.fireAuth.currentUser', this.fireAuth);

    this.auth.user.subscribe((user) => {
      console.log(user);
      if (user) {
        this.isUser = true;
        this.auth.userId = user.uid;
        this.getUser(user.uid);
        this.loadData(user.uid);
      } else {
        this.isUser = false;
        this.auth.userId = '';
      }
    });
  }

  async loadData(id: any) {
    await this.todoTasksList(id);
    await this.inprogressTasksList();
    this.getColumnTitle(id);
  }

  getUser(id: any) {
    console.log('user iddddddd', id);

    this.user.getUser(id).subscribe((res) => {
      console.log('user iddd', res);
      this.currentUser = {
        id: res.payload.id,
        ...(res.payload.data() as Record<string, unknown>),
      };
      this.imageSrc = this.currentUser.profilePic;
      console.log('this.currentUser ', this.currentUser);
    });
  }

  logout() {
    this.auth.logout().then(() => {
      window.location.reload();
      this.router.navigate(['/']);
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
      this.taskisNotDone = [...this.todoList, ...this.inProgressList];
      console.log('taskisNotDone', this.taskisNotDone);
      this.notification(this.taskisNotDone);
    });
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
      // this.backgroundColor(this.sectionTitle.todoColor, 'to-do');
    });
  }
  notification(tasks: any) {
    this.approachingTasks = tasks.filter((el: any) => {
      return this.calculateDiff(el.dueDate) == 1;
    });
    console.log('approachingTasks', this.approachingTasks);
  }
  calculateDiff(dateSent: any) {
    let currentDate = new Date();
    dateSent = new Date(dateSent);
    let number = Math.floor(
      (Date.UTC(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      ) -
        Date.UTC(
          dateSent.getFullYear(),
          dateSent.getMonth(),
          dateSent.getDate()
        )) /
        (1000 * 60 * 60 * 24)
    );
    return Math.abs(number);
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
}

function addOneDay(date = new Date()) {
  date.setDate(date.getDate() + 1);

  return date;
}

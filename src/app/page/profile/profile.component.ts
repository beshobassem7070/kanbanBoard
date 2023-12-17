import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Location } from '@angular/common';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  currentUser: any;
  userId: any;
  imageSrc: any = null;
  todoList: any;
  inProgressList: any;
  doneList: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private user: UserService,
    private location: Location,
    private task: TaskService
  ) {}

  ngOnInit() {
    this.auth.user.subscribe((user) => {
      console.log(user);
      if (user) {
        this.userId = user.uid;
        this.getUser(user.uid);
        this.loadData(this.userId);
      }
    });
  }
  loadData(id: any) {
    // setTimeout(() => {
    this.todoTasksList(id);
    this.inprogressTasksList();
    this.doneTasksList();
    // }, 1000);
  }

  getUser(id: any) {
    this.user.getUser(id).subscribe((res) => {
      console.log('user', res);
      this.currentUser = {
        id: res.payload.id,
        ...(res.payload.data() as Record<string, unknown>),
      };
      this.imageSrc = this.currentUser.profilePic;
      console.log('this.currentUser ', this.currentUser);
    });
  }
  readURL(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result);
      reader.readAsDataURL(file);
      this.user.addProfilePic(file, this.userId);
    }
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

  goBack() {
    this.location.back();
  }
}

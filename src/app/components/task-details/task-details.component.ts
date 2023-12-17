import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from '../../services/task.service';
export interface DialogData {
  TaskDetails: any;
  color: any;
}
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',
})
export class TaskDetailsComponent {
  title: any;
  note: any;
  dueDate: any;
  status: any;
  taskMovedId: any;
  color: any;

  constructor(
    public dialogRef: MatDialogRef<TaskDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private task: TaskService,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    console.log('this.data', this.data);
    if (this.data) {
      this.title = this.data.TaskDetails.title;
      this.note = this.data.TaskDetails.note;
      this.dueDate = this.data.TaskDetails.dueDate;
      this.status = this.data.TaskDetails.status;
      this.color = this.data.color;
    }
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

  complateTask() {
    this.taskMovedId = this.data.TaskDetails.id;
    delete this.data.TaskDetails.id;
    this.task.addNewDoneTask({ ...this.data.TaskDetails, status: 'Done' });
    this.toastr.success('Your Task Moved Succesfully', 'Success!');
    this.dialogRef.close();
    if (this.data.TaskDetails.status == 'Todo') {
      this.task.deleteTask(this.taskMovedId, 'todoTasks');
    }
    if (this.data.TaskDetails.status == 'Inprogress') {
      this.task.deleteTask(this.taskMovedId, 'inprogressTasks');
    }
  }

  cancel() {
    this.dialogRef.close();
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

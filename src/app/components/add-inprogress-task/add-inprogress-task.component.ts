import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from '../../services/task.service';
export interface DialogData {
  TaskDetails: any;
}

@Component({
  selector: 'app-add-inprogress-task',
  templateUrl: './add-inprogress-task.component.html',
  styleUrl: './add-inprogress-task.component.scss',
})
export class AddInprogressTaskComponent implements OnInit {
  title: any;
  note: any;
  dueDate: any;
  constructor(
    public dialogRef: MatDialogRef<AddInprogressTaskComponent>,
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
    }
  }
  create(form: any) {
    if (this.validateDate()) {
      let data = { ...form.value, status: 'Inprogress' };
      console.log('data', data);
      if (this.data) {
        this.task
          .editInprogressTask(this.data.TaskDetails.id, data)
          .then(() => {
            this.toastr.success('Your Task Edit Succesfully', 'Success!');
            this.dialogRef.close();
          })
          .catch((err) => {
            this.toastr.error('Something Went Wrong', 'Opps!');
          });
      } else {
        this.task
          .addNewInprogressTask(data)
          .then(() => {
            this.toastr.success('Your Task Add Succesfully', 'Success!');
            this.dialogRef.close();
          })
          .catch((err) => {
            this.toastr.error('Something Went Wrong', 'Opps!');
          });
      }
    }
  }

  validateDate() {
    const currentDate = new Date();
    const inputDate = new Date(this.dueDate);

    if (inputDate < currentDate) {
      // Reset the selectedDate value to an empty string
      this.dueDate = null;
      this.toastr.error('Please select valid date', 'Opps!');
      return false;
    } else {
      return true;
    }
  }
  cancel() {
    this.dialogRef.close();
  }
}

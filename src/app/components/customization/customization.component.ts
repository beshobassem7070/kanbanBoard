import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomizationService } from '../../services/customization.service';
import { ToastrService } from 'ngx-toastr';
export interface DialogData {
  section: any;
  title: any;
  color: any;
  id: any;
}
@Component({
  selector: 'app-customization',
  templateUrl: './customization.component.html',
  styleUrl: './customization.component.scss',
})
export class CustomizationComponent implements OnInit {
  title: any;
  backgroundColor = ['#E4572E', '#DD9F2C', '#2CDD85', '#2C47DD', '#0F7173'];
  highlihtColorSelected: any;
  constructor(
    public dialogRef: MatDialogRef<CustomizationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private customization: CustomizationService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    console.log('dataaaa', this.data);

    this.title = this.data.title;
    this.highlihtColorSelected = this.data.color;
  }
  create(form: any) {
    // console.log('data', data);

    if (this.data.section == 'todoTitle') {
      let data = {
        todoTitle: form.value.title,
        todoColor: this.highlihtColorSelected,
      };
      this.customization
        .editTodoColumnsTitle(data, this.data.id)
        .then(() => {
          this.toastr.success('Your Title Edit Succesfully', 'Success!');
          this.dialogRef.close();
        })
        .catch((err) => {
          this.toastr.error('Something Went Wrong', 'Opps!');
        });
    }
    if (this.data.section == 'inprogressTitle') {
      let data = {
        inprogressTitle: form.value.title,
        inprogressColor: this.highlihtColorSelected,
      };
      this.customization
        .editInprogressColumnsTitle(data, this.data.id)
        .then(() => {
          this.toastr.success('Your Title Edit Succesfully', 'Success!');
          this.dialogRef.close();
        })
        .catch((err) => {
          this.toastr.error('Something Went Wrong', 'Opps!');
        });
    }
    if (this.data.section == 'doneTitle') {
      let data = {
        doneTitle: form.value.title,
        doneColor: this.highlihtColorSelected,
      };
      this.customization
        .editDoneColumnsTitle(data, this.data.id)
        .then(() => {
          this.toastr.success('Your Title Edit Succesfully', 'Success!');
          this.dialogRef.close();
        })
        .catch((err) => {
          this.toastr.error('Something Went Wrong', 'Opps!');
        });
    }
  }

  selectBackgroundColor(color: any) {
    this.highlihtColorSelected = color;
  }
  cancel() {
    this.dialogRef.close();
  }
}

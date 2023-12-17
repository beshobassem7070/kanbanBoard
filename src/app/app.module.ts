import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './auth/register/register.component';
import { MatchPassDirective } from './helper/match-pass.directive';
import { HeaderComponent } from './sharing/header/header.component';
import { LoginComponent } from './auth/login/login.component';
// import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
// import { getAuth, provideAuth } from '@angular/fire/auth';
// import { getFirestore, provideFirestore } from '@angular/fire/firestore';
// import { getDatabase, provideDatabase } from '@angular/fire/database';
// import { getStorage, provideStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { AddTodoTaskComponent } from './components/add-todo-task/add-todo-task.component';
import { AddInprogressTaskComponent } from './components/add-inprogress-task/add-inprogress-task.component';
import { AddDoneTaskComponent } from './components/add-done-task/add-done-task.component';
import { ProfileComponent } from './page/profile/profile.component';
import { MatMenuModule } from '@angular/material/menu';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { CustomizationComponent } from './components/customization/customization.component';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    MatchPassDirective,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    AddTodoTaskComponent,
    AddInprogressTaskComponent,
    AddDoneTaskComponent,
    ProfileComponent,
    TaskDetailsComponent,
    CustomizationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatCardModule,
    MatSlideToggleModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    DragDropModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyAX3sVVB-P17SD_Lw42K0p5dssRQdNTqek',
      authDomain: 'kanban-board-700ab.firebaseapp.com',
      projectId: 'kanban-board-700ab',
      storageBucket: 'kanban-board-700ab.appspot.com',
      messagingSenderId: '197846127433',
      appId: '1:197846127433:web:e392adc2ef758a5580c098',
      databaseURL:
        'https://kanban-board-700ab-default-rtdb.asia-southeast1.firebasedatabase.app',
    }),
    AngularFireAuthModule,
    // AngularFirestoreModule,
    // provideFirebaseApp(() =>
    //   initializeApp({
    //     projectId: 'kanban-board-700ab',
    //     appId: '1:197846127433:web:e392adc2ef758a5580c098',
    //     databaseURL:
    //       'https://kanban-board-700ab-default-rtdb.asia-southeast1.firebasedatabase.app',
    //     storageBucket: 'kanban-board-700ab.appspot.com',
    //     apiKey: 'AIzaSyAX3sVVB-P17SD_Lw42K0p5dssRQdNTqek',
    //     authDomain: 'kanban-board-700ab.firebaseapp.com',
    //     messagingSenderId: '197846127433',
    //   })
    // ),
    // provideAuth(() => getAuth()),
    // provideFirestore(() => getFirestore()),
    // provideDatabase(() => getDatabase()),
    // provideStorage(() => getStorage()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

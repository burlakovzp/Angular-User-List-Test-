import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/users.component';
import { Page404Component } from './page404/page404.component';
import { ApiService } from './api.service';


const appRoutes: Routes = [
  { path: '', component: UsersComponent },
  { path: '**', component: Page404Component }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UsersComponent,
    Page404Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    FormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

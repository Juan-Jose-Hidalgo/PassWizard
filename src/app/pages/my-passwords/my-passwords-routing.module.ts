import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyPasswordsComponent } from './my-passwords.component';

const routes: Routes = [
  { path: '', component: MyPasswordsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPasswordsRoutingModule { }
import {MatTableModule} from '@angular/material/table';

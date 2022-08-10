import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LocalStorageRefService } from './services/local-storage-ref.service';
import { LocalStorageService } from './services/local-storage.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  providers: [
    LocalStorageRefService,
    LocalStorageService,
  ],
  imports: [
    RouterModule
  ],
  exports: [
    RouterModule,
    NavbarComponent
  ]
})
export class SharedModule { }

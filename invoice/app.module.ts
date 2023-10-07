import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstCompoComponent } from './first-compo/first-compo.component';
import { MyserviceService } from './myservice.service';
import { MyPipePipe } from './my-pipe.pipe';
import { StudentComponent } from './student/student.component';
import { StudentdetailsComponent } from './studentdetails/studentdetails.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { InvoiceComponent } from './invoice/invoice.component';

@NgModule({
  declarations: [
    AppComponent,
    FirstCompoComponent,
    MyPipePipe,
    StudentComponent,
    StudentdetailsComponent,
    PagenotfoundComponent,
    InvoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,     
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MyserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

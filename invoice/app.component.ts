import { Component} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  invData: any;
  getInvoiceData(invoiceData: any) {
    this.invData = invoiceData;
  }

}

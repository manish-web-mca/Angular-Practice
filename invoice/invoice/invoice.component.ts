import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms' 

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  productForm: FormGroup;
  @Output() saveInvoice = new EventEmitter<any>();
  sampleFormData = {
    "subtotal": "180",
    "totalTax": "40",
    "grandTotal": "180",
    "invoices": [
        {
            "productName": "Item 1",
            "quantity": "5",
            "rate": "9",
            "saleTax": "10",
            "total": 45
        },
        {
          "productName": "Item 2",
          "quantity": "5",
          "rate": "9",
          "saleTax": "10",
          "total": 45
      },
      {
        "productName": "Item 3",
        "quantity": "5",
        "rate": "9",
        "saleTax": "10",
        "total": 45
    },
    {
      "productName": "Item 4",
      "quantity": "5",
      "rate": "9",
      "saleTax": "10",
      "total": 45
    }
    ]
};

  constructor(private fb:FormBuilder) { 
    this.productForm = this.fb.group({ 
      subtotal: '',
      totalTax: '',
      grandTotal: '',
      invoices: this.fb.array([]) ,  
    })

  }

  invoices() : FormArray {  
    return this.productForm.get("invoices") as FormArray  
  }  

  newInvoice(): FormGroup {  
    return this.fb.group({  
      productName: '', 
      quantity: '',
      rate: '',
      saleTax: '',
      total: '',  
    })  
  }  

  rebuildForm() {
    this.productForm.setValue(this.sampleFormData);    
  }

  ngOnInit(): void {
    if(this.sampleFormData.invoices.length > 0) {
      this.sampleFormData.invoices.forEach(() => {
        this.addInvoice();
      })
    } else {
      this.addInvoice();
    }  
   
   this.rebuildForm();   
  }

  

  onSubmit() {  
    this.saveInvoice.emit(this.productForm.value);
    //console.log(this.productForm.value);  
  } 

  addInvoice() {  
    this.invoices().push(this.newInvoice());  
  }  
     
  removeInvoice(i:number) {  
    this.invoices().removeAt(i);  
    this.calGrandTotal();
  } 

  calTotal(item: any, index: number) {
    console.log(item.value);
    let rate: number = item.value.rate == '' ? 0 :item.value.rate; 
    let quantity: number = item.value.quantity == '' ? 0 :item.value.quantity; 
    let saleTax: number = item.value.saleTax == '' ? 0 :item.value.saleTax; 
    let total: number = item.value.total == '' ? 0 :item.value.total; 
    let saletaxAmount: number = 0;
    if(saleTax > 0) {
      saletaxAmount = ((rate * quantity) * saleTax) / 100;
    }
   
    
    item.patchValue({'total' : (rate * quantity) + saletaxAmount});
    this.calGrandTotal();
   
  }

  calGrandTotal() {
    console.log(this.productForm.value);
    let totalItem = this.productForm.value.invoices;
    let tot = 0;
    let saleTax = 0;
    console.log('sdfds', totalItem);
    totalItem.forEach((item: any) => {
      tot += item.total;
      saleTax += item.saleTax;
    });
    this.productForm.patchValue({'subtotal': tot, 'totalTax': saleTax, 'grandTotal': tot});
  }

}

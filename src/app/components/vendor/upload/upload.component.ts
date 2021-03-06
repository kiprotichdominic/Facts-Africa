import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/_services/invoice/invoice.service';
import { FormGroup, FormControl ,Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ViewbuyersService } from 'src/app/_services/buyers/viewbuyers.service';
import { Invoice } from 'src/app/_models/invoice';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  submitted = false;
  invoice = Invoice;
  buyers =  []

  uploadForm = new FormGroup({
    buyer_id: new FormControl(),
    invoice_amount: new FormControl('',[Validators.required]),
    due_date: new FormControl()
 });

  constructor(private viewbuyersService:ViewbuyersService, 
    private flashMessage: FlashMessagesService,
    private httpClient: HttpClient,private router: Router,) {}
  ngOnInit() {
    this.viewbuyersService.getBuyers().subscribe( res => {
      this.buyers = res
    }, error => console.log(error))
  }
  // convenience getter for easy access to form fields
  get f() { return this.uploadForm.controls; }
    postInvoice(){
    this.submitted = true;
    if (this.uploadForm.invalid) {
      return;
  }
    console.log(this.uploadForm.value)
    this.httpClient.post(`${environment.apiUrl}/invoice`, this.uploadForm.value,{
    }).subscribe(result => {
      console.log( result );
  });
  this.flashMessage.show('Invoice Uploaded Succesfully!', { cssClass: 'alert-success mt-3', timeout: 2000 });
  this.router.navigate(['/invoice']);
  }
  onSubmit() { this.submitted = true; }
  isShown: boolean = false ; // hidden by default


toggleShow() {

this.isShown = ! this.isShown;

}
}

import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PaymentDetails } from '../paymentdetails';
import { PaymentService } from './pay-form.service';
declare var $: any;
@Component({
  selector: 'app-pay-form',
  templateUrl: './pay-form.component.html',
  styleUrls: ['./pay-form.component.css'],
})
export class PayFormComponent implements OnInit {
  params;
  constructor(private paymentService: PaymentService) {
    this.params = paymentService.paramsObj;
  }
  cardTypes = ['Visa', 'Mastercard'];
  expMonths = this.paymentService.getMonths();

  expYears = this.paymentService.getYears();
  formModel = new PaymentDetails(null, null, null, null, null, null, null);
  submitted = false;
  isClient(clientId) {
    return this.params.clientId == clientId;
  }

  ngOnInit() {}
  onSubmit() {
    let body = `name=${this.formModel.Name}&card_type=${this.formModel.CardType}&PAN=${this.formModel.CardNo}&cresecure_cc_expires_month=${this.formModel.ExpMn}&cresecure_cc_expires_year=${this.formModel.ExpYr}&cv_data=${this.formModel.CVCNo}`;
    this.paymentService.postTransForm(body, this.params.sid, this.params.t);
    this.submitted = true;
  }

  showFormControls(form: any) {
    return form && form.controls.name && form.controls.name.value;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
declare var $: any;
@Injectable({ providedIn: 'root' })
export class PaymentService {
  paramsObj: any = new Object();
  paramsStr: any;
  uID: any;
  constructor(private http: HttpClient) {
    this.getParams();
    //this.initPayment();
  }
  getMonths() {
    let a = [];
    for (let i = 1; i < 13; i++) a.push(i);
    return a;
  }
  getYears() {
    let currYr = new Date().getFullYear();
    let a = [];
    for (let i = currYr; i < currYr + 32; i++) a.push(i);
    return a;
  }
  getParams(): Observable<any> {
    var loc = window.location.toString();
    this.paramsStr = loc.indexOf('?') > -1 ? loc.split('?')[1] : null;
    if (this.paramsStr) {
      var qStrParts = this.paramsStr.split('&');
      for (let i = 0; i < qStrParts.length; i++) {
        var qStrNV = qStrParts[i].split('=');
        this.paramsObj[qStrNV[0]] = qStrNV[1];
      }
    }
    console.log('responseObject===>', this.paramsObj);
    return <any>this.paramsObj;
  }

  initPayment(): Observable<any> {
    //initPayment should be a server api that returns uID
    //minimum orderID, sessionID and amount needs to be passed
    const urlGetFrmSrcInit = `https://www.chasepaymentechhostedpay-var.com/direct/services/request/init/?hostedSecureID=cpt539987889165SB&hostedSecureAPIToken=32233e10f949b6d1c21520f9d96ff7ae&sessionId=abcd123456&action=buildForm&amount=1.0&orderId=12&content_template_url=https://bipi-mo.github.io/content_template.html&return_url=https://bipi-mo.github.io/return.html&cancel_url=https://bipi-mo.github.io/cancel.html`;
    //`https://www.chasepaymentechhostedpay-var.com/direct/services/request/init/?hostedSecureID=cpt539987889165SB&hostedSecureAPIToken=32233e10f949b6d1c21520f9d96ff7ae&sessionId=abcd123456&action=buildForm&amount=1.0&${this.paramsObject.orderId}`;
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    fetch(proxyUrl + urlGetFrmSrcInit)
      .then((response) => response.text())
      .then((contents) => {
        this.uID = contents.slice(4);
        console.log('uID====>', this.uID);
        this.initForm();
      })
      .catch((e) => {
        console.log('error====>', e);
        console.log(
          'Can’t access ' +
            proxyUrl +
            urlGetFrmSrcInit +
            ' response. Blocked by browser?'
        );
        return <any>e;
      });
    return <any>this.uID;
  }

  initForm() {
    //this can also be part of the above "initPayment" api call returning only the form 'action' url back if its the same domain
    let body = 'uID=' + this.uID + '&submit=' + 'Submit';
    let head = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    $(function () {
      //$('.submit').click(function () {
      $.ajax({
        type: 'POST',
        url:
          'https://www.chasepaymentechhostedpay-var.com/securepayments/a1/cc_collection.php',
        headers: head,
        data: body,
        error: function (e) {
          console.log('error====>', e);
        },
        success: function (response) {
          console.log('response=======>', response);
        }, // this was missing
      });
      return false;
    });
    //});
  }
  postTransForm(body, sid, t) {
    //let body = 'uID=' + this.uID + '&submit=' + 'Submit';
    let head = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    $(function () {
      //$('.submit').click(function () {
      $.ajax({
        type: 'POST',
        url: `https://safe.chasepaymentechhostedpay-var.com/securepayments/a1/cc_collection.php?sid=${sid}&action=process&t=${t}`,
        headers: head,
        data: body,
        error: function (e) {
          console.log('error====>', e);
        },
        success: function (response) {
          console.log('response=======>', response);
        }, // this was missing
      });
      return false;
    });
    //});
  }
}

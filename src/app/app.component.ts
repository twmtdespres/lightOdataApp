import { Component, OnInit } from '@angular/core';
import { ODataService } from './odata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  title = 'lightOdataApp';
  response: any;

  constructor(private oDataservice: ODataService) {}

  ngOnInit() {
    // const TestServiceURL = '/test/V2/Northwind/Northwind.svc/$metadata';
    // const client = OData.New({
    //   metadataUri: TestServiceURL,
    //   // variant: "c4c"
    //   fetchProxy: customProxy,
    // });
    // // GET /Customers?$format=json&$filter=Phone eq '030-0074321'
    // const filter = client.newFilter().property('Phone').eqString('030-0074321');
    // const result = await client.newRequest({
    //   // ODataRequest object
    //   collection: 'Customers', // collection name
    //   params: client.newParam().filter(filter), // odata param
    // });
    // const serviceURL = '/api/sap/opu/odata/sap/SEPMRA_PROD_MAN/$metadata';
    // const oDataClient = OData.New({
    //   metadataUri: serviceURL,
    //   fetchProxy: customProxy,
    // });
    // const result = await oDataClient.newRequest({
    //   collection: 'I_Currency',
    //   params: oDataClient.newParam().skip(10).top(20),
    // });
    // console.log(result);
  }

  async getCurrencies() {
    this.response = await this.oDataservice.getCurrencies();
  }
  async getCurrency() {
    this.response = await this.oDataservice.getCurrency('EUR');
  }
}

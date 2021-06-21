import { Injectable } from '@angular/core';
import { OData, FetchProxy } from '@odata/client';
//import { RequestInit } from 'node-fetch';
import attempt from '@newdash/newdash/attempt';
import startsWith from '@newdash/newdash/startsWith';

interface I_Currency {
  Currency: string;
  Currency_Text: string;
  Decimals: Number;
  // CurrencyISOCode: string;
  // AlternativeCurrencyKey: string;
  // IsPrimaryCurrencyForISOCrcy: Boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ODataService {
  serviceURL: string;
  token: string;
  customProxy: FetchProxy;
  oDataClient: OData;

  constructor() {
    this.token = '#####'; //Bearer Token
    this.serviceURL = '/api/sap/opu/odata/sap/SEPMRA_PROD_MAN/$metadata';

    //Custom proxy => add Token
    this.customProxy = async (url: string, init?: any) => {
      if (!init.headers.Authorization && this.token) {
        //init.headers = { ...init.headers, ...{ Authorization: `Bearer ${token}` } };
        init.headers.Authorization = `Bearer ${this.token}`;
      }
      const res: any = await fetch(url, init);
      let content: any = await res.text();
      if (
        res.headers.has('Content-Type') &&
        startsWith(res.headers.get('Content-Type'), 'application/json')
      ) {
        const jsonResult = attempt(JSON.parse, content);
        // supress error
        if (!(jsonResult instanceof Error)) {
          content = jsonResult;
        }
      }
      return {
        content,
        response: res,
      };
    };

    this.oDataClient = OData.New({
      metadataUri: this.serviceURL,
      fetchProxy: this.customProxy,
    });
  }

  getCurrencies() {
    return this.oDataClient.newRequest({
      collection: 'I_Currency',
      params: this.oDataClient.newParam(),
    });
  }

  getCurrency(currency: string) {
    // return this.oDataClient.newRequest({
    //   collection: 'I_Currency',
    //   params: this.oDataClient
    //     .newParam()
    //     //.filter(this.oDataClient.newFilter().property('Currency').eq(currency)),
    //     .filter(
    //       this.oDataClient.newFilter().field('Currency').eqString(currency)
    //     ),
    // });
    const entity = this.oDataClient.getEntitySet<I_Currency>('I_Currency');
    return entity.find({ Currency: currency });
  }
}

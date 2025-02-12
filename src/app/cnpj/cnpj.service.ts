import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CnpjService {

  constructor(private http: HttpClient) {}

  consultaCNPJ(cnpj: string) {
    if (cnpj !== '') {
      const validaCNPJ = /^[0-9]{14}$/;
      if (validaCNPJ.test(cnpj)) {
        return this.http.get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
      }
    }
    return of({});
  }
}

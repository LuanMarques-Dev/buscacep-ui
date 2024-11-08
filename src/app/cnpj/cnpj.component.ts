import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { CnpjService } from './cnpj.service';

@Component({
  selector: 'app-cnpj',
  templateUrl: './cnpj.component.html',
  styleUrls: ['./cnpj.component.css']
})
export class CnpjComponent implements OnInit {
  @Input() titleHome = 'Consultando CNPJ';
  buscacnpj: string = '';
  buscar: boolean = false;

  constructor(
    private cnpjService: CnpjService,
    private messageService: MessageService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Buscando CNPJ');
  }

  buscarCNPJ(buscacnpj: any, form: any) {
    if (buscacnpj !== null && buscacnpj !== '' && buscacnpj.length >= 14) {
      this.cnpjService.consultaCNPJ(buscacnpj).subscribe({
        next: (dados: any) => {
          this.buscar = true;
          setTimeout(() => {
            this.populaCNPJForm(dados, form);
          }, 100);
        },
        error: (e: any) => {
          this.resetaCNPJForm(form);
          this.buscar = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Atenção',
            detail: 'Erro ao buscar CNPJ!'
          });
        }
      });
    }
  }

  populaCNPJForm(dados: any, formulario: any) {
    console.log('dados do CNPJ recebidos:', dados);
    formulario.form.patchValue({
      cnpj: dados.cnpj,
      razaoSocial: dados.razao_social,
      nomeFantasia: dados.nome_fantasia,
      porte: dados.porte,
      uf: dados.uf,
      municipio: dados.municipio,
      bairro: dados.bairro,
      logradouro: dados.logradouro,
      numero: dados.numero,
      cep: dados.cep,
    });
  }

  resetaCNPJForm(formulario: any) {
    formulario.form.patchValue({
      cnpj: null,
      razaoSocial: null,
      nomeFantasia: null,
      porte: null,
      uf: null,
      municipio: null,
      bairro: null,
      logradouro: null,
      numero: null,
      cep: null
    });
    this.buscar = false;
  }
}

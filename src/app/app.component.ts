import { Component, OnInit } from '@angular/core';
import { ApiService, UserService } from 'projects/dev-kit/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent implements OnInit {
  constructor(private api: ApiService, private user: UserService) {}

  ngOnInit() {
    this.user.set({
      name: 'Devel',
      email: 'devel@email.com'
    });

    this.user.setCookie('arandomstring');

    const options = [{ id: 254, name: 'Pokemon', url: '/pokemon' }];

    this.user.setMenu(options);
    this.api.options = options;
    this.api.methods = {
      comercial: {
        loja: {
           existeCnpj: {
              url: 'http://192.168.7.37:9001/api/loja-existe/:cnpj',
              method: 'get'
           },
           buscarCnpj: {
              url: 'http://192.168.7.37:9001/api/loja-cnpj/:cnpj',
              method: 'get'
           },
           alterar: {
              url: 'http://192.168.7.37:9001/api/loja/:id',
              method: 'put'
           },
           cadastrar: {
              url: 'http://192.168.7.37:9001/api/loja',
              method: 'post'
           },
           buscar: {
              url: 'http://192.168.7.37:9001/api/loja/:id',
              method: 'get'
           },
           selecionar: {
              url: 'http://192.168.7.37:9001/api/loja',
              method: 'get'
           }
        },
        uf: {
           dropdown: {
              url: 'http://192.168.7.37:9001/api/uf-dropdown',
              method: 'get'
           }
        },
      }
    };

    this.api.use('comercial', 'loja', 'selecionar').subscribe();
  }
}

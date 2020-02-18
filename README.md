# SMN Dev Kit 🔨

Alguns serviços e funções para os projetos feitos pela SMN.

## Getting Started

Primeiro, você precisa instalar o a biblioteca no seu projeto:    
```bash
 npm i --save @smn-official/angular-dev-kit
```
Depois vamos importar o módulo no projeto:
```ts
import { 
  DevKitModule, 
  ApiServiceConfig, 
  UserServiceConfig
} from '@smn-official/angular-dev-kit';

const apiConfig: ApiServiceConfig = {
  id: 'id',
  url: 'url',
  headers: {
	authorization: 'Authentication',
	option: 'Option'
  }
};

const userConfig: UserServiceConfig = {
  cookiePrefix: environment.prefix
}; 

@NgModule({
  ...
  imports: [
    ...
    DevKitModule.forRoot(apiConfig, userConfig)
  ],
  ...
});
export  class  AppModule { }
```
**Note:** Deve existir somente uma importação do módulo no projeto, recomendamos que a importação seja feita no módulo principal da aplicação (app.module.ts).

No código acima temos dois parâmetros para o módulo, vamos entende-los:

O primeiro parâmetro é referente a configuração do ApiService:

| Argumento | Função | Tipo |Valor default |
|--|--|--|--|
| id | Nome do atributo do id opção | string | 'id'
| url| Nome do atributo da url da opção | string | 'url'
| headers | Objeto com os nomes dos headers que são colocados automaticamente nas requisições | ApiServiceConfigHeader |
| headers.authorization | Nome do header para autenticação com o sistema | string | 'Authorization'
| headers.option | Nome do header para o id da opção | string | 'Option'

E o segundo serve para configurar a o UserService:
| Argumento | Função | Tipo |Valor default |
|--|--|--|--|
| cookiePrefix| Prefixo para os cookies salvos automaticamente pelo serviço | string | null


Pronto, feito isso podemos conhecer as features disponíveis:

## Features

 - Api service
 - User service
 - Base class
 - Exception filter

### Api Service
Serviço para gerenciar as requisições, onde coloca automaticamente headers de autenticação e trata os retornos da API. Vamos explorar os métodos disponíveis:

***Note:*** Lembre-se de injetar o ApiService nos providers do seu módulo, recomendamos que seja em um módulo que seja reutilizável (shared.module.ts);

#### GET

Um exemplo simples:
```ts
this.api
  .get('https://suaapi.com/')
  .subscribe();
```

Agora se quisermos passar algum parâmetro ou alguma query string é só passar no segundo parâmetro do método:
```ts
this.api
  .get('https://suaapi.com/:id', { id: 8465618, lines: 10, page: 1 })
  .subscribe();
```
A url que seria chamada ficaria como esta: 

> https://suaapi.com/8465618?lines=10&page=1

Note, que o parâmetro id foi preenchido como parte da url enquanto aos outros foram colocados como query string, isso porque passamos :id, quando o ApiService lê essa url faz o replace desse identificador com o valor que foi passado nos parâmetros.

#### POST

O post funciona um pouco diferente do GET,  passamos parâmetros e o body para a requisição:
```ts
this.api
  .post('https://suaapi.com/:id/produto/novo', { 
    id: 8465618, 
    name: 'Mi Band 4', 
    price: 140.00 
  })
  .subscribe();
```

Nossa request ficaria com o id na url e o restante no body da requisição.

#### PUT

Funciona igualmente o POST:
```ts
this.api
  .put('https://suaapi.com/:id/produto/:idProduto', { 
    id: 8465618,
    idProduto: 1,
    name: 'Mi Band 4', 
    price: 129.90 
  })
  .subscribe();
```

Aqui teremos o id e o idProduto na url.

#### DELETE

Já o DELETE funciona parecido com o GET a diferença que ele não tem query string, somente parâmetros:
```ts
this.api
  .delete('https://suaapi.com/:id/produto/:idProduto', { 
    id: 8465618,
    idProduto: 1
  })
  .subscribe();
```

#### USE

Para usar esse método precisamos de algumas configurações, primeiro precisaremos passar as configurações para o ApiService:

```ts
this.api.methods = {
  api: {
    funcionalidade: {
	  metodo: {
	    url: 'https://suaapi.com/',
		metodo: 'GET'
	  }
	}
  }
}
```
A ideia é que esse objeto seja retornado pelo back-end, depois só chamar o método ***use***
```ts
 this.api
   .use('api', 'funcionalidade', 'metodo', { 
     id: 8465618,
     idProduto: 1
   })
   .subscribe();
```
E teremos o seguinte request:

> https://suaapi.com/id=8465618&idProduto=1

Esse método é genérico e funciona para todas request (get, post, put e delete).

### User Service
Em breve.

### Base class
Em breve.

### Base class
Exception filter.

## Licença
MIT.

**Feito com  ❤️  pelos Devs da  [SMN](http://smn.com.br/)**

import { Component, OnInit } from '@angular/core';
import { ApiService } from 'projects/dev-kit/src/public-api';
import { finalize } from 'rxjs/internal/operators';
import { query } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent implements OnInit {
  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.call()
  }

  call() {
    // const request = this.api.httpClient.get('https://pokeapi.co/api/v2/').pipe(
    //   finalize(() => console.log('buscou'))
    // );
    // const request = this.api.http('GET', 'https://pokeapi.co/api/v2/').call();

    // request.subscribe(res => {
    //   console.log('SUCCESS', res);
    // }, () => {
    //   // console.log('error')
    // }, () => {
    //   // console.log('complete');
    // })

    this.api
        .get('https://pokeapi.co/api/v2/ability', null, { headers: { AnotherHeader: 'prova!' } })
        .subscribe(res => (console.log(res)))
  }
}

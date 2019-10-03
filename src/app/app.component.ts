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

    this.user.setMenu([{ id: 1, name: 'Home', url: '/' }]);

    this.api.options = [{ id: 1, name: 'Home', url: '/' }];

    this.call();
  }

  call() {
    this.api
      .get(
        'https://pokeapi.co/api/v2/ability',
        { offset: 0, limit: 50 },
        { headers: { AnotherHeader: 'prova!', Option: '1' } }
      )
      .subscribe(res => console.log(res));
  }
}

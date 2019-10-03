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
  }
}

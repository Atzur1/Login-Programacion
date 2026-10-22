import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  imports: [LoginComponent],
  template: '<app-login />',
})
export class App {}

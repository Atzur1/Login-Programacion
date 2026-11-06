import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { InventarioComponent } from './inventario/inventario.component';

@Component({
  selector: 'app-root',
  imports: [LoginComponent, InventarioComponent],
  template: `
    <app-login />
    <app-inventario />
  `,
})
export class App {}

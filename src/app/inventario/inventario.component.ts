import { Component, computed, effect, signal } from '@angular/core';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}

@Component({
  selector: 'app-inventario',
  standalone: true,
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css',
})
export class InventarioComponent {
  productos = signal<Producto[]>([
    { id: 1, nombre: 'Laptop', precio: 1200, stock: 5 },
    { id: 2, nombre: 'Monitor', precio: 300, stock: 12 },
    { id: 3, nombre: 'Teclado', precio: 50, stock: 30 },
  ]);

  filtro = signal('');

  productosFiltrados = computed(() => {
    return this.productos().filter(p =>
      p.nombre.toLowerCase().includes(this.filtro().toLowerCase())
    );
  });

  valorTotalInventario = computed(() => {
    return this.productos().reduce(
      (acc, item) => acc + (item.precio * item.stock),
      0
    );
  });

  constructor() {
    effect(() => {
      const cantidad = this.productos().length;
      localStorage.setItem('cantidad_productos', JSON.stringify(cantidad));
    });
  }

  reducirStock(productoId: number, cantidad: number) {
    this.productos.update(productos =>
      productos.map(p =>
        p.id === productoId
          ? { ...p, stock: p.stock - cantidad }
          : p
      )
    );
  }
}

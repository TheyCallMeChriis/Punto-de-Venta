import { Component, inject,AfterViewInit} from '@angular/core';
import { TipoCliente } from '../../shared/models/interfaces';
import { ClienteServices } from '../../shared/services/cliente-services';

@Component({
  selector: 'app-cliente',
  imports: [],
  templateUrl: './cliente.html',
  styleUrl: './cliente.css'
})
export class Cliente implements AfterViewInit{
  private readonly clienteSrv= inject(ClienteServices);
  datos: any;

  filtrar(filtro: any){
    this.clienteSrv.filtrar(filtro).subscribe({
      next: (data) => console.log(data),
      error: (err) => console.error(err)
    });

  }
  ngAfterViewInit(): void {
      this.filtrar({idCliente: '', nombre: '', apellido1: '', apellido2: ''});
  }
}

import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { TipoCliente } from '../../shared/models/interfaces';
import { ClienteServices } from '../../shared/services/cliente-services';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { FrmCliente } from '../forms/frm-cliente/frm-cliente';

@Component({
  selector: 'app-cliente',
  imports: [MatCardModule, MatTableModule, MatIconModule],
  templateUrl: './cliente.html',
  styleUrl: './cliente.css',
})
export class Cliente implements AfterViewInit {
  private readonly clienteSrv = inject(ClienteServices);

  private readonly dialogo = inject(MatDialog);

  columnas: string[] = [
    'idCliente',
    'nombre',
    'apellido1',
    'apellido2',
    'celular',
    'correo',
    'botonera',
  ];
  // datos : any;

  //dataSourceX = new MatTableDataSource<TipoCliente>();

  dataSource = signal(new MatTableDataSource<TipoCliente>());

  mostrarDialogo(titulo: string, datos?: TipoCliente) {
    const dialogoRef = this.dialogo.open(FrmCliente, {
      width: '50vw',
      maxWidth: '35rem',
      data: {
        title: titulo,
        datos: datos,
      },
      disableClose: true,
    });
  }
  filtrar(filtro: {}) {
    this.clienteSrv.filtrar(filtro).subscribe({
      next: (data) => {
        console.log(data);
        this.dataSource.set(data);
      },
      error: (err) => console.log(err),
    });
  }
  onNuevo() {
    this.mostrarDialogo('Nuevo Cliente');
  }
  onEditar(id: number) {
    alert(id);
  }
  onEliminar(id: number) {}
  onInfo(id: number) {}
  onResetearPassw(id: number) {}
  ngAfterViewInit(): void {
    this.filtrar({ idCliente: '', nombre: '', apellido1: '', apellido2: '' });
  }
}

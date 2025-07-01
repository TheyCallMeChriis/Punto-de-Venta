import { AfterViewInit, Component, inject, signal, ViewChild, viewChild } from '@angular/core';
import { ClienteService } from '../../shared/services/cliente-service';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { TipoCliente } from '../../shared/models/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { FrmCliente } from '../forms/frm-cliente/frm-cliente';
import { DialogoGeneral } from '../forms/dialogo-general/dialogo-general';
import { UsuarioService } from '../../shared/services/usuario-service';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../shared/services/auth-service';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule,MatExpansionModule, MatPaginatorModule,MatFormFieldModule,
     MatInputModule, MatButtonModule],
  templateUrl: './cliente.html',
  styleUrl: './cliente.css'
})
export class Cliente implements AfterViewInit {
  private readonly clienteSrv = inject(ClienteService);
  private readonly dialogo = inject(MatDialog);
  private readonly usuarioSrv = inject(UsuarioService);
  
  
  public readonly srvAuth = inject(AuthService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  panelOpenState = signal(false);
  columnas: string[] = ['idCliente', 'nombre', 'apellido1', 'apellido2', 'celular', 'correo', 'botonera'];
  dataSource = signal(new MatTableDataSource<TipoCliente>());
  filtro: any;

  mostrarDialogo(titulo: string, datos?: TipoCliente) {
    const dialogoRef = this.dialogo.open(FrmCliente, {
      width: '50vw',
      maxWidth: '35rem',
      data: { title: titulo, datos: datos },
      disableClose: true
    });

    dialogoRef.afterClosed().subscribe({
      next: (res) => {
        if (res !== false) {
          this.resetearFiltro();
        }
      },
      error: (err) => { console.log(err); }
    });
  }

  resetearFiltro() {
    this.filtro = { idCliente: '', nombre: '', apellido1: '', apellido2: '' };
    this.filtrar();
  }

  filtrar() {
    this.clienteSrv.filtrar(this.filtro).subscribe({
      next: (data) => {
        this.dataSource.set(data);
      },
      error: (err) => console.log(err)
    });
  }

  limpiar(){
    this.resetearFiltro();
    (document.querySelector('#fidUsuario') as HTMLInputElement).value = '';
        (document.querySelector('#fnombre') as HTMLInputElement).value = '';
            (document.querySelector('#fapellido1') as HTMLInputElement).value = '';
                (document.querySelector('#fapellido2') as HTMLInputElement).value = '';


  }

  onNuevo() {
    this.mostrarDialogo('Nuevo Cliente');
  }

  onEditar(id: number) {
    this.clienteSrv.buscar(id).subscribe({
      next: (data) => {
        this.mostrarDialogo('Editar Cliente', data);
      }
    });
  }

  onEliminar(id: number) {
    const dialogRef = this.dialogo.open(DialogoGeneral, {
      data: {
        texto: '¿Está seguro de eliminar este cliente?',
        icono: 'question_mark',
        textoAceptar: 'Si',
        textoCancelar: 'No',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.clienteSrv.eliminar(id).subscribe({
          next: () => {
            this.dialogo.open(DialogoGeneral, {
              data: {
                texto: 'Cliente eliminado correctamente',
                icono: 'check_circle',
                textoAceptar: 'Aceptar',
              }
            });
            this.resetearFiltro();
          },
          error: (err) => {
            console.error('Error al eliminar cliente', err);
          }
        });
      }
    });
  }

  onInfo(id: number) {
    // Pendiente de implementar
  }
  onFiltroChange(f : any){
  this.filtro = f;
  this.filtrar();
  }

  onResetearPassw(id: number) {
    this.clienteSrv.buscar(id).subscribe({
      next: (data) => {
        const dialogRef = this.dialogo.open(DialogoGeneral, {
          data: {
            texto: `¿Resetear la contraseña de ${data.nombre}?`,
            icono: 'question_mark',
            textoAceptar: 'Si',
            textoCancelar: 'No',
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result === true) {
            this.usuarioSrv.resetearPassw(data.idCliente).subscribe({
              next: () => {
                this.dialogo.open(DialogoGeneral, {
                  data: {
                    texto: 'Contraseña reseteada correctamente',
                    icono: 'check_circle',
                    textoAceptar: 'Aceptar',
                  }
                });
              },
              error: (err) => {
                console.error('Error al resetear la contraseña', err);
              }
            });
          }
        });
      },
      error: (err) => {
        console.error('Error al buscar cliente', err);
      }
    });
  }

  onCerrar(){
  }

  ngAfterViewInit(): void {
    this.filtro = { idCliente: '', nombre: '', apellido1: '', apellido2: '' };
    this.filtrar();
  }
}
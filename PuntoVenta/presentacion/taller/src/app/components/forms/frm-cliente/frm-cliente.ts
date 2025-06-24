import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatFooterRow } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClienteService } from '../../../shared/services/cliente-service';
import { DialogoGeneral } from '../dialogo-general/dialogo-general';

@Component({
  selector: 'app-frm-cliente',
  imports: [MatDialogModule, MatIconModule, MatButtonModule, MatInputModule, ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './frm-cliente.html',
  styleUrl: './frm-cliente.css'
})

export class FrmCliente implements OnInit {
  titulo!: string;
  srvCliente = inject(ClienteService);

  private data = inject(MAT_DIALOG_DATA);
  private readonly dialog = inject(MatDialog);

  private builder = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<FrmCliente>);

  myForm: FormGroup;

  constructor() {
    this.myForm = this.builder.group({
      id: [0],
      idCliente: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(15),
      Validators.pattern('[0-9]*')]],
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30),
      Validators.pattern('([a-zA-ZÑñ]*)( ([a-zA-ZÑñ]*))(0,1)')]],
      apellido1: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30),
      Validators.pattern('([a-zA-ZÑñ]*)')]],
      apellido2: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30),
      Validators.pattern('([a-zA-ZÑñ]*)')]],
      telefono: ['', [Validators.minLength(8), Validators.pattern('[0-9][8]')]],
      celular: ['', [Validators.required, Validators.pattern('[0-9][8]')]],
      direccion: ['', [Validators.minLength(10), Validators.maxLength(255)]],
      correo: ['', [Validators.required, Validators.email]],
    })
  }

  get F() {
    return this.myForm.controls;
  }


  onGuardar() {
    if (this.myForm.value.id === 0) {
      this.srvCliente.guardar(this.myForm.value)
        .subscribe({
          complete: () => {
            this.dialog.open(DialogoGeneral, {
              data: {
                texto: 'Registro creado correctamente',
                icono: 'check',
                textoArea: 'ceptar'
              }
            });
            this.dialogRef.close();
          }
        })
    } else {
      this.srvCliente.guardar(this.myForm.value, this.myForm.value.id)
        ?.subscribe({
          complete: () => {
            this.dialog.open(DialogoGeneral, {
              data: {
                tipo: 1,
                texto: 'CLIENTE MODIFICADO CORRECTAMENTE',
                icono: 'check',
                textoAceptar: 'Aceptar '
              }
            })
          }
        });
      this.dialogRef.close();
    }
  }

  ngOnInit(): void {
    this.titulo = this.data.tittle;
    if (this.data.datos) {
      this.myForm.setValue({
        id: this.data.datos.id,
        idCliente: this.data.datos.idCliente,
        nombre: this.data.datos.nombre,
        apellido: this.data.datos.apellido1,
        apellido2: this.data.datos.apellido2,
        telefono: this.data.datos.telefono,
        celular: this.data.datos.celular,
        direccion: this.data.datos.direccion,
        correo: this.data.datos.correo,
      })
    }
  }

}

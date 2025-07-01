import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {MatFormField, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule,FormBuilder,FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ClienteService } from '../../../shared/services/cliente-service';
import { Dial } from 'flowbite';
import { DialogoGeneral } from '../dialogo-general/dialogo-general';

@Component({
  selector: 'app-frm-cliente',
  imports: [MatDialogModule,MatIconModule,MatInputModule,MatButtonModule,ReactiveFormsModule,MatFormFieldModule],
  templateUrl: './frm-cliente.html',
  styleUrl: './frm-cliente.css'
})
export class FrmCliente implements OnInit {
titulo!: string;
srvCliente = inject(ClienteService);
private data = inject(MAT_DIALOG_DATA);
private readonly dialog= inject(MatDialog);
dialogRef = inject(MatDialogRef<FrmCliente>);

private builder = inject(FormBuilder);
myForm : FormGroup;
constructor(){
  this.myForm=this.builder.group({
    id : [0],
    idCliente: ['', [Validators.required,Validators.minLength(9),Validators.maxLength(15),
Validators.pattern('[0-9]*')]],
    nombre: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(30),
Validators.pattern('([A-Za-zÑnáéíóú]*)( ([A-Za-zÑnáéíóú]*)){0,1}')]],
    apellido1: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(30),
Validators.pattern('([A-Za-zÑnáéíóú]*)')]],
    apellido2: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(30),
Validators.pattern('([A-Za-zÑnáéíóú]*)')]],
    telefono: ['', [Validators.required,Validators.minLength(8),
Validators.pattern('[0-9]{8}')]],
    celular: ['',[Validators.pattern('[0-9]{8}')]],
    direccion: ['',[Validators.maxLength(255),Validators.minLength(10)]],
    correo: ['',[Validators.required,Validators.email]]
  })
}



get F(){
return this.myForm.controls;
}



onGuardar(){
  if(this.myForm.value.id === 0){
    this.srvCliente.guardar(this.myForm.value).subscribe({
    complete: () => {
    this.dialog.open(DialogoGeneral,{
  data: {
    texto: 'Cliente creado correctamente',
    icono: 'check_circle',
    textoAceptar: 'Aceptar',
    
  }

});
this.dialogRef.close();
  }
  })

}else{
  this.srvCliente.guardar(this.myForm.value, this.myForm.value.id)
  ?.subscribe({
complete: () => {
this.dialog.open(DialogoGeneral,{
  data: {
    texto: 'Cliente actualizado correctamente',
    icono: 'check_circle',
    textoAceptar: 'Aceptar',
    
  }

});
this.dialogRef.close();
  }
  })
}
}
ngOnInit(): void {
this.titulo=this.data.title;

console.log(this.data);
  if(this.data.datos){
    this.myForm.setValue({
      id: this.data.datos.id,
      idCliente: this.data.datos.idCliente,
      nombre: this.data.datos.nombre,
      apellido1: this.data.datos.apellido1,
      apellido2: this.data.datos.apellido2,
      telefono: this.data.datos.telefono,
      celular: this.data.datos.celular,
      direccion: this.data.datos.direccion,
      correo: this.data.datos.correo
    });

  }

}
}

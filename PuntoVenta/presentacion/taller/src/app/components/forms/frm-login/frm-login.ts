import { Component, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../../shared/services/auth-service';


@Component({
  selector: 'app-frm-login',
  imports: [MatDialogModule, MatIconModule, MatButtonModule, MatFormFieldModule,
    ReactiveFormsModule, MatInputModule, MatDividerModule],
  templateUrl: './frm-login.html',
  styleUrl: './frm-login.css'
})
export class FrmLogin {
  readonly dialogRef = inject(MatDialogRef<FrmLogin>);
  frmLogin : FormGroup;
  private builder = inject(FormBuilder);
  private srvAuth = inject(AuthService);

  constructor(){
    this.frmLogin = this.builder.group({
      id :[0],
      idUsuario : (''),
      passw : ('')
    });
  }
  onLogin(){
    delete this.frmLogin.value.id;
    this.srvAuth.login(this.frmLogin.value)
    .subscribe((res) =>{
      console.log(res);
    })
  }
}

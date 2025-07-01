import { Component, inject } from '@angular/core';
import { MatDialogModule,MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder,FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../../shared/services/auth-service'; 
@Component({
  selector: 'app-frm-login',
  imports: [MatDialogModule,MatIconModule,MatButtonModule,MatFormFieldModule,ReactiveFormsModule,
  MatInputModule,MatDividerModule],
  templateUrl: './frm-login.html',
  styleUrl: './frm-login.css'
})
export class FrmLogin {
  readonly dialogRef = inject(MatDialogRef<FrmLogin>);
  frmlogin : FormGroup;
  private  builder = inject(FormBuilder);
  private srvAuth =inject(AuthService);
  private errorLogin : boolean= false;


  constructor() {
    this.frmlogin= this.builder.group({
      id: ['0'],
      usuario: [''],
      passw : [''],
    });
  }
  onLogin(){
    delete this.frmlogin.value.id;
    this.srvAuth.login(this.frmlogin.value)
    .subscribe((res) =>{
      this.errorLogin= !res  || res=== 401;
      if(!this.errorLogin){
        this.dialogRef.close();
      }
    })
  }
}

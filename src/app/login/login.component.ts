import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../Classes/usuario'
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  mensagemSucesso: string;
  errors:string[] = [];
  username:string;
  password:string;
  registo: boolean = false;


  constructor(private router: Router, 
    private auth:AuthService) {
   }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.registo){
      this.registarCliente();
      return;
    }

    this.auth.login(this.username, this.password).subscribe(response =>{
      console.log(response)
      const acess_token = JSON.stringify(response)
      localStorage.setItem('access_token',acess_token)  ;
      this.router.navigate(["/home"])
    },errorResponse => {
      console.log(errorResponse)
      this.errors = ["Login incorrecto"]
    }
    )
    
  }

  registar(event){
    event.preventDefault();//assim o click nao tem efeito 
    this.registo = !this.registo;

  }

  registarCliente(){
    const usuario:Usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;


    this.auth.save(usuario).subscribe(
      response =>{
        this.mensagemSucesso = "Cadastro realizado com sucesso!"
        this.errors = null;
        this.registo = false;
      }, error => {
        this.mensagemSucesso = null;
        this.errors = error.error.errors;
      }
    )
  }



}

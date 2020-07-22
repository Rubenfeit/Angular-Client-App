import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/Classes/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes: Cliente[] = [];
  mensagemSucesso: string;
  mensagemErro: string;
  cliente:Cliente;

  constructor(
    private service: ClientesService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.service
    .getClientes()
    .subscribe(
      data => {
        this.clientes = data;
      });
  }

  novoCliente(){
    this.router.navigate(['clientes/form'])
  }

  Edit(id:number){
    this.router.navigate([`clientes/form/${id}`])
  }

  setCliente(c:Cliente){
    this.cliente = c;
    console.log(c);
  }

  Remove(id:number){
    console.log(id);
    this.service.Remove(id).subscribe(
      response => {this.mensagemSucesso = 'Cliente Removido com sucesso'
      this.ngOnInit();
    },
      erro => this.mensagemErro = 'Ocorreu um erro ao remover o cliente'
      );

      

  }

}

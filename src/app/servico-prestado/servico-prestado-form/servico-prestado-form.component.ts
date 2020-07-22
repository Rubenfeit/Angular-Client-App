import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/Classes/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { ServicoPrestado } from '../../Classes/servico-prestado'
import { ServicoPrestadoService } from 'src/app/services/servico-prestado.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente[] = [];
  servico: ServicoPrestado;
  success:boolean=false;
  errors:String[]; 

  constructor(private clienteService : ClientesService, 
    private service: ServicoPrestadoService) { 
    this.servico = new ServicoPrestado();
  }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      data => this.clientes = data
    );
  }

  onSubmit(){
    this.service.save(this.servico)
    .subscribe(data => {
      this.success = true;
      this.errors = null;
      this.servico = new ServicoPrestado();
    }, errorResponse => {
      this.errors = errorResponse.error.errors;
      this.success = false;
    });
  }


}

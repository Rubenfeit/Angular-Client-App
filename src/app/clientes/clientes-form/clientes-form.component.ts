import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../Classes/cliente'
import { ClientesService } from '../../services/clientes.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente:Cliente;
  success:boolean = false;
  errors: String[];

  constructor( private service: ClientesService, private route: ActivatedRoute,
    ) { 
    //this.cliente = service.getCliente();
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    const id: number = +this.route.snapshot.paramMap.get('id');
    if(id != null){
      this.service.getCliente(id).subscribe(
        data => {
          this.cliente = data,
          errorResponse => this.cliente = new Cliente();
          
        }
      )
    }
  }
  
  onSubmit(){
    this.service
    .save(this.cliente)
    .subscribe(data => {

      this.cliente = data;
      this.success = true;
      this.errors = null;

    }, errorResponse => {
      this.errors = errorResponse.error.errors;
      this.success = false;
    });
  }

} 

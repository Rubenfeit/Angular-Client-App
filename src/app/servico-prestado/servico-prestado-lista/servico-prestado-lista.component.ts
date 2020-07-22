import { Component, OnInit } from '@angular/core';
import {ServicoPrestadoSearch} from '../../Classes/servico-prestado-search'
import { ServicoPrestado } from 'src/app/Classes/servico-prestado';
import { ServicoPrestadoService } from 'src/app/services/servico-prestado.service';

@Component({
  selector: 'app-servico-prestado-lista',
  templateUrl: './servico-prestado-lista.component.html',
  styleUrls: ['./servico-prestado-lista.component.css']
})
export class ServicoPrestadoListaComponent implements OnInit {

  constructor(private service: ServicoPrestadoService) { 
    for(let i = 1; i <=12; i++){
      this.meses.push(i)
    }
  }

  name:string;
  mes:number;
  meses: number[]=[];
  lista: ServicoPrestadoSearch[] = [];
  mensagem: string;

  ngOnInit(): void {
  }

  search(){
    this.service.search(this.name, this.mes).subscribe(
      data =>{ 
        this.lista = data
        this.mensagem = null;
        if(this.lista.length <= 0)
          this.mensagem = "Nenhum Registo Encontrado!"
      }
    )}; 

}

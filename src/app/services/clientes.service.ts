import { Injectable } from '@angular/core';
import { Cliente } from '../Classes/cliente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor( private http : HttpClient ) { }

  private base:string = "http://localhost:8080/api/clientes";

  save(cliente: Cliente): Observable<Cliente>{

    return this.http.post<Cliente>(this.base , cliente);
  }

  
  getClientes() : Observable<Cliente[]>{
     return this.http.get<Cliente[]>(this.base);
  }

  getCliente(id:number) : Observable<Cliente>{
    return this.http.get<Cliente>(this.base + `/${id}` );
 }

 edit(cliente: Cliente): Observable<Cliente>{
  return this.http.put<Cliente>(this.base + `/${cliente.id}`, cliente);
}

  Remove(id:number) : Observable<any>{
  return this.http.delete<any>(this.base + `/${id}` );
}

}

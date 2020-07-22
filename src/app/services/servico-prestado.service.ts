import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ServicoPrestado } from '../Classes/servico-prestado';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServicoPrestadoSearch } from '../Classes/servico-prestado-search';

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  
  constructor( private http: HttpClient) {
   }

   apiUrl: string = environment.apiURL + 'servicos-prestados';

   save(servicoPrestado:ServicoPrestado) : Observable<ServicoPrestado>{
     return this.http.post<ServicoPrestado>(this.apiUrl, servicoPrestado);
   }

   search(name:string, mes:number) : Observable<ServicoPrestadoSearch[]>{
    
    if(name != "" && mes >=1 && mes <=12){
    const httpParams = new HttpParams().set("name", name).set("mes", mes.toString());

      const url = this.apiUrl + "?" + httpParams.toString();
      console.log(url);

    return this.http.get<any>(url);
  }

  return this.http.get<any>(this.apiUrl + "/getAll");
   }
}

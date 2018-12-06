import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError, flatMap } from "rxjs/operators";
import { Categoria } from "./categoria.model";
import { element } from "@angular/core/src/render3";

@Injectable({
  providedIn: "root"
})
export class CategoriaService {
  private api = "api/categorias";

  constructor(public http: HttpClient) {}

  public getAll(): Observable<Categoria[]> {
    return this.http.get(this.api).pipe(
      catchError(this.handleError),
      map(this.jsonToCategorias)
    );
  }

  public getById(id: number) {
    return this.http.get(`${this.api}/${id}`).pipe(
      catchError(this.handleError),
      map(this.jsonToCategoria)
    );
  }

  public create(categoria: Categoria) {
    return this.http.post(this.api, categoria).pipe(
      catchError(this.handleError),
      map(this.jsonToCategoria)
    );
  }


  public delete(id: number) {
    return this.http.delete(`${this.api}/${id}`).pipe(
      catchError(this.handleError),
      map(() => 'OK')
    );
  }

  public update(categoria: Categoria) {
    return this.http.put(`${this.api}/${categoria.id}`, categoria).pipe(
      catchError(this.handleError),
      map(this.jsonToCategoria)
    );
  }

  private jsonToCategoria(jsonData: any): Categoria {
    return jsonData as Categoria;
  }
  private handleError(error): Observable<any> {
    console.error('ERRO NA REQUISICAO' + JSON.stringify(error));
    return throwError(error);
  }

  private jsonToCategorias(jsonData: any[]): Categoria[] {
    return jsonData.map(value => value as Categoria);
  }
}

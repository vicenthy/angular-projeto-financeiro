import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../shared/categoria.service';
import { Categoria } from '../shared/categoria.model';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css']
})
export class CategoriaListComponent implements OnInit {

  categorias: Categoria[] = [];
  constructor(public categoriaService: CategoriaService) { }

  ngOnInit() {
      this.getAll();
  }


  getAll() {
    this.categoriaService.getAll().subscribe( result =>
      this.categorias = result,
      error => console.error('ERROR' + error)
    );
  }
  deleteCategoria(id: number) {
    const mustDelete = confirm('Deseja Excluir?');
if(mustDelete){
    this.categoriaService.delete(id)
    .subscribe( () => {
          this.getAll();
      }, error => console.error('ERROR' + error)

    );
    }
  }

}

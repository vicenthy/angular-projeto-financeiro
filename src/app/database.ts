import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Categoria } from './pages/categorias/shared/categoria.model';


export class DataBase implements InMemoryDbService {


  createDb() {
    const categorias: Categoria[] = [
      {id: 1, nome: 'Lazer', descricao: 'descricao lazer'},
      {id: 2, nome: 'Saúde', descricao: 'descricao saude'},
      {id: 3, nome: 'Moradia', descricao: 'descricao lazer moradia'},
      {id: 4, nome: 'Salário', descricao: 'descricao salario'},
      {id: 5, nome: 'Freelas', descricao: 'descricao freelas'},
    ];

    return { categorias };

  }

}

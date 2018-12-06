import { Component, OnInit , AfterContentChecked} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import {ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import * as toastr from 'toastr';

import { Categoria } from '../shared/categoria.model';
import { CategoriaService } from '../shared/categoria.service';


@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit, AfterContentChecked {

currentAction: string;
categoriaForm: FormGroup;
pageTitle: string;
serveErrorMessages: string [];
subnmitterForm = false;
categoria = new Categoria();

  constructor(private categoriaService: CategoriaService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuild: FormBuilder) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buidFormCategoria();
    this.loadCategoria();
  }

  ngAfterContentChecked() {
      this.setPageTitle();
  }


  submitForm() {
    this.subnmitterForm = true;
    if (this.currentAction === 'nova') {
        this.createCategoria();
    } else {
         this.updateCategoria();
    }

  }


  private createCategoria() {
    const categoria = Object.assign(new Categoria(), this.categoriaForm.value);
    this.categoriaService.create(categoria)
        .subscribe(
          result => this.actionForSucess(result),
          error => this.actionForError(error)
         );
  }

  private updateCategoria() {
    const categoria = Object.assign(new Categoria(), this.categoriaForm.value);
    this.categoriaService.update(categoria)
        .subscribe(
          () => this.actionForSucess(categoria),
          error => this.actionForError(error)
         );
  }

  private actionForSucess(result) {
    toastr.success('Registro salvo com sucesso!');
    this.router.navigateByUrl('categorias', { skipLocationChange: false }).then(
        () => this.router.navigate(['categorias', 'editar', result.id])

    );


  }

  private actionForError(error) {
    toastr.error('Erro ao processar a requisição');
    this.subnmitterForm = false;
      if ( error.status === 422) {
        this.serveErrorMessages = JSON.parse(error._body).errors;
      } else {
        this.serveErrorMessages = ['Falha na comunicação com servidor'];
      }
  }


  private setPageTitle() {
    if (this.currentAction === 'nova') {
        this.pageTitle = 'Nova Categoria';
    } else {
        const categoriaNome = this.categoria.nome || '';
        this.pageTitle = 'Editando Categoria ' + categoriaNome;
    }

  }

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path === 'nova') {
      this.currentAction = 'nova';
    } else {
      this.currentAction = 'editar';
    }
  }


  private buidFormCategoria() {
    this.categoriaForm = this.formBuild.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(2)] ],
      descricao: [null]
    });
  }

  private loadCategoria() {
    if (this.currentAction === 'editar') {
      this.route.paramMap.pipe(
        switchMap(params =>  this.categoriaService.getById(+params.get('id')))
        )
        .subscribe( (categoria) => {
         this.categoria = categoria;
          this.categoriaForm.patchValue(categoria);
        },
        error => console.error('ERROR' + error)
      );
    }
  }
}

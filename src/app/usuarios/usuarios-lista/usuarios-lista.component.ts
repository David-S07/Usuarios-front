import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { Usuario } from '../usuario';
import { Usuario2 } from '../usuario2';
import { UsuariosService } from '../../usuarios.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-usuarios-lista',
  templateUrl: './usuarios-lista.component.html',
  styleUrls: ['./usuarios-lista.component.css']
})
export class UsuariosListaComponent implements OnInit {

  usuarios : Usuario[] = [];
  usuario2 : Usuario2[] = [];
  usuarioSelecionado: Usuario;
  mensagemSucesso: string;
  mensagemErro: string;

  _filter: string;
  filteredUsuarios:  Usuario[] = [];

  _filter2: string;
  filteredUsuarios2:  Usuario2[] = [];

  constructor(private service: UsuariosService, private router: Router) {  
   }
   
  ngOnInit(): void {
    this.service.getUsuario()
    .subscribe((resp: Usuario[]) => {
      this.usuarios = resp;
      this.filteredUsuarios = resp;
    });
  }
  
  novoCadastro() {
    this.router.navigate(['/usuarios-form'])
  }

  preparaDelecao(usuario: Usuario) {
    this.usuarioSelecionado = usuario;
  }

  deletarUsuario() {
    this.service
    .deletar(this.usuarioSelecionado)
    .subscribe(response => {
      this.mensagemSucesso = 'Usuario deletado com sucesso ! ' 
      this.ngOnInit();
    },
      erro => this.mensagemErro = 'Ocorreu um erro ao deletar o usuario. ')
  }

  set filter(value: string) {
    this._filter = value;
    this.filteredUsuarios = this.usuarios.filter((usuario: Usuario) => usuario.nome.toLocaleLowerCase().indexOf(this._filter.toLocaleLowerCase()) > -1);
  }

  get filter() : string {
    return this._filter;
  }

  set filter2(value: string) {
    this._filter2 = value;
    this.filteredUsuarios2 = this.usuarios.filter((usuario2: Usuario2) => usuario2.nome.toLocaleLowerCase().indexOf(this._filter2.toLocaleLowerCase()) > -1);
  }

  get filter2() : string {
    return this._filter2;
  }

}

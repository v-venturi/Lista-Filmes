import { Component, OnInit } from '@angular/core';
import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/modules/filme';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  readonly qtdPaginas = 4;
  filmes: Filme[] = [];
  pagina = 0; // verificar o pq de um não estar sendo aceito apesar de 'array'
 


  constructor(private filmesService: FilmesService) { }

  ngOnInit(): void {
    this.listarFilmes();
    
  }

  onScroll(): void {    
    this.listarFilmes();  
  }

  private listarFilmes(): void{
    this.pagina++;
    this.filmesService.listar(this.pagina, this.qtdPaginas)
    .subscribe((filmes: Filme[])=> this.filmes.push(...filmes));

  }

}

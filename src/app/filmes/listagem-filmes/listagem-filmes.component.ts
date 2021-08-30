import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime} from 'rxjs/operators';
import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';
import { ConfigParams } from '../../shared/models/config-params';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  readonly semFoto ='https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg';

  config: ConfigParams = {
    pagina: 0,
    limite:4,
  };
 
  filmes: Filme[] = [];  
  generos: Array<string>;
  filtrosListagem: FormGroup;
  
  constructor(private filmesService: FilmesService, 
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.filtrosListagem = this.fb.group({
      texto: [''], 
      genero: [''],
    });

      this.filtrosListagem.get('texto').valueChanges
      .pipe(debounceTime(500))
      .subscribe((val: string)=> {
      this.config.pesquisa =  val;
      this.resetarConsulta();

    });

    this.filtrosListagem.get('genero').valueChanges
      .subscribe((val: string)=> {
      this.config.campo = {tipo: 'genero', valor: val};
      this.resetarConsulta();
      
    });

    this.generos = ['Ação', 'Aventura', 'Comédia', 'Drama', 'Ficção Científica', 'Romance', 'Terror'];

    this.listarFilmes();
    
  }

  onScroll(): void {    
    this.listarFilmes();  
  }

  abrir(id:number): void{
    this.router.navigateByUrl('/filmes/' + id);
  }

  private listarFilmes(): void{
    this.config.pagina++;
    this.filmesService.listar(this.config)
    .subscribe((filmes: Filme[])=> this.filmes.push(...filmes));

  }

  private resetarConsulta(): void{
    this.config.pagina = 0;
    this.filmes = [];
    this.listarFilmes();
  }

}

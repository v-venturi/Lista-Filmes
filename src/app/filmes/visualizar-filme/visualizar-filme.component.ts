import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FilmesService } from '../../core/filmes.service';
import { Filme } from '../../shared/models/filme';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';

@Component({
  selector: 'dio-visualizar-filme',
  templateUrl: './visualizar-filme.component.html',
  styleUrls: ['./visualizar-filme.component.scss']
})
export class VisualizarFilmeComponent implements OnInit {
    readonly semFoto ='https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg';
    filme: Filme;
    id: number;

  constructor(public dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private filmesService: FilmesService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.visualizar();
  }

  editar(): void{
    this.router.navigateByUrl('/filmes/cadastro/' + this.id);
  }

  excluir(): void{
    const config = {
            data : {
            titulo: 'Tem certeza que deseja excluir?',
            descricao: 'Caso deseje excluir, clique no botão OK',
            corBtnCancelar:'primary',
            corBtnSucesso: 'warn',
            possuirBtnFechar: true
  
          }as Alerta
        }
        const dialogRef = this.dialog.open(AlertaComponent, config);
        dialogRef.afterClosed().subscribe((opcao: boolean) => {
          if (opcao) {
            this.filmesService.excluir(this.id)
            .subscribe(() => this.router.navigateByUrl('/filmes'));
          } 
        })
      
    }
    
  

  private visualizar(): void {
    this.filmesService.visualizar(this.id).subscribe((filme: Filme) => this.filme = filme);

  }
}

import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable, Subject, switchMap, of, distinctUntilChanged, catchError } from 'rxjs';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]> = new Observable

  private subjectPesquisa: Subject<string> = new Subject

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
    this.ofertas = this.subjectPesquisa
      .pipe(distinctUntilChanged(), switchMap((termo: string) => {
        if(termo.trim() === ''){
          return of<Oferta[]>([])
        }
        return this.ofertasService.pesquisaOfertas(termo)
      }), catchError((erro: any) => {
        return of<Oferta[]>([])
      }))
      
  }

  public pesquisa(termoDaBusca: string): void{
    this.subjectPesquisa.next(termoDaBusca)
  }

  public limpaPesquisa(): void{
    this.subjectPesquisa.next('')
  }

}

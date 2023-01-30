import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { interval, Observable, Observer, Subscription } from 'rxjs';
import { CarrinhoService } from '../carrinho.service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})

export class OfertaComponent implements OnInit, OnDestroy {

  public oferta: Oferta = new Oferta;

  //private tempoObservableSubscription: Subscription = new Subscription()
  //private meuObservableTesteSubscription: Subscription = new Subscription()

  constructor(
    private route: ActivatedRoute, 
    private ofertasService: OfertasService, 
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((parametros: any) => {
      this.ofertasService.getOfertaPorId(parametros.id)
      .then((oferta: Oferta) => {
        this.oferta = oferta
      })
    
    console.log('Oferta - Array de itens do carrinho: ', this.carrinhoService.exibirItens())
    })

    /* Observables
    this.route.params.subscribe((parametro: any) => {
      console.log(parametro)
    }, (erro: any) => {
      console.log(erro)
    }, () => {
      console.log('Processamento foi classificado como concluído!')
    })
    */

    //Observable (Essa stream de eventos é infinita)
    /*
    let tempo = interval(2000)
    this.tempoObservableSubscription = tempo.subscribe((intervalo: number) => {
      console.log(intervalo)
    })
    */
    
    //Observable (observável)
    /*
    let meuObservableTeste = new Observable((observer: Observer<number>) => {
      observer.next(1)
      observer.next(3)
      //observer.error('Algum erro foi encontrado na stream de eventos')
      observer.complete()

      //Depois de uma instrução de error() ou complete(), nada mais é executado daqui pra frente
      observer.next(3)
    })
    */

    //Observable (observador)
    /*
    this.meuObservableTesteSubscription = meuObservableTeste.subscribe(
      (resultado: number) => console.log(resultado + 10),
      (erro: string) => console.log(erro),
      () => console.log('A stream de eventos foi finalizada')
    )
    */
  }

  ngOnDestroy(): void {
    //this.tempoObservableSubscription.unsubscribe()
    //this.meuObservableTesteSubscription.unsubscribe()
  }

  public adicionarItemCarrinho(): void{
    this.carrinhoService.incluirItem(this.oferta)
    //console.log(this.oferta)
    console.log(this.carrinhoService.exibirItens())
  }

}

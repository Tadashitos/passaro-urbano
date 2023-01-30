import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';
//import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ROUTES } from './app.routes'

//Serviço
import { CarrinhoService } from './carrinho.service';

//Pipe
import { DescricaoReduzida } from './pipes/descricao-reduzida.pipe';

import localePt from "@angular/common/locales/pt"

import { AppComponent } from './app.component';
import { TopoComponent } from './topo/topo.component';
import { HomeComponent } from './home/home.component';
import { RodapeComponent } from './rodape/rodape.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { DiversaoComponent } from './diversao/diversao.component';
import { OfertaComponent } from './oferta/oferta.component';
import { ComoUsarComponent } from './oferta/como-usar/como-usar.component';
import { OndeFicaComponent } from './oferta/onde-fica/onde-fica.component';
import { OrdemCompraComponent } from './ordem-compra/ordem-compra.component';
import { OrdemCompraSucessoComponent } from './ordem-compra-sucesso/ordem-compra-sucesso.component'; //pipe

@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    HomeComponent,
    RodapeComponent,
    RestaurantesComponent,
    DiversaoComponent,
    OfertaComponent,
    ComoUsarComponent,
    OndeFicaComponent,
    DescricaoReduzida,
    OrdemCompraComponent,
    OrdemCompraSucessoComponent //pipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    //FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [ {provide: LOCALE_ID, useValue: 'pt'}, CarrinhoService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

registerLocaleData(localePt)

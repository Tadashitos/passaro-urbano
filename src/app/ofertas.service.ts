import { Oferta } from "./shared/oferta.model"
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom, Observable } from "rxjs"
import { URL_API } from "./app.api"
import { map, retry } from 'rxjs/operators'


@Injectable()
export class OfertasService{

    //private url_api = 'http://localhost:3000/ofertas'

    constructor(private http: HttpClient){

    }

    public getOfertas(): Promise<Oferta[]>{
        return firstValueFrom(this.http.get(`${URL_API}ofertas?destaque=true`))
            .then((resposta: any) => resposta)
    }

    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]>{
        return firstValueFrom(this.http.get(`${URL_API}ofertas?categoria=${categoria}`))
            .then((resposta: any) => resposta)
    }

    public getOfertaPorId(id: number): Promise<Oferta>{
        return firstValueFrom(this.http.get(`${URL_API}ofertas?id=${id}`))
            .then((resposta: any) => {
                return resposta[0]
            })
    }

    public getComoUsarOfertaPorId(id: number): Promise<string>{
        return firstValueFrom(this.http.get(`${URL_API}como-usar?id=${id}`))
            .then((resposta: any) => {
                return resposta[0].descricao
            })
    }

    public getOndeFicaOfertaPorId(id: number): Promise<string>{
        return firstValueFrom(this.http.get(`${URL_API}onde-fica?id=${id}`))
            .then((resposta: any) => resposta[0].descricao)
    }
    
    /*
    public getOfertas2(): Promise<Oferta[]>{
        return new Promise((resolve, reject) => {
            let deu_certo = true
            if(deu_certo){
                setTimeout(() => {
                    resolve(this.ofertas)
                }, 3000)
            } else{
                reject({erro: 404, mensagem_erro: 'Servidor não encontrado'})
            }
        })
    }
    */

    public pesquisaOfertas(termo: string): Observable<Oferta[]>{
        return this.http.get(`${URL_API}ofertas?descricao_oferta_like=${termo}`)
            .pipe(map((resposta: any) => resposta), retry(10))
    }
    
}


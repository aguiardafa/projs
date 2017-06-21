import { Component, OnInit, NgZone } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //declarando variável
  public artigos = new Array<Artigo>();
  //construtor da classe
  constructor(
    private http: Http,
    private zone: NgZone) { }

  ngOnInit(): void {
    this.http.get('/api/artigos')
      .subscribe(artigos => {
        this.zone.run(() => {
          debugger;
          this.resultadoArtigos(artigos);
        });
      });
  }
  resultadoArtigos(artigos) {
    this.artigos = JSON.parse(artigos._body);
  }
}
export class Artigo{
  id:number;
  titulo:string;
  resumo:string;
}

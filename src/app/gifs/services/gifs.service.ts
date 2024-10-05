import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifsList: Gif[]=[];
  private _tagsHistory: string[] = []
  private apiKey: string = 'Wt8bOf9i0H35Ve3ip9Tbhwmsy6ABPbCp';
  private serviceUrl: string = 'http://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs Service Ready');
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void{
    if( !localStorage.getItem("history") ) return
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._tagsHistory.length===0)return;
    this.searchTag(this.tagsHistory[0]);

  }

  searchTag(tag: string): void {
    if (tag.length === 0) return

    this.organizeHistory(tag)
    const params = new HttpParams()
      .set("api_key", "Wt8bOf9i0H35Ve3ip9Tbhwmsy6ABPbCp")
      .set("q", tag)
      .set("limit", '10')

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((resp) => {
        this.gifsList=resp.data;
      })
    // const resp = await fetch('http://api.giphy.com/v1/gifs/search?api_key=Wt8bOf9i0H35Ve3ip9Tbhwmsy6ABPbCp&q=valorant&limit=10');

  }

}

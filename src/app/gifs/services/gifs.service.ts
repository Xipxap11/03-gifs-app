import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = []
  private apiKey: string = 'Wt8bOf9i0H35Ve3ip9Tbhwmsy6ABPbCp';
  private serviceUrl: string = 'http://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) { }

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
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return

    this.organizeHistory(tag)
    const params = new HttpParams()
      .set("api_key", "Wt8bOf9i0H35Ve3ip9Tbhwmsy6ABPbCp")
      .set("q", tag)
      .set("limit", '10')

    this.http.get(`${this.serviceUrl}/search`, { params })
      .subscribe(resp => {
        console.log(resp);
      })
    // const resp = await fetch('http://api.giphy.com/v1/gifs/search?api_key=Wt8bOf9i0H35Ve3ip9Tbhwmsy6ABPbCp&q=valorant&limit=10');

  }

}

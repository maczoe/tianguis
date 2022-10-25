import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.mock';
import { Launch } from '../model/launch';

const urlApi =environment.mockapi;
const URL= './shared/guards/mocks/launch.json';

@Injectable({
  providedIn: 'root'
})
export class LaunchService {

  constructor(private http: HttpClient ) {}

  getLaunch(){
    return new Promise((resolve) => {

      if (urlApi) {
        //TODO: make local JSON file requests
        this.http.get(URL).subscribe((resp: Launch[]) => {
          resolve(resp);
        });
      } else {
        //TODO: make requests to the API server
        resolve([]);
      }

    });
  }

  getLaunchId(id: string) {
    return new Promise((resolve) => {
      if (urlApi) {
        //TODO: make local JSON file requests
        this.http.get(URL).subscribe((resp: Launch[]) => {

          const launch = resp.find((l) => l.id === id);
          resolve(launch);
        });
      } else {
        //TODO: make requests to the API server
        resolve([]);
      }

    });
  }
}

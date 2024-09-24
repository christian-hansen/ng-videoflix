import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  email!: string;
  username!: string;
  
  constructor() { }
}

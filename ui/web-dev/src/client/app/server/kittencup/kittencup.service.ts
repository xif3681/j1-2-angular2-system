import { Component,Injectable,EventEmitter } from '@angular/core';


@Injectable()
export class KittencupService {
  change: EventEmitter<any>;

  constructor(){
    this.change = new EventEmitter();
  }
}


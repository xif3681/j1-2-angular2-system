/**
 * 组件间通过服务来通信
 */
import { Component,Injectable,EventEmitter } from '@angular/core';
@Injectable()
export class PromptEmitService {
  change: EventEmitter<number>;

  constructor(){
    this.change = new EventEmitter();
  }
}

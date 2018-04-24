import {Injectable} from '@angular/core';
import {Http,ConnectionBackend,RequestOptions,RequestOptionsArgs,Request} from '@angular/http';
import 'rxjs/Rx';
import {MonitoringService} from './monitoring.service';

@Injectable()
export class CustomHttp extends Http {
  constructor(backend: ConnectionBackend,
              defaultOptions: RequestOptions,
              private monitoring:MonitoringService) {
    super(backend, defaultOptions);
    console.log('monitoring = '+this.monitoring);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    // console.log('request...');
    this.monitoring.pendingRequestsNumber++;
    return super.request(url, options).finally(() => {
      // console.log('finally');
      this.monitoring.pendingRequestsNumber--;
    });
  }

  // get(url: string, options?: RequestOptionsArgs): Observable<Response> {
  //   console.log('get...');
  //   // this.monitoring.pendingRequestsNumber++;
  //   return super.get(url, options).finally(() => {
  //     console.log('finally');
  //     // this.monitoring.pendingRequestsNumber--;
  //   });
  // }
  //
  // put(url: string, options?: RequestOptionsArgs): Observable<Response> {
  //   console.log('put...');
  //   // this.monitoring.pendingRequestsNumber++;
  //   return super.put(url, options).finally(() => {
  //     console.log('finally');
  //     // this.monitoring.pendingRequestsNumber--;
  //   });
  // }
  //
  // post(url: string, options?: RequestOptionsArgs): Observable<Response> {
  //   console.log('post...');
  //   // this.monitoring.pendingRequestsNumber++;
  //   return super.post(url, options).finally(() => {
  //     console.log('finally');
  //     // this.monitoring.pendingRequestsNumber--;
  //   });
  // }
  //
  // delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
  //   console.log('delete...');
  //   // this.monitoring.pendingRequestsNumber++;
  //   return super.delete(url, options).finally(() => {
  //     console.log('finally');
  //     // this.monitoring.pendingRequestsNumber--;
  //   });
  // }

}

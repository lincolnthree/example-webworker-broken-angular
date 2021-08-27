/// <reference lib="webworker" />

import {DoWork, runWorker} from 'observable-webworker';
import { Observable, of } from 'rxjs';
import {switchMap, take} from 'rxjs/operators';

export class ExampleWorker implements DoWork<string, string> {

  constructor() {
    console.warn('Created worker');
  }

  public work(input$: Observable<string>): Observable<string> {
    return input$.pipe(
      switchMap(input => {
        console.warn('Worker received message:', input);
        return of('message from worker: ' + input);
      }),
      take(1)
    );
  }

}


runWorker(ExampleWorker);

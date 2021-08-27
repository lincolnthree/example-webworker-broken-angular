import { fromWorker } from 'observable-webworker';
import { Subject } from 'rxjs';

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'example-web-worker';

  constructor() {
    const input$ = new Subject<string>();

    /*
     * 1. This syntax results in code that never seems to be called/never resolves.
     */
    const getWorkerFailsSilently = () => new Worker(new URL('./app.worker', import.meta.url), { type: 'module' });
    fromWorker(getWorkerFailsSilently, input$, null, {
      terminateOnComplete: true
    })
      .subscribe({
        complete: () => console.log('1. getWorkerFailsSilently COMPLETE'),
        error: error => console.error('1. getWorkerFailsSilently', error),
        next: msg => console.warn('1. getWorkerFailsSilently', msg)
      });

    //
    // /*
    //  * 2. This syntax results in code that gets called but results in an error.
    //  */
    // const getWorkerFailsWithError = () => {
    //   const url = new URL('./app.worker', import.meta.url);
    //   const worker = new Worker(url, { type: 'module' });
    //   return worker;
    // };
    // fromWorker(getWorkerFailsWithError, input$, null, {
    //   terminateOnComplete: true
    // })
    //   .subscribe({
    //     complete: () => console.log('2. getWorkerFailsWithError COMPLETE'),
    //     error: error => console.error('2. getWorkerFailsWithError', error),
    //     next: msg => console.warn('2. getWorkerFailsWithError', msg)
    //   });
    //
    // /*
    //  * 3. This syntax results in code that gets called but results in an error (expected since it's not using 'type: "module"').
    //  */
    // const getWorkerFailsWithErrorNoModule = () => {
    //   const url = new URL('./app.worker', import.meta.url);
    //   const worker = new Worker(url);
    //   return worker;
    // };
    // fromWorker(getWorkerFailsWithErrorNoModule, input$, null, {
    //   terminateOnComplete: true
    // })
    //   .subscribe({
    //     complete: () => console.log('3. getWorkerFailsWithErrorNoModule COMPLETE'),
    //     error: error => console.error('3. getWorkerFailsWithErrorNoModule', error),
    //     next: msg => console.warn('3. getWorkerFailsWithErrorNoModule', msg)
    //   });

    input$.next('Hello world!');
  }
}

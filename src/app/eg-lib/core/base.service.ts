import {computed, Injectable, linkedSignal, resource, signal} from '@angular/core';

@Injectable()
export class BaseService<T, R> {
  protected _url: string = '';
  protected _key: string = '';

  private _resource = resource<T[], R>(this.getParameters);
  public values = linkedSignal(() => (this._resource.value() as T[]) || []);

  private _get = signal<R>({} as R);
  public get(r: R) {
    this._get.set(r);
  }

  private get getParameters() {
    return {
      request: () => this._get(),
      loader: async ({request, abortSignal}) => {
        const pbody = JSON.stringify(request);
        const response = await fetch(this._url, {
          signal: abortSignal,
          headers: this.getHeaders(),
//          method: 'POST',
//          body: pbody,
          method: 'GET',
        });

        if (!response.ok) throw new Error('Unable to load data!');
        const res = await response.json();
        return res?.Result ?? res ?? [];
      },
    };
  }

  private getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('access_token') as string,
    };
  }

  private getProperty(obj: T, selector: string): any {
      return selector
//        .replace(/\[([^\[\]]*)\]/g, '.$1.')
        .split('.')
        .filter(t => t !== '')
        .reduce((prev, cur) => prev && prev[cur], obj)
  }

  update(rec: T): void {
    const s = this.getProperty(rec, this._key);
    const index = this.values().findIndex(item => this.getProperty(item,this._key) === s);
    if (index === -1) {
      this.values.update(items => [...items, rec]);
    } else {
      this.values.update(items => [
        ...items.slice(0, index),
        {...items[index], ...rec},
        ...items.slice(index + 1),
      ]);
    }
  }

  remove(rec: T): void {
    const s = this.getProperty(rec, this._key);
    this.values.update(items => this.values().filter(item => this.getProperty(item,this._key) !== s));
  }

  clear(): void{
    this.values.update(_ => [] );
  }

}

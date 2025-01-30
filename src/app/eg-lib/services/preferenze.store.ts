import {computed, inject, Injectable, resource, signal} from '@angular/core';
//import {Preferenza} from '@models/preferenza.model';
import {Preferenza} from 'eg-lib/models';
import {
  delay,
  distinctUntilChanged,
  interval,
  Observable,
  of,
  startWith,
  Subscription,
  switchMap,
} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {PreferenzeRequest} from 'eg-lib/models';

export interface PreferenzaData {
  preferenze: Preferenza[];
  meta: {
    lastUpdated: Date;
    lastEditor: string;
    lastRefreshed: Date;
  };
}

export interface PreferenzaState extends PreferenzaData {
  isPolling: boolean;
}

export const initialValue: PreferenzaState = {
  isPolling: false,
  preferenze: [],
  meta: {
    lastUpdated: new Date(),
    lastEditor: '',
    lastRefreshed: new Date(),
  },
};

@Injectable({providedIn: 'root'})
export class PreferenzeStore {
  #preferenzeData = signal(initialValue);
  //  #httpClient = inject(HttpClient);

  req = signal<PreferenzeRequest>({});

  get preferenzeData() {
    return this.#preferenzeData.asReadonly();
  }

  private getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('access_token') as string,
    };
  }

  /*
  #findAll(): Observable<PreferenzaData> {
    return this.#httpClient.get<PreferenzaData>('/preferenze');
  }
*/
  public preferenzeResource = resource<Preferenza[], PreferenzeRequest>({
    request: () => this.req(),
    loader: async ({request, abortSignal}) => {
      const response = await fetch('https://webapitest.easygold.pro/api/vi1/crm/preferenze', {
        signal: abortSignal,
        headers: this.getHeaders(),
        method: 'POST',
        body: JSON.stringify(request),
      });

      if (!response.ok) throw new Error('Unable to load data!');
      const res = await response.json();
      return (res?.Result || []) as Preferenza[];
    },
  });

  load() {
    /*    
    this.#findAll().subscribe((preferenzeData) =>
      this.#preferenzeData.update((value) => ({ ...value, ...preferenzeData })),
    );
*/
    this.#preferenzeData.update(value => ({...value, ...this.preferenzeResource.value()}));
  }

  preferenze = computed(() => this.#preferenzeData().preferenze);

  dataSource = computed(() =>
    this.preferenze().map<Preferenza>(rec => {
      return {
        CrmID: rec.CrmID,
        IDCliente: rec.IDCliente,
        IDMarca: rec.IDMarca,
        IDGruppo: rec.IDGruppo,
        IDCategoria: rec.IDCategoria,
        IDSottoCategoria: rec.IDSottoCategoria,
        Annullato: rec.Annullato,
        IDProdotto: rec.IDProdotto,
        Gradimento: rec.Gradimento,
        Note: rec.Note,
        NomeBrand: rec.NomeBrand,
        DataInserimento: rec.DataInserimento, // Date
        DataModifica: rec.DataModifica, // Date
      };
    })
  );
  /*
  pollingSub: Subscription | undefined;

  togglePolling(intervalInSeconds = 30) {
    if (this.#preferenzeData().isPolling) {
      this.pollingSub?.unsubscribe();
      this.#preferenzeData.update((value) => ({ ...value, isPolling: false }));
    } else {
      this.pollingSub = interval(intervalInSeconds * 1000)
        .pipe(
          startWith(true),
          switchMap(() => this.#findAll()),
          tap(console.info),
          distinctUntilChanged(
            (previous, current) =>
              previous.meta.lastRefreshed === current.meta.lastRefreshed,
          ),
        )
        .subscribe((preferenzeData) =>
          this.#preferenzeData.update((value) => ({ ...value, ...preferenzeData })),
        );
      this.#preferenzeData.update((value) => ({ ...value, isPolling: true }));
    }
  }
*/
  /*
  find(id: number): Observable<Preferenza | undefined> {
    return of(preferenze.find((rec: Preferenza) => rec.id === id)).pipe(delay(0));
  }
*/
}

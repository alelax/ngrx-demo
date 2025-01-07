
/**
 * NgRx ha bisogno che le i valori utilizzati per i campi "source" e "events" siano di tipo literal string.
 * Utilizzando "as const" assicuriamo che i valori non siano modificati e siano effettivamente literal string come
 * definito nelle rispettivi constanti
 * */
export const ActionDictionary = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
  RESET: 'reset',
  MULTIPLIER_UPDATE: 'multiplier update'
} as const

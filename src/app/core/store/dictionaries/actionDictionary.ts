
/**
 * NgRx ha bisogno che le i valori utilizzati per i campi "source" e "events" siano di tipo literal string.
 * Utilizzando "as const" assicuriamo che i valori non siano modificati e siano effettivamente literal string come
 * definito nelle rispettivi constanti
 * */
export const ActionDictionary = {
  INCREMENT: 'Increment',
  DECREMENT: 'Decrement',
  RESET: 'Reset',
  MULTIPLIER_UPDATE: 'Multiplier update',
  LOAD: 'Load',
  LOAD_SUCCESS: 'Load success',
  LOAD_FAIL: 'Load fail',
  CART_ADD_ITEM: 'Add',
  CART_REMOVE_ITEM: 'Remove',
  CART_CLEAR: 'Clear',
  CART_INCREASE_QUANTITY: 'Increase quantity',
  CART_DECREASE_QUANTITY: 'Decrease quantity'
} as const

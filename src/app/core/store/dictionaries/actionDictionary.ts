
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
  CART_DECREASE_QUANTITY: 'Decrease quantity',
  CART_LOADED_FROM_LOCAL_STORAGE: 'Loaded from local storage',
  SHOP_FILTERS_UPDATE: 'Update',
  UI_SIDE_PANEL_OPEN: 'Open SidePanel',
  UI_SIDE_PANEL_CLOSE: 'Close SidePanel',
  UI_SIDE_PANEL_TOGGLE: 'Toggle SidePanel',
} as const

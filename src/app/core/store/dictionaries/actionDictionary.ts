
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

  PRODUCT_LOAD: 'Load product',
  PRODUCT_LOAD_SUCCESS: 'Load product success',
  PRODUCT_LOAD_FAIL: 'Load product fail',
  PRODUCT_DELETE: 'Delete product',
  PRODUCT_DELETE_SUCCESS: 'Delete product success',
  PRODUCT_DELETE_FAIL: 'Delete product fail',
  PRODUCT_ADD: 'Add product',
  PRODUCT_ADD_SUCCESS: 'Add product success',
  PRODUCT_ADD_FAIL: 'Add product fail',
  PRODUCT_EDIT: 'Edit product',
  PRODUCT_EDIT_SUCCESS: 'Edit product success',
  PRODUCT_EDIT_FAIL: 'Edit product fail',
  PRODUCT_OPEN_MODAL_ADD: 'Open product modal add',
  PRODUCT_OPEN_MODAL_EDIT: 'Open product modal edit',
  PRODUCT_CLOSE_MODAL: 'Close product modal',
  PRODUCT_SAVE: 'Save product',

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

  ORDER_SEND: 'Send',
  ORDER_SEND_SUCCESS: 'Send success',
  ORDER_SEND_FAIL: 'Send fail',

  AUTH_LOGIN: 'Login',
  AUTH_LOGIN_SUCCESS: 'Login success',
  AUTH_LOGIN_FAIL: 'Login fail',
  AUTH_LOGOUT: 'Logout',
  AUTH_GET_PROFILE: 'Get profile',
  AUTH_GET_PROFILE_SUCCESS: 'Get profile success',
  AUTH_GET_PROFILE_FAIL: 'Get profile fail'

} as const

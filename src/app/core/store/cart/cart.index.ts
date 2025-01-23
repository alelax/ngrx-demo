import {
  clearCartLocalStorageExec,
  loadCartFromLocalStorageExec,
  saveCartInLocalStorageExec,
  sendOrderExec, sendOrderSuccessExec
} from './cart.functions';

export const CartIndex = {
  SAVE_CART_IN_LOCAL_STORAGE_EXEC: saveCartInLocalStorageExec,
  LOAD_CART_FROM_LOCAL_STORAGE_EXEC: loadCartFromLocalStorageExec,
  CLEAR_CART_LOCAL_STORAGE_EXEC: clearCartLocalStorageExec,
  SEND_ORDER_EXEC: sendOrderExec,
  SEND_ORDER_SUCCESS_EXEC: sendOrderSuccessExec
}

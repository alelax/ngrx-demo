import {
  addProductExec,
  deleteProductExec,
  editProductExec,
  loadProductsExec,
  saveProductExec
} from './products.functions';

export const ProductsIndex = {
  LOAD_PRODUCTS_EXEC: loadProductsExec,
  ADD_PRODUCT_EXEC: addProductExec,
  EDIT_PRODUCT_EXEC: editProductExec,
  DELETE_PRODUCT_EXEC: deleteProductExec,
  SAVE_PRODUCT_EXEC: saveProductExec
}

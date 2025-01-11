import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { ShopFilters } from '../../../model/shop-filters';
import { FeatureDictionary } from '../dictionaries/featureDictionary';
import { ShopFiltersActions } from './shop-filters.actions';
import { selectList } from '../products/products.feature';
import { Product } from '../../../model/product';

const initialState: ShopFilters = {
  text: '',
  cost: 10,
  wood: true,
  plastic: true,
  paper: true
}

export const shopFiltersFeature = createFeature({
  name: FeatureDictionary.SHOP_FILTERS,
  reducer: createReducer(
    initialState,
    on(ShopFiltersActions.update, (state: ShopFilters, action: { filters: Partial<ShopFilters> }): ShopFilters => ({ ...state, ...action.filters }))
  ),
  extraSelectors: ({ selectShopFiltersState }) => ({
    selectFilteredList: createSelector(
      selectList,
      selectShopFiltersState,
      (productList: Product[], filters: ShopFilters) => productList
        .filter( p => p.name.toLowerCase().includes(filters.text.toLowerCase()))
        .filter( p => p.cost <= filters.cost)
        .filter( p => {
          return  (filters.wood && p.type === 'wood') ||
                  (filters.plastic && p.type === 'plastic') ||
                  (filters.paper && p.type === 'paper')

        })
    )
  })
})

export const {
  selectText,
  selectCost,
  selectWood,
  selectPlastic,
  selectPaper,
  selectFilteredList,
  selectShopFiltersState
} = shopFiltersFeature

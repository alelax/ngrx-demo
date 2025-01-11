import { createActionGroup, props } from '@ngrx/store';
import { NameSpaceDictionary } from '../dictionaries/namespaceDictionary';
import { ActionDictionary } from '../dictionaries/actionDictionary';
import { ShopFilters } from '../../../model/shop-filters';

export const ShopFiltersActions = createActionGroup({
  source: NameSpaceDictionary.SHOP_FILTERS,
  events: {
    [ActionDictionary.SHOP_FILTERS_UPDATE]: props<{ filters: Partial<ShopFilters> }>()
  }
})

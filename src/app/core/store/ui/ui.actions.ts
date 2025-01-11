import { createActionGroup, emptyProps } from '@ngrx/store';
import { NameSpaceDictionary } from '../dictionaries/namespaceDictionary';
import { ActionDictionary } from '../dictionaries/actionDictionary';

export const UiActions = createActionGroup({
  source: NameSpaceDictionary.UI,
  events: {
    [ActionDictionary.UI_SIDE_PANEL_OPEN]: emptyProps(),
    [ActionDictionary.UI_SIDE_PANEL_CLOSE]: emptyProps(),
    [ActionDictionary.UI_SIDE_PANEL_TOGGLE]: emptyProps(),
  }
})

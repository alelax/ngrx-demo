import { createFeature, createReducer, on } from '@ngrx/store';
import { FeatureDictionary } from '../dictionaries/featureDictionary';
import { SidePanelState } from './ui.models';
import { UiActions } from './ui.actions';

const initialState: SidePanelState = {
  sidePanelOpened: false
}

export const uiFeature = createFeature({
  name: FeatureDictionary.UI,
  reducer: createReducer(
    initialState,
    on(UiActions.openSidePanel, (state: SidePanelState): SidePanelState => ({ ...state, sidePanelOpened: true })),
    on(UiActions.closeSidePanel, (state: SidePanelState): SidePanelState => ({ ...state, sidePanelOpened: false })),
    on(UiActions.toggleSidePanel, (state: SidePanelState): SidePanelState => ({ ...state, sidePanelOpened: !state.sidePanelOpened }))
  )
})

export const {
  selectSidePanelOpened
} = uiFeature

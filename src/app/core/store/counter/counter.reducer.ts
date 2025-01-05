const initialState = { value: 0 };
export const counterReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'increment':
      return { value: state.value + 1 };
    case 'decrement':
      return { value: state.value - 1 }
    case 'reset':
      return { value: 0}
  }
  return state
};

import produce from 'immer';
import axios from '../../common/axios-orders';

// Actions
const ADD_INGREDIENT = 'burgerBuilder/addIngredient';
const REMOVE_INGREDIENT = 'burgerBuilder/removeIngredient';
const FETCH_INGREDIENTS_SUCCESS = 'burgerBuilder/fetchIngredientSuccess';
const FETCH_INGREDIENTS_FAIL = 'burgerBuilder/fetchIngredientFail';
const BEGIN_ORDER = 'burgerBuilder/beginOrder';
const SIGN_IN_TO_ORDER = 'burgerBuilder/signInToOrder';
const CANCEL_ORDER = 'burgerBuilder/cancelOrder';

// Reducer
const BASE_PRICE = 4.99;
const INGREDIENT_PRICE = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
};
const initialState = {
  ingredients: {
    salad: 1,
    bacon: 1,
    cheese: 1,
    meat: 1,
  },
  price: BASE_PRICE,
  isOrdering: false, // did the user started the ordering process?
  isBuilding: false, // has the user edited the burger?
};

export default function burgerBuilderReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_INGREDIENT:
      return produce(state, (d) => {
        d.ingredients[action.id]++;
        d.price += INGREDIENT_PRICE[action.id];
        d.isBuilding = true;
      });
    case REMOVE_INGREDIENT:
      return produce(state, (d) => {
        d.ingredients[action.id]--;
        d.price -= INGREDIENT_PRICE[action.id];
        d.isBuilding = true;
      });
    case FETCH_INGREDIENTS_SUCCESS:
      return produce(state, (d) => {
        // firebase returns ingredients in different order
        // so we can't do d.ingredients = action.ingredients
        for (const ing in d.ingredients) {
          d.ingredients[ing] = action.ingredients[ing];
        }
        d.isOrdering = false;
      });
    case BEGIN_ORDER:
      return produce(state, (d) => {
        d.isOrdering = true;
      });
    case SIGN_IN_TO_ORDER:
      return produce(state, (d) => {
        d.isOrdering = true;
      });
    case CANCEL_ORDER:
      return produce(state, (d) => {
        d.isOrdering = false;
      });
    default:
      return state;
  }
}

// Action Creators
export const addIngredient = (id) => ({ type: ADD_INGREDIENT, id });
export const removeIngredient = (id) => ({ type: REMOVE_INGREDIENT, id });
export const beginOrder = () => ({ type: BEGIN_ORDER });
export const cancelOrder = () => ({ type: CANCEL_ORDER });
export const signInToOrder = () => ({ type: SIGN_IN_TO_ORDER });

// Thunk Action Dispatchers
export const fetchIngredients = () => async (dispatch) => {
  try {
    const res = await axios.get('/ingredients.json');
    dispatch({ type: FETCH_INGREDIENTS_SUCCESS, ingredients: res.data });
  } catch (err) {
    dispatch({ type: FETCH_INGREDIENTS_FAIL, error: err });
  }
};

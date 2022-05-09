import { createSelector } from "reselect";

const selectCartReducer = state => state.cart;

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.carItems
);

export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.isCartOpen
);

export const selectCartCount = createSelector(
    [selectCartItems],
    (carItems) => carItems.reduce(
        (total, carItem) => total + carItem.quantity,
        0
    )
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    (carItems) => carItems.reduce(
        (total, carItem) => total + carItem.quantity * carItem.price,
        0
    )
);
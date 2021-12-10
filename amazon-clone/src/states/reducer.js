export const initialState = {
    basket : [],
}

function calcTotal(basket){
    var i = 0;
    var total = 0;
    for(i; i<basket.length; i++){
        total = total + basket[i].price
    }

    return total
}


export const getBasketTotal = (basket) => calcTotal(basket)
    


const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_BASKET':
            console.log(action)
            return{
                ...state,
                basket: [...state.basket, action.item]
            }
        default:
            return state
    }
}


export default reducer
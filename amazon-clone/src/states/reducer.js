export const initialState = {
    basket : [],
    user: null
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
        case 'EMPTY_BASKET':
            return{
                ...state, 
                basket: []
            }
        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            let newBasket = [...state.basket];

            if(index >=0 ){
                newBasket.splice(index, 1);

            }else{
                console.warn('cant remove no such product')
            }

            return{
                ...state,
                basket: newBasket
            }
        case 'SET_USER':
            return{
                ...state,
                user: action.user
            }

        default:
            return state
    }
}


export default reducer
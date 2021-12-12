import React from 'react'
import CurrencyFormat from  "react-currency-format"
import './Subtotal.css'
import { useStateValue } from '../states/StateProvider'
import { getBasketTotal } from '../states/reducer'
import { useHistory } from 'react-router-dom'

function Subtotal() {

    const history = useHistory();
    const [{basket}, dispatch] = useStateValue()

    return (
        <div className="subtotal">
             <CurrencyFormat
                    renderText={(value) => (
                    <>
                        <p>
                        {/* Part of the homework */}
                        Subtotal ({basket?.length}): <strong>{value}</strong>
                        </p>
                        <small className="subtotal_gift">
                        <input type="checkbox" /> This order contains a gift
                        </small>
                    </>
                    )}
                    decimalScale={2}
                    value={getBasketTotal(basket)} // Part of the homework
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                />
                <button onClick={e => history.push('/payment')}>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal

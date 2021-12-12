import { useStateValue } from "../states/StateProvider"
import './Payment.css'
import CheckoutProduct from "../product/CheckoutProduct"
import { Link, useHistory } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { getBasketTotal } from "../states/reducer";
import CurrencyFormat from "react-currency-format";
import axios from '../axios/axios';
import { db } from "../firebase/firebase";

function Payment() {

    const [{user, basket}, dispatch] = useStateValue();

    const history = useHistory()

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        // client secret token 
        const getClientSecret = async () => {
            const response = await axios({
                method: "post",
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
    
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    }, [basket])

    console.log("SECRET IS >>>>>> ", clientSecret)


    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {

        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {

            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })



            setSucceeded(true);
            setError(null);
            setProcessing(false)

            dispatch({
                type:'EMPTY_BASKET'
            })
            
            
                


            history.replace('/orders');
        })




    }

    const handleChange = (event) => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "")

    }

    return (
        <div className="payment">
            <div className="payment_container">
                <h1>
                    Checkout (<Link to='/checkout'>{basket?.length} items
                    </Link>)
                </h1>

                {/* Payment  Section - delivery address */}
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment_address">
                        <p>
                            {user?.email}
                        </p>
                        <p>123 Freedom St.</p>
                        <p>Binghamton, NY</p>
                    </div>
                </div>

                {/* Payment  Section - review items */}
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Review Items and Delivery</h3>
                    </div>
                    <div className="payment_items">
                        {basket.map(item => (
                            <CheckoutProduct
                                id = {item.id}
                                title = {item.title}
                                image = {item.image}
                                price = {item.price}
                                rating = {item.rating}
                            />
                        ))}
                    </div>
                </div>


                {/* Payment  Section - payment method */}
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment_details">
                        {/* Stripe will go there */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="payment_priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                    <>
                                        <h3>Order Total: {value}</h3>
                                    </>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)} // Part of the homework
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                                {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment

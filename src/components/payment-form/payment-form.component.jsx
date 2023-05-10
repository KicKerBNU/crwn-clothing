import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentFormContainer, FormContainer } from './payment-form.styles';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const paymentHandler = async (event) => {
        event.preventDefault();
        if(!stripe || !elements) return;
        
        const response = await fetch('/.netlify/functions/create-payment-intent', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({amount: 10000})
        }).then(res => res.json());
        //receive the client_secret token to confirm the payment

        const { paymentIntent: {client_secret}} = response;
        console.log(client_secret);

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'Everton Buzzi'
                }
            }
        });
        //4242 4242 4242 4242  card number test
        //04/24 424 24242 // expiration date cvc test
        if(paymentResult.error){
            console.log(paymentResult.error)
        }else{
            console.log("Payment successfull")
        }
    }

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment:</h2>
                <CardElement />
                <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now</Button>
            </FormContainer>
        </PaymentFormContainer>
    )
}

export default PaymentForm;
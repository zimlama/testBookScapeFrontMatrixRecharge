import React from 'react';
import {PayPalButtons} from "@paypal/react-paypal-js";
import axios from "axios";

const bookscapeback = process.env.NEXT_PUBLIC_BOOKSCAPEBACK;

interface PaypalButtonInterface {
    totalValue : string
    invoice : string
}
const PaypalButton: React.FC<PaypalButtonInterface> = (props) => {
  return (
      <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create ({
            purchase_units: [
                {
                    description: props.invoice,
                    amount: {
                        value: props.totalValue
                    },
                },
            ],
        });
      }}

      onApprove={ async(data, actions) => {
        const order = await actions.order?.capture()
        console.log("order", order)
        
       const orderResponse = await axios.post(`${bookscapeback}/orders`, 
        {
          orden: order,
          factura: props.invoice
        })
       console.log("orderResponse", orderResponse)
      }

      }
      
      />
    
  )
}

export default PaypalButton

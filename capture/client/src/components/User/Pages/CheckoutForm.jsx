import React, { useRef, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";

const PaymentForm = () => {
  const uname = useRef();
  const email = useRef();
  const date = useRef();
  const address = useRef();
  const price = useRef();
  const title = useRef();
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

     const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|org)$/;
     const currentDate = new Date();
     const enteredDate = new Date(date.current.value);
     const errors = {};

     if (!uname.current.value.trim()) {
       errors.name = "Name is required";
     }

     if (!date.current.value.trim()) {
       errors.date = "Date is required";
     } else if (enteredDate <= currentDate) {
       errors.date = "Please select a future date";
     }

     if (!email.current.value.trim()) {
       errors.email = "Email is required";
     } else if (!emailRegex.test(email.current.value)) {
       errors.email =
         "Please enter a valid email address with 'com', 'net', or 'org' domain";
     }

     if (!address.current.value.trim()) {
       errors.address = "Address is required";
     }

     if (!price.current.value.trim()) {
       errors.price = "Price is required";
     }

     if (!title.current.value.trim()) {
       errors.title = "Title is required";
     }

    if (Object.keys(errors).length === 0) {
      if (elements == null) {
        setIsSubmitting(false);
        return;
      }

      try {
        const { error: submitError } = await elements.submit();
        if (submitError) {
          setErrorMessage({ submit: submitError.message });
          setIsSubmitting(false);
          return;
        }

        const userData = {
          name: uname.current.value,
          email: email.current.value,
          date: date.current.value,
          address: address.current.value,
          price: price.current.value,
          title: title.current.value,
        };
        await axios
          .post("http://localhost:5000/v1/order/create", userData)
          .then((res) => {
            console.log(res.data);
            console.log(res.data.data.id);
            Cookies.set("orderId", res.data.data.id);
          });

        const response = await fetch(
          "http://localhost:5000/v1/payment/create-payment",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );
        console.log(response);
        const data = await response.json();
        const { client_secret: clientSecret } = data;

        const { error } = await stripe.confirmPayment(
          {
            elements,
            clientSecret,
            confirmParams: {
              return_url: "http://localhost:3000/booking",
            },
          },
          toast.success("Payment success 😊!", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          })
        );

        if (error) {
          setErrorMessage(error.message);
        } else {
          toast.success("Payment success 😊!", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      } catch (error) {
        console.error("Error:", error);
        setErrorMessage({
          submit: "An error occurred. Please try again later.",
        });
        toast.error("Payment Prosessing error!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } else {
      setErrorMessage(errors);
      setIsSubmitting(false);
      toast.error("Enter all required fields!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div className="book-package">
      <div className="book-package-form">
        <div className="Payment-heading">
          <h2>Booking and Payment</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form">
            <label htmlFor="userName">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              id="userName"
              ref={uname}
              autoComplete="off"
            />
            {errorMessage.name && (
              <span className="error" style={{ color: "red" }}>
                {errorMessage.name}
              </span>
            )}
          </div>

          <div className="form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              id="Email"
              ref={email}
              autoComplete="off"
            />
            {errorMessage.email && (
              <span className="error" style={{ color: "red" }}>
                {errorMessage.email}
              </span>
            )}
          </div>

          <div className="form">
            <label htmlFor="formDate">Date</label>
            <input
              type="date"
              name="date"
              id="formDate"
              ref={date}
              autoComplete="off"
            />
            {errorMessage.date && (
              <span className="error" style={{ color: "red" }}>
                {errorMessage.date}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="formAddress">Address</label>
            <textarea
              type="text"
              rows={3}
              name="address"
              placeholder="Address"
              id="formAddress"
              className="payment-address"
              ref={address}
              autoComplete="off"
            ></textarea>
            {errorMessage.address && (
              <span className="error" style={{ color: "red" }}>
                {errorMessage.address}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="formPrice">Price</label>
            <input
              type="text"
              name="price"
              ref={price}
              value={Cookies.get("payment_price")}
              id="formPrice"
              disabled
            />
            {errorMessage.price && (
              <span className="error" style={{ color: "red" }}>
                {errorMessage.price}
              </span>
            )}
          </div>

          <div className="form">
            <label htmlFor="formTitle">Package Name</label>
            <input
              type="text"
              name="title"
              ref={title}
              value={Cookies.get("payment_title")}
              id="formTitle"
              disabled
            />
            {errorMessage.title && (
              <span className="error" style={{ color: "red" }}>
                {errorMessage.title}
              </span>
            )}
          </div>

          <PaymentElement />

          <div>
            <button
              type="submit"
              className="payBtn"
              disabled={!stripe || !elements || isSubmitting}
            >
              Pay and Book Now
            </button>
          </div>

          {errorMessage.submit && (
            <div className="error" style={{ color: "red" }}>
              {errorMessage.submit}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

const stripePromise = loadStripe(
  "pk_test_51OqT6aSJuCh9MehJgv2UHBz5oQTf7exxbfVMpdSL8YLM4hxqsnwpUf4S9WRBKCsLpqJlDwWg9m0PRw69MhcZ8GW600i0H72kXm"
);

const options = {
  mode: "payment",
  amount: 1099,
  currency: "usd",
  appearance: {},
};

const CheckoutForm = () => (
  <Elements stripe={stripePromise} options={options}>
    <PaymentForm />
  </Elements>
);

export default CheckoutForm;

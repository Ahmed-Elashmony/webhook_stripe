import { Router } from "express";
const router = Router();
import isAuth from "../../middleware/authntication.middleware.js";
// import { validation } from "../../middleware/validation.js";
// import * as validators from "./order.validation.js";
import * as orderController from "./order.controller.js";
import express from "express";
import Stripe from "stripe";

//create order
router.post("/", isAuth, orderController.createOrder);

// //webhook
// router.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   orderController.orderWebhook
// );

const stripe = new Stripe(process.env.STRIPE_KEY);
const app = express();

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  "whsec_c5b60d7c9ef16b98396202380a20429943cfd363de56840fea0e635a8070e7b3";

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.async_payment_failed":
        const checkoutSessionAsyncPaymentFailed = event.data.object;
        // Then define and call a function to handle the event checkout.session.async_payment_failed
        break;
      case "checkout.session.async_payment_succeeded":
        const checkoutSessionAsyncPaymentSucceeded = event.data.object;
        // Then define and call a function to handle the event checkout.session.async_payment_succeeded
        break;
      case "checkout.session.completed":
        const checkoutSessionCompleted = event.data.object;
        // Then define and call a function to handle the event checkout.session.completed
        break;
      case "checkout.session.expired":
        const checkoutSessionExpired = event.data.object;
        // Then define and call a function to handle the event checkout.session.expired
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

export default router;

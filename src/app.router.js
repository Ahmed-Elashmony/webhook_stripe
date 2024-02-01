import connectDB from "../DB/connection.js";
import authRouter from "./modules/auth/auth.router.js";
import userRouter from "./modules/user/user.router.js";
import categRouter from "./modules/category/categ.router.js";
import cartRouter from "./modules/cart/cart.router.js";
import orderRouter from "./modules/order/order.router.js";
import { globalErrorHandler } from "./utils/asyncHandling.js";
import cors from "cors";

const appRouter = (app, express) => {
  // Cors // ////////
  app.use(cors({}));

  // app.use((req, res, next) => {
  //   if (req.originalUrl.includes("/order/webhook")) {
  //     console.log("ss");
  //     return next();
  //   }
  console.log("PP");
  express.json();
  // (req, res, next);
  // });

  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/category", categRouter);
  app.use("/cart", cartRouter);
  app.use("/order", orderRouter);

  app.all("*", (req, res) => {
    return res.status(404).json({ message: "invalid Path" });
  });

  connectDB();
  app.use(globalErrorHandler);
};

export default appRouter;

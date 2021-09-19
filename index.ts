import express from "express";
import methodOverride from "method-override";
import cors from "cors";
import userRoutes from "./routes/user/";

const app = express();
const port = 5000;

const router = express.Router();

app.use(cors());
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

router.use(userRoutes);

// app.use("/product/create", async (req, res, next) => {
//   try {
//     await prisma.product.create({
//       data: {
//         name: "Lilie",
//         description: "Cudowne lilie od 2paca",
//         quantity: 5,
//         prize: 20.99,
//       },
//     });
//     res.status(201);
//     res.send({ message: "Product created" });
//   } catch (error) {
//     res.status(400);
//     res.send(error);
//   }
// });

// app.get("/product/getAll", async (req, res, next) => {
//   try {
//     const products = await prisma.product.findMany({
//       include: {
//         orders: true,
//       },
//     });
//     res.status(200);
//     res.json(products);
//   } catch (error) {
//     res.status(400);
//     res.send(error);
//   }
// });

// app.use("/customer/create", async (req, res, next) => {
//   try {
//     await prisma.customer.create({
//       data: {
//         firstName: "Damian",
//         lastName: "Czarnota",
//         passwordHash: "##!@#!@#!@",
//       },
//     });
//     res.status(201);
//     res.send({ message: "User created" });
//   } catch (error) {
//     res.status(400);
//     res.send(error);
//   }
// });

// app.use("/payment/create", async (req, res, next) => {
//   try {
//     await prisma.payment.create({
//       data: {},
//     });
//     res.status(201);
//     res.send({ message: "Payment method created" });
//   } catch (error) {
//     res.status(400);
//     res.send(error);
//   }
// });

// app.use("/order/create", async (req, res, next) => {
//   try {
//     await prisma.order.create({
//       data: {
//         payment: {
//           connect: {
//             id: "28274f7d-af0b-46e9-bbc1-88b7cfc889a0",
//           },
//         },
//         customer: {
//           connect: {
//             id: "50bb41ca-55bc-469a-9de9-396bdff1d5cc",
//           },
//         },
//         products: {
//           connect: [
//             { id: "a4db1ccb-43e5-4113-a2c1-5640822a7558" },
//             { id: "a027b63c-bf24-49dd-ae96-73e9429510ed" },
//           ],
//         },
//         delivery: {
//           connect: {
//             id: "",
//           },
//         },
//       },
//     });
//     res.status(201);
//     res.send({ message: "Order created" });
//   } catch (error) {
//     res.status(400);
//     res.send(error);
//   }
// });

// app.use("/order/getAll", async (req, res, next) => {
//   try {
//     const orders = await prisma.order.findMany({
//       include: {
//         products: true,
//       },
//     });
//     res.status(200);
//     res.json(orders);
//   } catch (error) {
//     res.status(400);
//     res.send(error);
//   }
// });

// app.use("/delivery/create", async (req, res, next) => {
//   try {
//     await prisma.delivery.create({
//       data: {
//         type: 'Courier'
//       },
//     });
//     res.status(201);
//   } catch (error) {
//     res.status(400);
//     res.send(error);
//   }
// });

app.listen(port, () => {
  console.log("app working");
});

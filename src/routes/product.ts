import { Router } from "express";
import * as productController from "../controllers/api-products";

const productRoutes = Router();

productRoutes.post("/products", productController.createProduct);

productRoutes.get("/products", productController.getAllProducts);

productRoutes.get("/products/:id", productController.getProductById);

productRoutes.put("/products/:id", productController.updateProduct);

productRoutes.delete("/products/:id", productController.deleteProduct);

export default productRoutes;

import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  addProduct,
  removeProduct,
  updateProduct,
} from "../controllers/products.controller.js";
import {
  getUsers,
  getUserById,
  newUser,
  updateUser,
  deleteUser,
  authenticate,
} from "../controllers/users.controllers.js";

// import { uploadImage } from "../controllers/uploads.controller.js";
import { upload } from "../middlewares/storage.js";
import { uploadImage } from "../controllers/products.controller.js";
import { getSpecificProducts } from "../controllers/products.controller.js";

const router = Router();

//----------------------RUTA MULTER-----------------------------------

// router.post("/upload",upload.single('image'), uploadImage)

// Ruta para subir imágenes de productos
router.post("/products/:id/upload", upload.single("image"), uploadImage);

//----------------------RUTA PRODUCTOS-----------------------------------

router.get("/products", getAllProducts); // Ruta para obtener todos los productos

router.get("/products/:id", getProductById); // Ruta para obtener un producto por su ID

router.post("/products", addProduct); // Ruta para agregar un nuevo producto

router.delete("/product/:id", removeProduct); // Ruta para eliminar un producto por su ID

router.put("/product/:id", updateProduct); // Ruta para actualizar un producto por su ID

router.get("/specific-products", getSpecificProducts); // Ruta para obtener productos específicos por id

//----------------------RUTA USUARIOS-----------------------------------

router.post("/authenticate", authenticate); // Ruta para autenticar usuarios

router.get("/user", getUsers); // Ruta para obtener todos los usuarios

router.get("/user/:id", getUserById); // Ruta para obtener un usuario por su ID

router.post("/user", newUser); // Ruta para agregar un nuevo usuario

router.put("/user/:id", updateUser); // Ruta para actualizar un usuario por su ID

router.delete("/user/:id", deleteUser); // Ruta para eliminar un usuario por su ID

export default router;

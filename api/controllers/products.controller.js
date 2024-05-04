import mongoose from "mongoose";
import { DBNAME, PASS, USER, fullDomain } from "../config/config.js";


// Opciones de configuración para el esquema del producto
const options= {
    collection: 'products',
    strict: true,
    collation: {
        locale: "en",
        strength: 1 
    }

}

// Esquema del producto
const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    discount: Number,
    category: String,
    imageUrl: String,
}, options)

// Modelo de Producto
const Product = mongoose.model("Product", productSchema)

// Controlador para obtener todos los productos
export const getAllProducts = async (req, res) => {
    try {
        console.log()
        const result = await Product.find()
        res.json(result)

    }catch (error) {
        res.status(400).json('Error')
    }
}

// Controlador para obtener los productos por el id

export const getProductById = async (req, res) => {
    try {
        const {id} = req.params
        const result = await Product.findById(id)
        res.json(result)

    }catch (error) {
        res.status(400).json('Error')

    }
}

// Controlador para agregar un nuevo producto
export const addProduct = async (req, res) => {
    try {
        const {name, description, price, discount, category} = req.body
        const newProduct = new Product({
            name,
            description,
            price,
            discount,
            category

        })
        await newProduct.save()

        const allTheProducts = await Product.find()
        res.send(allTheProducts)
        res.status(200).json('Añadiendo producto')

    }catch (error) {
        res.status(400).json('Error')

    }
}

// Controlador para actualizar un producto existente
export const updateProduct = async (req, res) => {
    try {
        const {id} = req.params
        const {name, description, price, discount, category} = req.body
        const editedProduct = await Product.findByIdAndUpdate(id, {name, description, price, discount, category}, {new:true} )
        res.json(editedProduct)
        res.status(200).json('Editando producto')

    }catch (error) {
        res.status(400).json('Error')

    }
}

// Controlador para eliminar un producto
export const removeProduct = async (req, res) => {
    try {
        const {id} = req.params
        const product = Product.findByIdAndDelete(id)
        res.json({
            product,
            status: "ok",
            msg: "Producto eliminado con éxito"
      })

    }catch (error) {
        res.status(400).json('Error')

    }
}

// Controlador para subir una imagen de producto
export const uploadImage = async (req, res) => {
    try {
        
        const {id} = req.params
        const result = await Product.findById(id)
        if (!result) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        
        result.imageUrl = `${fullDomain}/files/${req.file.filename}`;
        await result.save();

        
        res.json({
            message: "Archivo subido correctamente",
            file: req.file,
            peso: `${Math.round(req.file.size/1024)} Kbytes`,
            url: `${fullDomain}/files/${req.file.filename}`
        });
    } catch (err) {
        res.status(500).json({ message: 'Error al subir la imagen' });
    }
}

// Controlador para obtener productos específicos por el id, en este caso los 3, que aparecen en bestsellers
export const getSpecificProducts = async (req, res) => {
    try {
        const productIds = ["66117c7bf297baa465234c79", "66118d96f297baa465234c7e", "66119c72f297baa465234c81"];
        const specificProducts = await Product.find({ _id: { $in: productIds } });
        res.json(specificProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




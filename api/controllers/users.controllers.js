import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { DBNAME, PASS, USER } from "../config/config.js";

// // Función para conectarse a la base de datos MongoDB
// const connect = async () => {
//   const url = `mongodb+srv://${USER}:${PASS}@cei-valencia.sl8cxae.mongodb.net/${DBNAME}`;
//   await mongoose
//     .connect(url)
//     .then(() => console.log("Conectado a MongoDB Atlas"))
//     .catch((e) => console.log("Error en la conexion", e));
// };
// connect();

// Opciones de configuración para el esquema del usuario
const options = {
  collection: "users",
  strict: true, //solo almacena los elementos que estan registrados en el esquema
  collation: {
    locale: "en", //o en, ingles
    strength: 1, //fuerza del tipado al hacer la busqueda
  },
};

// Esquema del usuario
const userSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
  },
  options
);

// Modelo de Usuario
const User = mongoose.model("User", userSchema);

// Función para generar un token JWT, hemos importado arriba la libreria
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h", // expiración del token
    }
  );
};

// Middleware para verificar el token de autenticación
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(403)
      .json({ error: "No se proporcionó un token de autorización" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido" });
    }

    req.user = decoded;
    next();
  });
};

const JWT_SECRET = "test_secret_key";

const generateTokenJWT = (user) => {
  const payload = {
    user: {
      id: user.id,
      username: user.username,
    },
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
};

// Controlador para autenticar usuarios
export const authenticate = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const isMatch = password === user.password ? true : false;

    if (!isMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = await generateTokenJWT(user);

    res.json({ token });
  } catch (error) {
    console.error("Error de autenticación:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Controlador para obtener todos los usuarios
export const getUsers = async (req, res, next) => {
  try {
    console.log();
    const result = await User.find();
    res.json(result);
  } catch (error) {
    res.status(400).json("Error");
  }
};

// Controlador para obtener un usuario por su ID
export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await User.findById(id);
    res.json(result);
  } catch (error) {
    res.status(400).json("Error");
  }
};

// Controlador para agregar un nuevo usuario
export const newUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({
      username,
      password,
      email,
    });
    await newUser.save();
    const allUsers = await User.find();
    res.status(200).json({ message: "Usuario añadido", users: allUsers });
  } catch (error) {
    console.error("Error al agregar usuario:", error);
    res.status(400).json({ error: "Error al agregar usuario" });
  }
};

// Controlador para actualizar un usuario existente
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;
    const editedUser = await User.findByIdAndUpdate(
      id,
      { username, email, password },
      { new: true }
    );

    if (!editedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(editedUser);
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Controlador para eliminar un usuario
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({
      user: deletedUser,
      status: "ok",
      msg: "User eliminado con éxito",
    });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

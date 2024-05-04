import multer from "multer";

// Configuración de almacenamiento para los archivos subidos con multer
const storage = multer.diskStorage({
    // Función para especificar la carpeta de destino
    destination: function (req, file, cb) {
        // carpeta de destino
        cb(null, './uploads')
    },
    // Función para definir el nombre de archivo
    filename: function (req, file, cb) {
        // nombre del archivo
        cb(null, file.originalname);
    }
})

// Middleware para el manejo de la subida de archivos utilizando multer y la configuración de almacenamiento definida
export const upload = multer({ storage: storage })


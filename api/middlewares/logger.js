/**
 * Middleware para registrar información sobre las solicitudes entrantes.
 * Registra la URL original de la solicitud y la hora en que se realizó.
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @param {Function} next - Función para pasar el control al siguiente middleware.
 */
export const logger = (req, res, next) => {
    // Registra la URL original de la solicitud
    console.log("Registro guardado en ruta: ", req.originalUrl)
    // Registra la hora en que se realizó la solicitud
    console.log("Time: ", Date.now())
    // Pasa el control al siguiente middleware
    next()
    
}
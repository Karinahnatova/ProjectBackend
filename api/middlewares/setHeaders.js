/**
 * Middleware para establecer el encabezado Content-Type en "application/json" en la respuesta.
 * Esto indica que el cuerpo de la respuesta está en formato JSON.
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @param {Function} next - Función para pasar el control al siguiente middleware.
 */
export const setHeaders = (req, res, next) => {
    // Establece el encabezado Content-Type en "application/json"
    res.setHeader("Content-Type", "application/json")
    // Pasa el control al siguiente middleware
    next()
}
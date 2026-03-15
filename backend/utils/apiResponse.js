/* ======================================================
   STANDARD API RESPONSE FORMAT
====================================================== */

function success(res, data = null, message = null, status = 200) {
    return res.status(status).json({
        success: true,
        message,
        data,
    });
}

function error(res, message = "Server error", status = 500) {
    return res.status(status).json({
        success: false,
        error: message,
    });
}

module.exports = {
    success,
    error,
};
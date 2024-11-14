class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // this is operational error (lỗi vận hành) not programming error

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;

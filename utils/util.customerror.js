//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  CLASS CUSTOM ERROR.                                                              │
//  └───────────────────────────────────────────────────────────────────────────────────┘
class CustomError extends Error {
  constructor(
    { name, message } = {
      name: 'MY_CUSTOM_ERROR',
      message: 'Default Message for custom error',
    },
  ) {
    super(name, message);
    this.name = name;
    this.message = message;
  }
}

//  ──[  EXPORT MODULE ]─────────────────────────────────────────────────────────────────
module.exports = CustomError;

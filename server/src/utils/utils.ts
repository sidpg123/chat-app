export class ErrorHandler extends Error {
  statusCode: number;
  message: string; // Declare the message property

  constructor(statusCode: number, message: string) {
    super(message); // Pass the message to the parent Error class, initializing it
    this.statusCode = statusCode;
    this.message = message;   
  }
}

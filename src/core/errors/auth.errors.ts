export class AppError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'AppError';
    }
  }
  
  export class UserAlreadyExistsError extends AppError {
    constructor() {
      super('Este e-mail já está cadastrado.');
      this.name = 'UserAlreadyExistsError';
    }
  }
  
  export class InvalidCredentialsError extends AppError {
    constructor() {
      super('E-mail ou senha incorretos.');
      this.name = 'InvalidCredentialsError';
    }
  }
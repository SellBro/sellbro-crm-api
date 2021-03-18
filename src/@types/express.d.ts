declare namespace Express {
  export interface Response {
    respond: (data: any, message?: string) => void;
  }

  export interface Request {
    user: import('entities').User;
  }
}

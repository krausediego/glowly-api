import { JwtPayload } from 'jsonwebtoken';

export interface IToken {
  createToken(props: IToken.CreateToken): string;
  validate(props: IToken.Validate): string | JwtPayload;
}

export namespace IToken {
  export interface CreateToken {
    payload: Record<string, any>;
    secret: string;
    expiresIn: string | number;
  }

  export interface Validate {
    token: string;
    secret: string;
  }
}

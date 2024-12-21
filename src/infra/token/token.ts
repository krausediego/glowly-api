import { JwtPayload, sign, verify } from 'jsonwebtoken';

import { IToken } from '@/domain/interfaces';

export class Token implements IToken {
  constructor() {}

  createToken({ payload, secret, expiresIn }: IToken.CreateToken): string {
    return sign(payload, secret, { expiresIn });
  }

  validate({ token, secret }: IToken.Validate): string | JwtPayload {
    return verify(token, secret);
  }
}

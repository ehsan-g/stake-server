import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User Info from Google',
      user: req.user,
    };
  }
}

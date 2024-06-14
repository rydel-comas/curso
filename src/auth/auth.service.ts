import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; 
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService:UsersService,
    private readonly jwtService: JwtService
  ) {}


  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if(user && await bcrypt.compare(password, user.password)) {
      const {password, ...result } = user.toObject(); 
      return result;
    }
    return null;
  }

  
  async login(user: User) {
    const payload  = { username: user.username, sub: user._id as string };
    return {
      access_token: this.jwtService.sign(payload), 
    };
  }


}

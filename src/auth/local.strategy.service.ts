import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from 'passport-local'; 
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { User } from '../users/schemas/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  
  constructor(private readonly authService: AuthService) {
    super({usernameField: 'email'}) // Configura la estrategia para usar el campo "email" en lugar del 'username'
  }
  // de la request tomamos el email y el password
  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(email, password);
    if(!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

}
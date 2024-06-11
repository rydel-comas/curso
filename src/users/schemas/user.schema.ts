import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({required: true })
  username: string;
  @Prop({required: true, unique: true}) // Asegura que el email sea unico
  email: string;
  @Prop({required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Este UserSchema puede ser utilziado para definir un modelo de Mongoose
// que nos permita iteractuar con la base de datos 

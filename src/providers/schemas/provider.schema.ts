import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from "src/users/schemas/user.schema";

@Schema()
export class Provider extends Document {
  @Prop({required: true })
  name: string;
  
  @Prop({required: true}) // Asegura que el email sea unico
  type: string;

  @Prop({default: Date.now })
  createAt: Date;

  @Prop({type: String, ref: 'User', required: true})
  createBy: User;
}

export const ProviderSchema = SchemaFactory.createForClass(Provider);

// Este UserSchema puede ser utilziado para definir un modelo de Mongoose
// que nos permita iteractuar con la base de datos 

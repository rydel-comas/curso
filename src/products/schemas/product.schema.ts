import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from "src/users/schemas/user.schema";
import { Provider } from "src/providers/schemas/provider.schema";

@Schema()
export class Product extends Document {
  @Prop({required: true })
  name: string;

  @Prop({required: true})
  type: string;
  
  @Prop({type: String, ref: 'Provider', required: true})
  providerId: Provider;

  @Prop({default: Date.now })
  createAt: Date;

  @Prop({type: String, ref: 'User', required: true})
  createBy: User;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

// Este UserSchema puede ser utilziado para definir un modelo de Mongoose
// que nos permita iteractuar con la base de datos 

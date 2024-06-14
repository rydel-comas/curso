import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from "src/users/schemas/user.schema";

@Schema()
export class Provider extends Document {
  @Prop({required: true })
  name: string;
  
  @Prop({required: true}) 
  type: string;

  @Prop({default: Date.now })
  createAt: Date;

  @Prop({type: String, ref: 'User', required: true})
  createBy: User;
}

export const ProviderSchema = SchemaFactory.createForClass(Provider);


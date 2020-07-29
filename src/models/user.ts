import mongoose, { Schema, model, Types } from 'mongoose';
import { MessageSchema, MessageDoc } from './message';

interface UserAttrs {
  name: string;
  phone: string;
  registerType: RegisterType;
}

export interface UserDoc extends mongoose.Document {
  name: string;
  phone: string;
  registerType: RegisterType;
  isArchived: boolean;
  authVersion: number;
  groups: {
    groupId: string;
    unreadMessageCount: number;
    lastMessage: MessageDoc;
  }[];
  bannedUserIds: string[];
  archive(): Promise<void>;
  banUser(userId: string): Promise<void>;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

export enum RegisterType {
  Kakao = 'kakao',
  Apple = 'apple'
}

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    registerType: { type: String, required: true, enum: Object.values(RegisterType) },
    isArchived: { type: Boolean, required: true, default: false },
    authVersion: { type: Number, required: true, default: 0 },
    groups: [
      {
        groupId: { type: Types.ObjectId, required: true, ref: 'group' },
        unreadMessageCount: { type: Number, required: true, default: 0 },
        lastMessage: MessageSchema
      }
    ],
    bannedUserIds: [{ type: Types.ObjectId, required: true, ref: 'user' }]
  },
  { timestamps: true }
);

UserSchema.pre('save', function(done) {
  this.__v!++;
  // @ts-ignore
  this.$where = { __v: this.get('__v') - 1 };
  done();
});

UserSchema.statics.build = (attrs: UserAttrs) => new User(attrs);

export const User = model<UserDoc, UserModel>('useer', UserSchema);

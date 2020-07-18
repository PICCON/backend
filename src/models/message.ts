import mongoose, { Schema, model, Types } from 'mongoose';
import { User } from './user';
interface MessageAttrs {
  groupId: string;
  text?: string;
  images: { key: string; location?: string; createdAt: Date }[];
  userId: string;
}

export interface MessageDoc extends mongoose.Document {
  groupId: string;
  text?: string;
  images: { key: string; location?: string; createdAt: Date }[];
  userId: string;
  userName: string;
  createdAt: Date;
  updatedAt: Date;
}

interface MessageModel extends mongoose.Model<MessageDoc> {
  build(attrs: MessageAttrs): Promise<MessageDoc>;
}

export const MessageSchema = new Schema(
  {
    groupId: { type: Types.ObjectId, required: true },
    text: String,
    isArchived: { type: Boolean, required: true, default: false },
    images: [{ key: { type: String, required: true }, location: String, createdAt: Date }],
    userId: { type: Types.ObjectId, ref: 'user', required: true },
    userName: { type: String, ref: 'user', required: true }
  },
  { timestamps: true }
);

MessageSchema.index({ groupId: 1, createdAt: 1 });

MessageSchema.pre('save', function(done) {
  this.__v!++;
  // @ts-ignore
  this.$where = { __v: this.get('__v') - 1 };
  done();
});

MessageSchema.statics.build = async (attrs: MessageAttrs) => {
  let user = await User.findOne({ _id: attrs.userId });
  if (!user) throw new Error('user does not exist');
  return new Message({ ...attrs, userName: user.name });
};

export const Message = model<MessageDoc, MessageModel>('group', MessageSchema);

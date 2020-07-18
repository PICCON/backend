import mongoose, { Schema, model, Types } from 'mongoose';

interface MessageAttrs {}

interface MessageDoc extends mongoose.Document {}

interface MessageModel extends mongoose.Model<MessageDoc> {
  build(attrs: MessageAttrs): MessageDoc;
}

export const MessageSchema = new Schema(
  {
    text: String,
    images: [{ key: { type: String, required: true } }],
    createdAt: { type: Date, required: true },
    userId: { type: Types.ObjectId, ref: 'user', required: true },
    userName: { type: String, ref: 'user', required: true }
  },
  { timestamps: true }
);

MessageSchema.pre('save', function(done) {
  this.__v!++;
  // @ts-ignore
  this.$where = { __v: this.get('__v') - 1 };
  done();
});

model<MessageDoc, MessageModel>('group', MessageSchema);

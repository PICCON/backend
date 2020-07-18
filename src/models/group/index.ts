import mongoose, { Schema, model, Types } from 'mongoose';
import { MessageSchema } from '../message';
interface GroupAttrs {}

interface GroupDoc extends mongoose.Document {}

interface GroupModel extends mongoose.Model<GroupDoc> {
  build(attrs: GroupAttrs): GroupDoc;
}

enum MemberType {
  Normal = 'normal',
  Owner = 'owner'
}

const GroupSchema = new Schema(
  {
    name: { type: String, required: true },
    creator: {
      userId: { type: Types.ObjectId, ref: 'user', required: true },
      name: { type: String, required: true }
    },
    isArchived: { type: Boolean, required: true, default: false },
    members: [
      {
        userId: { type: Types.ObjectId, ref: 'user', required: true },
        name: { type: String, required: true },
        joinedAt: { type: Date, required: true },
        type: { type: String, enum: Object.values(MemberType) },
        unreadMessageCount: { type: Number, required: true, default: 0 }
      }
    ],
    lastMessage: MessageSchema
  },
  { timestamps: true }
);

GroupSchema.pre('save', function(done) {
  this.__v!++;
  // @ts-ignore
  this.$where = { __v: this.get('__v') - 1 };
  done();
});

model<GroupDoc, GroupModel>('group', GroupSchema);

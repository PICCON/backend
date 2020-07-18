import mongoose, { Schema, model, Types, isValidObjectId } from 'mongoose';

interface GroupAttrs {
  name: string;
}

interface GroupDoc extends mongoose.Document {
  id: string;
  name: string;
}

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
    members: [
      {
        userId: { type: Types.ObjectId, ref: 'user', required: true },
        name: { type: String, required: true },
        joinedAt: { type: Date, required: true },
        type: { type: String, enum: Object.values(MemberType) },
        unreadMessageCount: { type: Number, required: true, default: 0 }
      }
    ],
    lastMessage: {
      messageId: { type: Types.ObjectId, ref: 'message', required: true },
      text: String,
      images: [{ key: { type: String, required: true } }],
      createdAt: { type: Date, required: true },
      userId: { type: Types.ObjectId, ref: 'user', required: true },
      userName: { type: String, ref: 'user', required: true }
    }
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

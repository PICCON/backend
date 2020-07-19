import mongoose, { Schema, model, Types } from 'mongoose';
import { User } from '../models/user';

interface GroupAttrs {
  name: string;
  creatorId: string;
}

interface GroupDoc extends mongoose.Document {
  name: string;
  creatorId: string;
  creatorName: string;
  isArchived: boolean;
  members: {
    userId: string;
    name: string;
    joinedAt: Date;
    type: MemberType;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

interface GroupModel extends mongoose.Model<GroupDoc> {
  build(attrs: GroupAttrs): Promise<GroupDoc>;
}

enum MemberType {
  Normal = 'normal',
  Owner = 'owner'
}

const GroupSchema = new Schema(
  {
    name: { type: String, required: true },
    creatorId: { type: Types.ObjectId, ref: 'user', required: true },
    creatorName: { type: String, required: true },
    isArchived: { type: Boolean, required: true, default: false },
    members: [
      {
        userId: { type: Types.ObjectId, ref: 'user', required: true },
        name: { type: String, required: true },
        joinedAt: { type: Date, required: true },
        type: { type: String, enum: Object.values(MemberType) }
      }
    ]
  },
  { timestamps: true }
);

GroupSchema.pre('save', function(done) {
  this.__v!++;
  // @ts-ignore
  this.$where = { __v: this.get('__v') - 1 };
  done();
});

GroupSchema.statics.build = async (attrs: GroupAttrs) => {
  let user = await User.findById(attrs.creatorId);
  if (!user) throw new Error('존재하지 않는 creatorId입니다.');
  new Group({ ...attrs, creatorName: user.name });
};

export const Group = model<GroupDoc, GroupModel>('group', GroupSchema);

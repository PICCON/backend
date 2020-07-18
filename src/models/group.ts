import mongoose, { Schema, model, Types } from 'mongoose';

interface GroupAttrs {
  name: string;
  creator: {
    userId: string;
    name: string;
  };
}

interface GroupDoc extends mongoose.Document {
  name: string;
  creator: {
    userId: string;
    name: string;
  };
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

GroupSchema.statics.build = (attrs: GroupAttrs) => new Group(attrs);

export const Group = model<GroupDoc, GroupModel>('group', GroupSchema);

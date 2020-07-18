import mongoose, { Schema, model, Types } from 'mongoose';

interface UserAttrs {}

interface UserDoc extends mongoose.Document {}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

enum RegisterType {
  Kakao = 'kakao',
  Apple = 'apple'
}

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    registerType: { type: String, required: true, enum: Object.values(RegisterType) },
    isArchived: { type: Boolean, required: true, default: false }
  },
  { timestamps: true }
);

UserSchema.pre('save', function(done) {
  this.__v!++;
  // @ts-ignore
  this.$where = { __v: this.get('__v') - 1 };
  done();
});

model<UserDoc, UserModel>('group', UserSchema);

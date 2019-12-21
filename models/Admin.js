import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const Schema = mongoose.Schema;

/**
 * Like schema that has references to Post and User schema
 */
const adminSchema = Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

adminSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    });
  });
});

export default mongoose.model('Admin', adminSchema);

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
      //index: true, // optimize queries
    },
     password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false, // 🔒 Hide from query results by default
    },

// 👤 Role & Profile Reference
    role: {
      type: String,
      enum: {
        values: ["patient", "doctor", "admin"],
        message: "Role must be patient, doctor, or admin",
      },
      required: [true, "Role is required"],
      //index: true,
    },
     profileId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "role", // dynamic reference → Patient or Doctor
      // required: function () {
      //   return this.role !== "admin"; // Admin may not have a profile document
      // },
     index: true,
    },
   // ✅ Email Verification
    isVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: String,
    emailVerificationExpires: Date,

    // 🔑 Password Reset
    passwordResetToken: String,
    passwordResetExpires: Date,

   // 🛡️ Account Status & Security
    isActive: {
      type: Boolean,
      default: true,
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: {
      type: Date,
      default: null,
    },
        // 📱 Multi‑Device Session Management (Optional but recommended)
    activeSessions: [
      {
        deviceId: String, // unique identifier from frontend
        deviceInfo: String, // user‑agent or custom name
        ipAddress: String,
        lastActive: { type: Date, default: Date.now },
        refreshTokenHash: String, // hashed refresh token for this device
      },
    ],
        // 📋 Consent & Compliance (GDPR/HIPAA)
    acceptedTermsAt: Date,
    acceptedPrivacyAt: Date,
    dataRetentionConsent: {
      type: Boolean,
      default: true,
    },
        deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
    toJSON: { virtuals: true },
    toObject: { virtuals: true },

});
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});
// 🔐 Hash password before saving (only if modified)

// 🔍 Compare plain password with hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
// 📧 Generate email verification token (returns raw token to send via email)
userSchema.methods.createEmailVerificationToken = function () {
  const rawToken = crypto.randomBytes(32).toString("hex");

  // Store hashed version in DB
  this.emailVerificationToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  return rawToken;
};
// 🔑 Generate password reset token
userSchema.methods.createPasswordResetToken = function () {
  const rawToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 60 * 60 * 1000; // 1 hour
  return rawToken;
};
// 🚫 Check if account is locked (brute‑force protection)
userSchema.methods.isAccountLocked = function () {
  return this.lockUntil && this.lockUntil > Date.now();
};
// ⏫ Increment failed login attempts (call on failed login)
userSchema.methods.incrementLoginAttempts = async function () {
  // If lock has expired, reset attempts
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return await this.updateOne({
      $set: { loginAttempts: 1 },
      $unset: { lockUntil: 1 },
    });
  }
  // Increment and lock if threshold reached (5 attempts)
  const updates = { $inc: { loginAttempts: 1 } };
  if (this.loginAttempts + 1 >= 5 && !this.isAccountLocked()) {
    updates.$set = { lockUntil: Date.now() + 30 * 60 * 1000 }; // lock for 30 min
  }
  return await this.updateOne(updates);
};
// ✅ Reset login attempts on successful login
userSchema.methods.resetLoginAttempts = function () {
  return this.updateOne({
    $set: { loginAttempts: 0 },
    $unset: { lockUntil: 1 },
  });
};

// 🧹 Soft delete method
userSchema.methods.softDelete = function () {
  this.isActive = false;
  this.deletedAt = new Date();
  return this.save();
};

// 📊 Indexes for performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ createdAt: -1 });
const User = mongoose.model('User',userSchema);
module.exports = User;
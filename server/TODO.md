# Signup Backend Endpoint Implementation - Health Care App

Status: Planning complete. Implementing ideal production-ready signup (POST /api/auth/signup) with User model, bcrypt hashing, JWT token, validation.

**Final Fields:** name (req), email (unique), password (hashed), phone (opt), role ('patient'| 'doctor'|'admin')

## Detailed Steps:
- [ ] Step 1: Install deps `cd Ai_Health_Care_system/server && npm install bcryptjs jsonwebtoken`
- [ ] Step 2: Create models/User.js (schema + pre-save hash)
- [ ] Step 3: Create controllers/authController.js (signup logic with validation/JWT)
- [ ] Step 4: Create routes/auth.js (POST /signup)
- [ ] Step 5: Update server.js (add middleware + mount routes, remove placeholder)
- [ ] Step 6: Add JWT_SECRET to .env
- [ ] Step 7: Test endpoint
- [ ] Step 8: Complete!

Current progress marked after each step.


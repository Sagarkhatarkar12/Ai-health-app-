# 🏥 AI Health App

A full-stack telemedicine platform connecting patients and doctors with AI-powered medicine information, video consultations, and appointment management.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Vue](https://img.shields.io/badge/Vue-3.4-42b883)
![Node](https://img.shields.io/badge/Node-20+-339933)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-47A248)

---

## ✨ Features

### 👤 Patient Side
- **User Authentication** – Register/login with JWT
- **Doctor Search** – Find doctors by name or specialization
- **Book Appointments** – View real‑time availability and book slots
- **Video Consultations** – Join secure video calls with doctors
- **AI Medicine Info** – Get uses, dosage, side effects, and warnings
- **Ayurvedic Chat** – Natural remedy suggestions
- **Appointment History** – Track past and upcoming visits

### 👨‍⚕️ Doctor Side
- **Dashboard Overview** – Stats, today's appointments, recent patients
- **Availability Manager** – Set and manage time slots visually
- **Appointment Management** – View, reschedule, or complete appointments
- **Patient Records** – Quick access to patient history
- **Video Call Integration** – One‑click start for consultations
- **Prescription Writing** – (coming soon)

### 🤖 AI Features
- Medicine information via OpenRouter (Llama 3)
- Ayurvedic home remedies chat
- Smart slot filtering (hides booked times)

---

## 🛠️ Tech Stack

| Layer       | Technologies                                                                 |
|-------------|-------------------------------------------------------------------------------|
| **Frontend**| Vue 3, Vite, Pinia, Vue Router, Tailwind CSS, Lucide Icons, Socket.IO Client |
| **Backend** | Node.js, Express, MongoDB (Mongoose), Socket.IO, JWT, Bcrypt, Multer         |
| **AI**      | OpenRouter API (Llama 3 8B Instruct)                                          |
| **Real-time**| Socket.IO (video calls & live updates)                                       |

---

## 📦 Installation

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- OpenRouter API key ([get one here](https://openrouter.ai/))

### 1. Clone the Repository
```bash
ai-health-app/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Register/login logic
│   │   ├── medicineController.js # AI medicine info
│   │   ├── ayurvedic.js          # Ayurvedic chat
│   │   └── videoCallController.js
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT protection
│   │   └── upload.js             # Multer file upload
│   ├── models/
│   │   ├── User.js
│   │   ├── Appointment.js
│   │   └── Availability.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── server.js                 # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── NavBar.vue
│   │   │   ├── MedicineCard.vue
│   │   │   └── doctor/
│   │   │       └── AvailabilityManager.vue
│   │   ├── pages/
│   │   │   ├── Home.vue
│   │   │   ├── LoginPage.vue
│   │   │   ├── SignupPage.vue
│   │   │   ├── PatientDashboard.vue
│   │   │   └── DoctorDashboard.vue
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── doctorService.js
│   │   │   └── appointmentService.js
│   │   ├── stores/
│   │   │   └── auth.js            # Pinia auth store
│   │   ├── router/
│   │   │   └── index.js
│   │   ├── App.vue
│   │   └── main.js
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json

git clone https://github.com/your-username/ai-health-app.git
cd ai-health-app

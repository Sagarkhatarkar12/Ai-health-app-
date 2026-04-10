<template>
  <div class="call-page">
    <div class="call-container">
      <div class="call-header">
        <div class="status-badge">
          <span class="pulse"></span>
          Live Call
        </div>
        <h1>Video Consultation</h1>
        <p>Secure & high-quality connection</p>
      </div>
      <div class="video-wrapper">
        <VideoCall />
      </div>
      <div class="call-controls">
        <button class="control-btn mic">
          <MicIcon />
        </button>
        <button class="control-btn cam">
          <CameraIcon />
        </button>
        <button class="control-btn end">
          <PhoneOffIcon />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import VideoCall from './videoCall.vue'
// Icons – you can replace with lucide-vue-next or any icon set
import { Mic, Camera, PhoneOff } from 'lucide-vue-next'
</script>

<style scoped>
/* Modern gradient background with animated shift */
.call-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-size: 200% 200%;
  animation: gradientShift 8s ease infinite;
  padding: 1rem;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Glassmorphic container */
.call-container {
  max-width: 1200px;
  width: 100%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border-radius: 2rem;
  padding: 1.5rem;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
}

.call-container:hover {
  transform: scale(1.01);
}

/* Header styling */
.call-header {
  text-align: center;
  margin-bottom: 1.5rem;
  color: white;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  padding: 0.4rem 1rem;
  border-radius: 40px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 1rem;
}

.pulse {
  width: 10px;
  height: 10px;
  background-color: #10b981;
  border-radius: 50%;
  display: inline-block;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(1.2); opacity: 0; }
}

.call-header h1 {
  font-size: 2rem;
  margin: 0.5rem 0;
  font-weight: 600;
  letter-spacing: -0.5px;
}

.call-header p {
  opacity: 0.9;
  font-size: 0.95rem;
  margin: 0;
}

/* Video wrapper – elegant card effect */
.video-wrapper {
  background: #00000020;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 20px 35px -10px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin-bottom: 1.5rem;
  transition: all 0.2s;
}

/* Controls row */
.call-controls {
  display: flex;
  justify-content: center;
  gap: 1.2rem;
  flex-wrap: wrap;
}

.control-btn {
  background: rgba(30, 30, 40, 0.7);
  backdrop-filter: blur(8px);
  border: none;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.control-btn:hover {
  transform: translateY(-3px);
  background: rgba(50, 50, 70, 0.9);
}

.control-btn.end {
  background: #dc2626;
}

.control-btn.end:hover {
  background: #b91c1c;
  transform: scale(1.05);
}

/* Responsive */
@media (max-width: 640px) {
  .call-container {
    padding: 1rem;
  }
  .call-header h1 {
    font-size: 1.5rem;
  }
  .control-btn {
    width: 48px;
    height: 48px;
  }
}
</style>
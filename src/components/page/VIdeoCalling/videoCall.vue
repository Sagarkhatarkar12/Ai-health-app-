<template>
  <div class="video-call">
    <!-- Animated background -->
    <div class="call-background" :class="{ 'in-call': isCalling }"></div>

    <!-- Remote video area -->
    <div class="remote-video-container">
      <video ref="remoteVideo" autoplay class="remote-video" />

      <!-- Call info overlay (only during call) -->
      <div class="call-info" v-if="isCalling">
        <div class="quality-badge" :class="networkQuality">
          <SignalIcon :size="12" />
          <span>{{ networkQualityText }}</span>
        </div>
        <div class="timer">{{ callDuration }}</div>
      </div>

      <!-- Waiting overlay (only when not in call) -->
      <div class="waiting-overlay" v-if="!isCalling">
        <div class="waiting-animation">
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
        </div>
        <p>Ready to connect</p>
        <button class="fake-start" @click="startCall">Start a call</button>
      </div>
    </div>

    <!-- Local video (always visible, draggable) -->
    <div class="local-video-wrapper" :class="{ minimized: !cameraOn }" :style="localVideoStyle" @mousedown="startDrag">
      <video ref="localVideo" autoplay muted class="local-video" />
      <div class="local-controls">
        <button @click="toggleCamera" class="icon-btn" :title="cameraOn ? 'Turn off' : 'Turn on'">
          <CameraIcon :size="16" />
        </button>
        <button @click="toggleMic" class="icon-btn" :title="micOn ? 'Mute' : 'Unmute'">
          <MicIcon :size="16" :class="{ muted: !micOn }" />
        </button>
        <div class="drag-handle">⋮⋮</div>
      </div>
      <div class="local-label">You</div>
    </div>

    <!-- Glass control bar -->
    <div class="controls-glass">
      <div class="controls-left">
        <button @click="startCall" :disabled="isCalling" class="ctrl-btn start">
          <PhoneIcon :size="20" />
          <span>Start</span>
        </button>
        <button @click="endCall" :disabled="!isCalling" class="ctrl-btn end">
          <PhoneOffIcon :size="20" />
          <span>End</span>
        </button>
        <button @click="shareScreen" :disabled="!isCalling" class="ctrl-btn screen">
          <MonitorIcon :size="20" />
          <span>Share</span>
        </button>
        <button @click="toggleFullscreen" class="ctrl-btn">
          <MaximizeIcon :size="20" />
          <span>Full</span>
        </button>
      </div>
      <div class="controls-right">
        <button @click="showSettings = !showSettings" class="ctrl-btn">
          <SettingsIcon :size="20" />
        </button>
      </div>
    </div>

    <!-- Settings panel -->
    <transition name="slide-up">
      <div class="settings-panel" v-if="showSettings">
        <h4>Call Settings</h4>
        <label>
          <input type="checkbox" v-model="preferHighQuality" />
          Prefer high quality
        </label>
        <label>
          <input type="checkbox" v-model="echoCancellation" />
          Echo cancellation
        </label>
        <select v-model="selectedCamera">
          <option v-for="cam in cameras" :key="cam.deviceId" :value="cam.deviceId">
            {{ cam.label || `Camera ${cam.deviceId.slice(0, 5)}` }}
          </option>
        </select>
      </div>
    </transition>

    <!-- Chat sidebar (improved) -->
    <div class="chat-sidebar" :class="{ open: chatOpen }">
      <div class="chat-header">
        <h3>Chat</h3>
        <button @click="chatOpen = false" class="close-chat">✕</button>
      </div>
      <div class="chat-messages" ref="chatMessages">
        <div class="message system">✨ Welcome! Start a call to chat.</div>
      </div>
      <div class="chat-input">
        <input type="text" placeholder="Type a message..." v-model="chatMessage" @keyup.enter="sendMessage"
          :disabled="!isCalling" />
        <button @click="sendMessage" :disabled="!isCalling">Send</button>
      </div>
    </div>
    <button class="toggle-chat" @click="chatOpen = !chatOpen">
      <MessageCircleIcon :size="22" />
    </button>

    <!-- Toast notifications -->
    <div class="toast-container">
      <transition-group name="toast">
        <div v-for="toast in toasts" :key="toast.id" class="toast" :class="toast.type">
          {{ toast.message }}
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from "vue";
import { io } from "socket.io-client";
import SimplePeer from "simple-peer/simplepeer.min.js";

import {
  PhoneIcon,
  PhoneOffIcon,
  MonitorIcon,
  CameraIcon,
  MicIcon,
  SignalIcon,
  MaximizeIcon,
  SettingsIcon,
  MessageCircleIcon,
} from "lucide-vue-next";
// --- Refs ---
// all varibale jab inki value koi change hota automatic chnage
const localVideo = ref(null);
const remoteVideo = ref(null);
const peer = ref(null);
const isCalling = ref(false);
const cameraOn = ref(true);
const micOn = ref(true);
const networkQuality = ref("good");
const callDuration = ref("00:00");
const showSettings = ref(false);
const chatOpen = ref(false);
const preferHighQuality = ref(true);
const echoCancellation = ref(true);
const cameras = ref([]);
const selectedCamera = ref("");
const toasts = ref([]);
const chatMessage = ref("");
const chatMessages = ref(null);
let callStartTime = null;
let durationInterval = null;
let qualityInterval = null;
let previewStream = null; // store preview stream
let currentCallStream = null;

const socket = io("http://localhost:3000"); // isse backend me request jati hai connection jamane ke liye

// // --- Draggable local video ---
const localVideoPos = ref({ x: 20, y: window.innerHeight - 240 });
const isDragging = ref(false);
let dragOffset = { x: 0, y: 0 };

const localVideoStyle = computed(() => ({
  transform: `translate(${localVideoPos.value.x}px, ${localVideoPos.value.y}px)`,
}));

function updateBoundaries() {
  const maxX = window.innerWidth - 260;
  const maxY = window.innerHeight - 200;
  localVideoPos.value.x = Math.min(maxX, Math.max(10, localVideoPos.value.x));
  localVideoPos.value.y = Math.min(maxY, Math.max(10, localVideoPos.value.y));
}

// starting drag
function startDrag(e) {
  if (e.target.closest(".icon-btn")) return;
  isDragging.value = true;
  dragOffset.x = e.clientX - localVideoPos.value.x;
  dragOffset.y = e.clientY - localVideoPos.value.y;
  document.addEventListener("mousemove", onDrag); //ondarag me function kam kartahai
  document.addEventListener("mouseup", stopDrag);
}

function onDrag(e) {
  if (!isDragging.value) return;
  let newX = e.clientX - dragOffset.x;
  let newY = e.clientY - dragOffset.y;
  const maxX = window.innerWidth - 260;
  const maxY = window.innerHeight - 200;
  newX = Math.min(maxX, Math.max(10, newX));
  newY = Math.min(maxY, Math.max(10, newY));
  // video tage isme client
  localVideoPos.value = { x: newX, y: newY };
}

function stopDrag() {
  // stop drag
  isDragging.value = false;
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
}

window.addEventListener("resize", updateBoundaries);

// // --- Helper: Show toast ---
function addToast(message, type = "info") {
  const id = Date.now();
  toasts.value.push({ id, message, type });
  setTimeout(() => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }, 3000);
}

// // --- Chat functionality ---
// function sendMessage() {
//   if (!isCalling.value) {
//     addToast('Start a call to send messages', 'warning')
//     return
//   }

//   if (!chatMessage.value.trim()) return
//   const msgDiv = document.createElement('div')
//   msgDiv.className = 'message you'
//   msgDiv.innerText = `You: ${chatMessage.value}`
//   chatMessages.value?.appendChild(msgDiv)
//   // Auto-scroll
//   if (chatMessages.value) chatMessages.value.scrollTop = chatMessages.value.scrollHeight
//   chatMessage.value = ''
//   // In real app, emit to socket
//   socket.emit('chat_message', { text: chatMessage.value, from: 'local' })
// }

// // --- Media & Call Logic ---

async function startCall() {
  if (isCalling.value) return;
  try {
    // Stop preview stream first
    if (previewStream) {
      previewStream.getTracks().forEach((track) => track.stop());
      previewStream = null;
    }
    // Get full stream for call
    const stream = await navigator.mediaDevices.getUserMedia({
      video: cameraOn.value,
      audio: { echoCancellation: echoCancellation.value },
    });

    currentCallStream = stream;
    localVideo.value.srcObject = stream;
    // Room join  kar liya hai

    socket.emit("join-room", {
      room: "room",
      username: "user1" + Math.random(100),
    });
    // peer connection fir bej rhe hai
    // const isInitiator = window.location.hash === "#1"; // test ke liye

  }
  catch (err) {
    addToast("Cannot access camera/mic", "error");
    console.error(err);
  }






}
// isme two room add hone logo me diffrence pata karte hai ki kaun client hai or kaun server hai 

socket.on("init", ({ initiator }) => {
  createPeer(initiator, currentCallStream);
})


// creating peer  it is in video calling features
async function createPeer(initiator, stream) {
  // simple peer connection setup kar frontend se backend se


  peer.value = new SimplePeer({
    initiator: initiator,
    stream: stream,
    trickle: true,
    config: { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] },
  });
  // 

  console.log("Peer is connected");
  // on signal me data ko bejta hai 
  peer.value.on("signal", (data) =>
    socket.emit("signal", {
      room: "room",
      data: data,
    }),
  );
  socket.on("signal", (data) => peer.value.signal(data));

  peer.value.on("stream", (remoteStream) => {
    remoteVideo.value.srcObject = remoteStream;
  });

  peer.value.on("error", (err) => addToast("Connection error", "error"));
  isCalling.value = true;
  callStartTime = Date.now();
  durationInterval = setInterval(updateTimer, 1000);
  startQualityMonitoring();
  addToast("Call started", "success");
}


// function endCall() {
//   if (peer.value) {
//     peer.value.destroy()
//     peer.value = null
//   }
//   if (currentCallStream) {
//     currentCallStream.getTracks().forEach(track => track.stop())
//     currentCallStream = null
//   }
//   // Restore preview stream
//   navigator.mediaDevices.getUserMedia({ video: cameraOn.value, audio: false })
//     .then(stream => {
//       previewStream = stream
//       localVideo.value.srcObject = stream
//     })
//     .catch(err => console.warn('Preview stream failed', err))
//   remoteVideo.value.srcObject = null
//   isCalling.value = false
//   clearInterval(durationInterval)
//   clearInterval(qualityInterval)
//   callDuration.value = '00:00'
//   addToast('Call ended', 'info')
// }

function updateTimer() {
  if (!callStartTime) return;
  const diff = Math.floor((Date.now() - callStartTime) / 1000);
  const mins = Math.floor(diff / 60)
    .toString()
    .padStart(2, "0");
  const secs = (diff % 60).toString().padStart(2, "0");
  callDuration.value = `${mins}:${secs}`;
}

function startQualityMonitoring() {
  qualityInterval = setInterval(() => {
    const rtt = Math.random() * 200;
    if (rtt < 50) networkQuality.value = "good";
    else if (rtt < 150) networkQuality.value = "medium";
    else networkQuality.value = "poor";
  }, 2000);
}

const networkQualityText = computed(() => {
  if (networkQuality.value === "good") return "Good";
  if (networkQuality.value === "medium") return "Medium";
  return "Poor";
});

// async function shareScreen() {
//   if (!isCalling.value) return
//   try {
//     const displayStream = await navigator.mediaDevices.getDisplayMedia({ video: true })
//     if (peer.value) {
//       displayStream.getTracks().forEach(track => {
//         peer.value.addTrack(track, peer.value.stream)
//         track.onended = () => peer.value.removeTrack(track)
//       })
//       addToast('Screen sharing started', 'info')
//     }
//   } catch (err) {
//     addToast('Screen share cancelled or failed', 'warning')
//   }
// }

function toggleCamera() {
  cameraOn.value = !cameraOn.value;
  const stream = localVideo.value?.srcObject;
  if (stream) {
    stream
      .getVideoTracks()
      .forEach((track) => (track.enabled = cameraOn.value));
  }
  addToast(`Camera ${cameraOn.value ? "on" : "off"}`, "info");
}

function toggleMic() {
  micOn.value = !micOn.value;
  const stream = localVideo.value?.srcObject;
  if (stream) {
    stream.getAudioTracks().forEach((track) => (track.enabled = micOn.value));
  }
  addToast(`Microphone ${micOn.value ? "unmuted" : "muted"}`, "info");
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    addToast("Fullscreen mode", "info");
  } else {
    document.exitFullscreen();
  }
}

// // --- Get available cameras ---
async function getCameras() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  cameras.value = devices.filter((d) => d.kind === "videoinput");
  if (cameras.value.length) selectedCamera.value = cameras.value[0].deviceId;
}

// // --- Preview camera on load ---
async function initPreview() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    console.log(stream);
    previewStream = stream;
    if (localVideo.value) {
      localVideo.value.srcObject = stream;
    }
  } catch (err) {
    console.warn("Camera preview not available", err);
    addToast("Could not access camera", "error");
  }
}

onMounted(async () => {
  await getCameras();
  await initPreview();
  updateBoundaries();
});

watch(selectedCamera, async (newId) => {
  if (isCalling.value) return;
  if (!newId) return;
  // Switch camera for preview
  if (previewStream) {
    previewStream.getTracks().forEach((track) => track.stop());
  }
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { deviceId: newId },
  });
  previewStream = stream;
  localVideo.value.srcObject = stream;
});

onUnmounted(() => {
  socket.disconnect();
  if (peer.value) peer.value.destroy();
  if (previewStream) previewStream.getTracks().forEach((t) => t.stop());
  if (currentCallStream) currentCallStream.getTracks().forEach((t) => t.stop());
  window.removeEventListener("resize", updateBoundaries);
});
</script>

<style scoped>
/* Reset & base – no overflow */
* {
  box-sizing: border-box;
}

.video-call {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  font-family:
    "Inter",
    system-ui,
    -apple-system,
    sans-serif;
  background: #0a0a0a;
}

/* Animated background */
.call-background {
  position: fixed;
  inset: 0;
  background: radial-gradient(circle at 20% 30%, #1a1a2e, #0a0a0a);
  transition: opacity 0.5s;
  z-index: 0;
}

.call-background.in-call {
  background: radial-gradient(circle at 80% 20%, #0f172a, #020617);
}

/* Remote video fullscreen */
.remote-video-container {
  position: fixed;
  inset: 0;
  background: #000;
  z-index: 1;
}

.remote-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Call info overlay */
.call-info {
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  gap: 12px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  padding: 6px 14px;
  border-radius: 40px;
  color: white;
  font-size: 0.8rem;
  z-index: 15;
}

.quality-badge {
  display: flex;
  align-items: center;
  gap: 4px;
}

.quality-badge.good {
  color: #10b981;
}

.quality-badge.medium {
  color: #f59e0b;
}

.quality-badge.poor {
  color: #ef4444;
}

.timer {
  font-family: monospace;
  font-weight: 600;
}

/* Waiting overlay – only shown when not in call */
.waiting-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  color: white;
  z-index: 10;
}

.waiting-animation {
  display: flex;
  gap: 8px;
}

.wave {
  width: 6px;
  height: 30px;
  background: #3b82f6;
  border-radius: 4px;
  animation: wave 1s infinite ease-in-out;
}

.wave:nth-child(2) {
  animation-delay: 0.1s;
}

.wave:nth-child(3) {
  animation-delay: 0.2s;
}

@keyframes wave {

  0%,
  100% {
    transform: scaleY(0.5);
  }

  50% {
    transform: scaleY(1.5);
  }
}

.fake-start {
  background: #3b82f6;
  border: none;
  padding: 10px 24px;
  border-radius: 40px;
  color: white;
  cursor: pointer;
  font-weight: 500;
  transition: transform 0.1s;
}

.fake-start:hover {
  transform: scale(1.02);
}

/* Local video – always visible, draggable, high z-index */
.local-video-wrapper {
  position: fixed;
  width: 240px;
  background: #1e1e2e;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 35px -12px black;
  border: 2px solid rgba(255, 255, 255, 0.3);
  cursor: grab;
  transition: box-shadow 0.2s;
  z-index: 100;
  /* Ensure on top of everything */
  will-change: transform;
}

.local-video-wrapper:active {
  cursor: grabbing;
}

.local-video {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  background: #2a2a2a;
}

.local-controls {
  position: absolute;
  bottom: 8px;
  right: 8px;
  display: flex;
  gap: 6px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 30px;
  padding: 4px 8px;
}

.icon-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: inline-flex;
}

.icon-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.drag-handle {
  margin-left: 6px;
  cursor: grab;
  font-size: 14px;
  user-select: none;
}

.local-label {
  position: absolute;
  bottom: 8px;
  left: 8px;
  background: rgba(0, 0, 0, 0.6);
  padding: 2px 8px;
  border-radius: 20px;
  font-size: 0.7rem;
  color: white;
}

/* Glass control bar */
.controls-glass {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(20, 20, 30, 0.8);
  backdrop-filter: blur(20px);
  border-radius: 60px;
  padding: 10px 20px;
  display: flex;
  gap: 20px;
  z-index: 30;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.controls-left,
.controls-right {
  display: flex;
  gap: 12px;
}

.ctrl-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 8px 16px;
  border-radius: 40px;
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.ctrl-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.ctrl-btn.start {
  background: #10b981;
}

.ctrl-btn.end {
  background: #ef4444;
}

.ctrl-btn.screen {
  background: #3b82f6;
}

.ctrl-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Settings panel */
.settings-panel {
  position: fixed;
  bottom: 100px;
  right: 30px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(12px);
  padding: 16px;
  border-radius: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 240px;
  z-index: 35;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: 0.2s;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Chat sidebar – no overlap, smooth */
.chat-sidebar {
  position: fixed;
  top: 0;
  right: -360px;
  width: 360px;
  height: 100%;
  background: rgba(20, 20, 30, 0.95);
  backdrop-filter: blur(20px);
  transition: right 0.3s ease;
  z-index: 200;
  display: flex;
  flex-direction: column;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: -5px 0 20px rgba(0, 0, 0, 0.3);
}

.chat-sidebar.open {
  right: 0;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  color: white;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.3);
}

.chat-header h3 {
  margin: 0;
}

.close-chat {
  background: none;
  border: none;
  color: white;
  font-size: 1.4rem;
  cursor: pointer;
  padding: 0 8px;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message {
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 12px;
  border-radius: 18px;
  color: white;
  max-width: 80%;
  align-self: flex-start;
  font-size: 0.9rem;
}

.message.you {
  background: #3b82f6;
  align-self: flex-end;
}

.message.system {
  background: rgba(255, 255, 255, 0.05);
  font-style: italic;
  font-size: 0.75rem;
  text-align: center;
  align-self: center;
}

.chat-input {
  display: flex;
  padding: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.3);
}

.chat-input input {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 10px 14px;
  border-radius: 30px;
  color: white;
  outline: none;
}

.chat-input input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.chat-input button {
  background: #3b82f6;
  border: none;
  margin-left: 8px;
  padding: 0 16px;
  border-radius: 30px;
  color: white;
  cursor: pointer;
}

.chat-input button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.toggle-chat {
  position: fixed;
  bottom: 100px;
  right: 20px;
  background: #3b82f6;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 45;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.1s;
}

.toggle-chat:hover {
  transform: scale(1.05);
}

/* Toast notifications */
.toast-container {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 300;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.toast {
  background: #333;
  color: white;
  padding: 8px 16px;
  border-radius: 40px;
  font-size: 0.85rem;
  animation: slideIn 0.2s ease;
}

.toast.success {
  background: #10b981;
}

.toast.error {
  background: #ef4444;
}

.toast.warning {
  background: #f59e0b;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.toast-enter-active,
.toast-leave-active {
  transition: 0.2s;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Responsive */
@media (max-width: 640px) {
  .local-video-wrapper {
    width: 140px;
  }

  .ctrl-btn span {
    display: none;
  }

  .ctrl-btn {
    padding: 10px;
  }

  .controls-glass {
    padding: 8px 12px;
    gap: 8px;
  }

  .chat-sidebar {
    width: 85%;
    right: -85%;
  }

  .toggle-chat {
    bottom: 80px;
    right: 12px;
    width: 42px;
    height: 42px;
  }

  .call-info {
    top: 10px;
    left: 10px;
    font-size: 0.7rem;
  }
}
</style>

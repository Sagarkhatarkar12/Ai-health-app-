<template>
  <div class="chat">
    <div class="chat-header">
      <h3>💬 Live Chat</h3>
      <button v-if="showClose" @click="$emit('close')" class="close-btn">✕</button>
    </div>

    <div class="chat-messages" ref="messagesContainer">
      <div
        v-for="msg in messages"
        :key="msg.id"
        class="message"
        :class="{
          'my-message': msg.sender === currentUsername && msg.sender !== 'system',
          'other-message': msg.sender !== currentUsername && msg.sender !== 'system',
          'system-message': msg.sender === 'system'
        }"
      >
        <div class="message-sender" v-if="msg.sender !== currentUsername && msg.sender !== 'system'">
          {{ msg.sender }}
        </div>
        <div class="message-bubble">
          <span class="message-text">{{ msg.text }}</span>
        </div>
        <div class="message-time">{{ formatTime(msg.timestamp) }}</div>
      </div>
      
      <!-- Typing indicator -->
      <div class="typing-indicator" v-if="isTyping && isCallActive">
        <span></span><span></span><span></span>
        <span class="typing-text">{{ typingUsername }} is typing...</span>
      </div>
    </div>

    <div class="input-area">
      <button class="emoji-btn" @click="toggleEmojiPicker">😊</button>
      <input
        type="text"
        v-model="newMessage"
        @keyup.enter="sendMessage"
        @keyup="handleTyping"
        placeholder="Type a message..."
        :disabled="!isCallActive"
        class="input"
      />
      <button @click="sendMessage" :disabled="!isCallActive" class="send-button">
        Send
      </button>
    </div>

    <!-- Simple emoji picker (optional) -->
    <div class="emoji-picker" v-if="showEmojiPicker">
      <span @click="addEmoji('😊')">😊</span>
      <span @click="addEmoji('😂')">😂</span>
      <span @click="addEmoji('❤️')">❤️</span>
      <span @click="addEmoji('👍')">👍</span>
      <span @click="addEmoji('😢')">😢</span>
      <span @click="addEmoji('🎉')">🎉</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  socket: { type: Object, required: true },
  roomId: { type: String, required: true },
  currentUsername: { type: String, required: true },
  isCallActive: { type: Boolean, default: false },
  showClose: { type: Boolean, default: true }
})

const emit = defineEmits(['close'])

const messages = ref([])
const newMessage = ref('')
const messagesContainer = ref(null)
const isTyping = ref(false)
const typingUsername = ref('')
const showEmojiPicker = ref(false)
let typingTimeout = null

// Scroll to bottom
function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

// Format timestamp
function formatTime(timestamp) {
  const date = new Date(timestamp)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// Add system message
function addSystemMessage(text) {
  messages.value.push({
    id: Date.now(),
    text,
    sender: 'system',
    timestamp: new Date().toISOString()
  })
  scrollToBottom()
}

// Send message
function sendMessage() {
  if (!props.isCallActive) return
  if (!newMessage.value.trim()) return

  const msgText = newMessage.value.trim()
  const newMsg = {
    id: Date.now(),
    text: msgText,
    sender: props.currentUsername,
    timestamp: new Date().toISOString()
  }
  messages.value.push(newMsg)
  scrollToBottom()

  // Emit to backend
  props.socket.emit('chat-message', {
    room: props.roomId,
    msg: msgText,
    username: props.currentUsername,
    timestamp: new Date().toISOString()
  })

  newMessage.value = ''
  showEmojiPicker.value = false
}

// Handle typing indicator
function handleTyping() {
  if (!props.isCallActive) return
  props.socket.emit('typing', {
    room: props.roomId,
    username: props.currentUsername
  })
  if (typingTimeout) clearTimeout(typingTimeout)
  typingTimeout = setTimeout(() => {
    // Typing stopped
  }, 1000)
}

// Receive incoming message
function onChatMessage(data) {
  const { msg, username, timestamp } = data
  messages.value.push({
    id: Date.now(),
    text: msg,
    sender: username,
    timestamp: timestamp || new Date().toISOString()
  })
  scrollToBottom()
}

// Receive typing event
function onTyping(data) {
  const { username } = data
  if (username !== props.currentUsername && props.isCallActive) {
    isTyping.value = true
    typingUsername.value = username
    setTimeout(() => {
      isTyping.value = false
    }, 1500)
  }
}

// Emoji picker
function toggleEmojiPicker() {
  showEmojiPicker.value = !showEmojiPicker.value
}
function addEmoji(emoji) {
  newMessage.value += emoji
  showEmojiPicker.value = false
}

// Lifecycle
onMounted(() => {
  if (props.socket) {
    props.socket.on('chat-message', onChatMessage)
    props.socket.on('typing', onTyping)
  }
  addSystemMessage('✨ Welcome! Start a call to chat.')
})

onUnmounted(() => {
  if (props.socket) {
    props.socket.off('chat-message', onChatMessage)
    props.socket.off('typing', onTyping)
  }
  if (typingTimeout) clearTimeout(typingTimeout)
})

// Watch call active status
watch(() => props.isCallActive, (active) => {
  if (active) {
    addSystemMessage('🔵 Call started – you can now chat.')
  } else {
    addSystemMessage('🔴 Call ended – chat disabled.')
  }
})
</script>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: rgba(20, 20, 30, 0.95);
  backdrop-filter: blur(20px);
  color: white;
  font-family: system-ui, -apple-system, sans-serif;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.3);
}
.chat-header h3 {
  margin: 0;
  font-size: 1.1rem;
}
.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}
.close-btn:hover { opacity: 1; }

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message {
  display: flex;
  flex-direction: column;
  max-width: 80%;
  animation: fadeInUp 0.2s ease;
}

.my-message {
  align-self: flex-end;
}
.other-message {
  align-self: flex-start;
}
.system-message {
  align-self: center;
  max-width: 90%;
}

.message-sender {
  font-size: 0.7rem;
  margin-bottom: 4px;
  padding-left: 6px;
  opacity: 0.8;
}

.message-bubble {
  padding: 8px 14px;
  border-radius: 18px;
  word-break: break-word;
  font-size: 0.9rem;
  line-height: 1.4;
  transition: transform 0.1s;
}
.my-message .message-bubble {
  background: #3b82f6;
  border-radius: 18px 18px 4px 18px;
}
.other-message .message-bubble {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 18px 18px 18px 4px;
}
.system-message .message-bubble {
  background: rgba(255, 255, 255, 0.08);
  font-style: italic;
  font-size: 0.75rem;
  text-align: center;
  border-radius: 20px;
  padding: 6px 12px;
}

.message-time {
  font-size: 0.65rem;
  opacity: 0.6;
  margin-top: 4px;
  padding: 0 6px;
}
.my-message .message-time { text-align: right; }
.other-message .message-time { text-align: left; }
.system-message .message-time { text-align: center; }

/* Typing indicator */
.typing-indicator {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  background: rgba(255,255,255,0.1);
  border-radius: 20px;
  width: fit-content;
  margin-top: 8px;
  animation: fadeIn 0.2s;
}
.typing-indicator span {
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
  display: inline-block;
  animation: typingBounce 1.2s infinite;
}
.typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
.typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
.typing-text {
  font-size: 0.75rem;
  margin-left: 8px;
  opacity: 0.7;
}
@keyframes typingBounce {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-6px); }
}

.input-area {
  display: flex;
  padding: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.3);
  gap: 8px;
  position: relative;
}
.emoji-btn {
  background: rgba(255,255,255,0.1);
  border: none;
  border-radius: 30px;
  padding: 0 12px;
  cursor: pointer;
  font-size: 1.2rem;
}
.input {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 10px 14px;
  border-radius: 30px;
  color: white;
  outline: none;
  font-size: 0.9rem;
}
.input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}
.send-button {
  background: #3b82f6;
  border: none;
  padding: 0 20px;
  border-radius: 30px;
  color: white;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}
.send-button:hover:not(:disabled) {
  background: #2563eb;
}
.send-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Emoji picker */
.emoji-picker {
  position: absolute;
  bottom: 70px;
  left: 12px;
  background: #2d2d3a;
  border-radius: 20px;
  padding: 8px;
  display: flex;
  gap: 8px;
  z-index: 250;
  backdrop-filter: blur(10px);
}
.emoji-picker span {
  cursor: pointer;
  font-size: 1.3rem;
  transition: transform 0.1s;
}
.emoji-picker span:hover {
  transform: scale(1.2);
}

/* Scrollbar */
.chat-messages::-webkit-scrollbar {
  width: 4px;
}
.chat-messages::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}
.chat-messages::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
"<template>
  <div class="chat">
    <div class="chat-messages" ref="messagesContainer">
      <div v-for="msg in messages" :key="msg.id" class="message">
        <span class="message-content">{{ msg.text }}</span>
        <span class="message-time">{{ formatTime(msg.timestamp) }}</span>
      </div>
    </div>
    <div class="input-area">
      <input        type="text"
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="Type a message..."
        class="input"
      />
      <button @click="sendMessage" class="send-button">Send</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')
const messages = ref([])
const newMessage = ref('')

function sendMessage() {
  if (newMessage.value.trim()) {
    const msg = {
      id: Date.now(),
      text: newMessage.value,
      timestamp: new Date().toISOString(),
    }
    messages.value.push(msg)
    socket.emit('chat message', msg.text)
    newMessage.value = ''
  }
}

socket.on('chat message', (msg) => {
  const m = {
    id: Date.now(),
    text: msg,
    timestamp: new Date().toISOString(),
  }
  messages.value.push(m)
})

function formatTime(timestamp) {
  const date = new Date(timestamp)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}
.chat-messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.message {
  max-width: 80%;
  padding: 8px 12px;
  border-radius: 12px;
  background: #f0f0f0;
  word-wrap: break-word;
}
.message-content {
  display: block;
}
.message-time {
  font-size: 0.75rem;
  color: #666;
  align-self: flex-end;
}
.input-area {
  display: flex;
  border-top: 1px solid #ddd;
  background: #fafafa;
}
.input {
  flex: 1;
  padding: 10px;
  border: none;
  font-size: 1rem;
}
.send-button {
  padding: 10px 20px;
  border: none;
  background: #4f46e5;
  color: white;
  cursor: pointer;
}
.send-button:hover {
  background: #4338ca;
}
</style>
"
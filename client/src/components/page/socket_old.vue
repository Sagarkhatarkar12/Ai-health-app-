<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
  >
    <div class="container mx-auto px-4 py-6 max-w-7xl">
      <!-- Header (same as before) -->
      <div
        class="backdrop-blur-lg bg-white/10 rounded-2xl shadow-xl p-4 mb-6 border border-white/20"
      >
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg"
            >
              <span class="text-white text-xl">💬</span>
            </div>
            <div>
              <h1 class="text-xl font-bold text-white">
                Health<span class="text-cyan-300">Connect</span>
              </h1>
              <p class="text-xs text-white/60">Real-time Communication Hub</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div
              :class="[
                'px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm',
                isConnected
                  ? 'bg-green-500/30 text-green-200 border border-green-400/50'
                  : 'bg-red-500/30 text-red-200 border border-red-400/50',
              ]"
            >
              {{ isConnected ? "🟢 Online" : "🔴 Offline" }}
            </div>
            <button
              @click="toggleTheme"
              class="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <span v-if="isDark" class="text-yellow-300">🌙</span>
              <span v-else class="text-yellow-300">☀️</span>
            </button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- LEFT PANEL (same as before) -->
        <div class="space-y-6">
          <!-- Connection Card -->
          <div
            class="backdrop-blur-lg bg-white/10 rounded-2xl p-5 border border-white/20 shadow-xl"
          >
            <h3
              class="text-white/80 text-sm uppercase tracking-wider mb-3 flex items-center gap-2"
            >
              <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
              Connection
            </h3>
            <div class="space-y-3">
              <input
                v-model="serverUrl"
                type="text"
                class="w-full bg-black/30 text-white placeholder-white/40 rounded-xl px-4 py-2 border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="Server URL"
                :disabled="isConnected"
              />
              <button
                @click="isConnected ? disconnect() : connect()"
                :class="[
                  'w-full py-2 rounded-xl font-semibold transition-all duration-200',
                  isConnected
                    ? 'bg-red-500/80 hover:bg-red-600 text-white'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg',
                ]"
              >
                {{ isConnected ? "🔌 Disconnect" : "🚀 Connect" }}
              </button>
            </div>
          </div>

          <!-- Room Card -->
          <div
            class="backdrop-blur-lg bg-white/10 rounded-2xl p-5 border border-white/20 shadow-xl"
          >
            <h3
              class="text-white/80 text-sm uppercase tracking-wider mb-3 flex items-center gap-2"
            >
              <span class="w-2 h-2 bg-purple-400 rounded-full"></span>
              Room
            </h3>
            <div class="space-y-3">
              <div class="flex gap-2">
                <input
                  v-model="currentRoom"
                  type="text"
                  class="flex-1 bg-black/30 text-white placeholder-white/40 rounded-xl px-4 py-2 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Room name"
                  :disabled="!isConnected"
                />
                <button
                  @click="joinRoom"
                  :disabled="!isConnected || !currentRoom.trim()"
                  class="px-4 py-2 bg-purple-500/80 rounded-xl text-white disabled:opacity-50 transition hover:bg-purple-600"
                >
                  Join
                </button>
              </div>
              <div class="text-xs text-white/50">
                Current:
                <span class="text-cyan-300 font-mono">{{
                  joinedRoom || "—"
                }}</span>
              </div>
            </div>
          </div>

          <!-- Users Online Card -->
          <div
            class="backdrop-blur-lg bg-white/10 rounded-2xl p-5 border border-white/20 shadow-xl"
          >
            <h3
              class="text-white/80 text-sm uppercase tracking-wider mb-3 flex items-center gap-2"
            >
              <span class="w-2 h-2 bg-green-400 rounded-full"></span>
              Online in Room
            </h3>
            <div class="space-y-2 max-h-48 overflow-y-auto custom-scroll">
              <div
                v-for="user in usersInRoom"
                :key="user"
                class="flex items-center gap-2 text-white/80"
              >
                <div
                  class="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                ></div>
                <span class="text-sm">{{ user }}</span>
              </div>
              <div
                v-if="usersInRoom.length === 0"
                class="text-white/40 text-sm italic"
              >
                No one else here
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT PANEL: Chat Messages (Own LEFT, Others RIGHT) -->
        <div class="lg:col-span-2">
          <div
            class="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 shadow-xl flex flex-col h-[600px]"
          >
            <div class="p-4 border-b border-white/20">
              <h2 class="text-white font-semibold flex items-center gap-2">
                <span class="text-xl">💬</span> Room:
                <span class="text-cyan-300">{{
                  joinedRoom || "Not joined"
                }}</span>
              </h2>
            </div>

            <!-- Messages Area -->
            <div
              ref="messagesContainer"
              class="flex-1 overflow-y-auto p-4 space-y-3 custom-scroll"
            >
              <div
                v-for="msg in messages"
                :key="msg.id"
                class="flex"
                :class="msg.isOwn ? 'justify-start' : 'justify-end'"
              >
                <div class="max-w-[75%]">
                  <!-- Show username only for others (on right side) -->
                  <div
                    v-if="!msg.isOwn"
                    class="text-xs text-white/50 mb-1 text-right mr-2"
                  >
                    {{ msg.username }}
                  </div>
                  <div
                    :class="[
                      'p-3 rounded-2xl shadow-md break-words',
                      msg.isOwn
                        ? 'bg-white/20 text-white backdrop-blur-sm rounded-bl-none'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-br-none',
                    ]"
                  >
                    {{ msg.text }}
                  </div>
                  <div
                    class="text-[10px] text-white/30 mt-1"
                    :class="msg.isOwn ? 'ml-2' : 'text-right mr-2'"
                  >
                    {{ formatTime(msg.timestamp) }}
                  </div>
                </div>
              </div>
              <div
                v-if="isTyping && !typingFromSelf"
                class="text-white/40 text-sm italic ml-2"
              >
                {{ typingUsername }} is typing...
              </div>
              <div
                v-if="messages.length === 0 && joinedRoom"
                class="h-full flex items-center justify-center text-white/40"
              >
                No messages yet. Start the conversation!
              </div>
            </div>

            <!-- Input Area -->
            <div class="p-4 border-t border-white/20">
              <div class="flex gap-2">
                <input
                  v-model="messageText"
                  @keyup.enter="sendMessage"
                  @keyup="handleTyping"
                  type="text"
                  class="flex-1 bg-black/30 text-white placeholder-white/40 rounded-xl px-4 py-3 border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="Type your message..."
                  :disabled="!isConnected || !joinedRoom"
                />
                <button
                  @click="sendMessage"
                  :disabled="!isConnected || !joinedRoom || !messageText.trim()"
                  class="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white font-semibold disabled:opacity-50 transition hover:shadow-lg"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Logs Section (same) -->
      <div
        class="mt-6 backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 shadow-xl overflow-hidden"
      >
        <div
          @click="showLogs = !showLogs"
          class="p-4 flex justify-between items-center cursor-pointer hover:bg-white/5 transition"
        >
          <span class="text-white/80 text-sm uppercase tracking-wider"
            >📋 Event Logs</span
          >
          <span class="text-white/50">{{ showLogs ? "▲" : "▼" }}</span>
        </div>
        <div
          v-show="showLogs"
          class="p-4 max-h-48 overflow-y-auto custom-scroll border-t border-white/20"
        >
          <div
            v-for="log in logs"
            :key="log.id"
            class="text-xs font-mono text-white/60 py-1 border-b border-white/10"
          >
            <span class="text-white/30">{{ log.time }}</span>
            <span
              :class="{
                'text-green-300': log.type === 'send',
                'text-blue-300': log.type === 'receive',
                'text-yellow-300': log.type === 'system',
              }"
              class="font-bold ml-2"
              >[{{ log.type.toUpperCase() }}]</span
            >
            <span class="ml-2">{{ log.event }} → {{ log.data }}</span>
          </div>
          <button
            @click="clearLogs"
            class="text-xs text-red-300 mt-2 hover:text-red-200"
          >
            Clear logs
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted, nextTick, watch } from "vue";
import { io } from "socket.io-client";

const serverUrl = ref("http://localhost:3000");
const isConnected = ref(false);
const currentRoom = ref("");
const joinedRoom = ref("");
const messageText = ref("");
const messages = ref([]);
const usersInRoom = ref([]);
const logs = ref([]);
const showLogs = ref(true);
const isTyping = ref(false);
const typingUsername = ref("");
const typingFromSelf = ref(false);
const isDark = ref(true);

let socket = null;
let typingTimeout = null;
const currentUsername = "User_" + Math.floor(Math.random() * 10000);
const messagesContainer = ref(null);

watch(
  messages,
  async () => {
    await nextTick();
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  },
  { deep: true },
);

const formatTime = (timestamp) => {
  if (!timestamp) return "";
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const addLog = (type, event, data) => {
  logs.value.unshift({
    id: Date.now(),
    time: new Date().toLocaleTimeString(),
    type,
    event,
    data: typeof data === "object" ? JSON.stringify(data) : data,
  });
  if (logs.value.length > 50) logs.value.pop();
};

const clearLogs = () => {
  logs.value = [];
};

const connect = () => {
  if (!serverUrl.value) return;
  socket = io(serverUrl.value, { transports: ["websocket"] });

  socket.on("connect", () => {
    isConnected.value = true;
    addLog("system", "connect", "Connected to server");
  });

  socket.on("disconnect", () => {
    isConnected.value = false;
    joinedRoom.value = "";
    usersInRoom.value = [];
    addLog("system", "disconnect", "Disconnected");
  });

  socket.on("chat-message", (data) => {
    messages.value.push({
      id: Date.now(),
      text: data.msg,
      username: data.username,
      timestamp: data.timestamp,
      isOwn: data.username === currentUsername,
    });
    addLog("receive", "chat-message", `${data.username}: ${data.msg}`);
  });

  socket.on("room-users", (users) => {
    usersInRoom.value = users.filter((u) => u !== currentUsername);
    addLog("system", "room-users", users);
  });

  socket.on("typing", (data) => {
    if (data.username !== currentUsername) {
      typingUsername.value = data.username;
      isTyping.value = true;
      typingFromSelf.value = false;
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
        isTyping.value = false;
        typingUsername.value = "";
      }, 1000);
    }
  });
};

const disconnect = () => {
  if (socket) socket.disconnect();
  socket = null;
  joinedRoom.value = "";
  usersInRoom.value = [];
  messages.value = [];
  isTyping.value = false;
};

const joinRoom = () => {
  if (!socket || !currentRoom.value.trim()) return;
  const roomName = currentRoom.value.trim();
  socket.emit("join-room", { room: roomName, username: currentUsername });
  joinedRoom.value = roomName;
  messages.value = [];
  addLog("system", "join-room", `Joined room: ${roomName}`);
};

const sendMessage = () => {
  if (!socket || !joinedRoom.value || !messageText.value.trim()) return;
  const msgData = {
    room: joinedRoom.value,
    msg: messageText.value,
    username: currentUsername,
    timestamp: new Date().toISOString(),
  };
  socket.emit("chat-message", msgData);
  addLog("send", "chat-message", `${msgData.username}: ${msgData.msg}`);
  messageText.value = "";
};

const handleTyping = () => {
  if (!socket || !joinedRoom.value) return;
  socket.emit("typing", { room: joinedRoom.value, username: currentUsername });
};

const toggleTheme = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

onUnmounted(() => {
  if (socket) socket.disconnect();
});
</script>

<style scoped>
.custom-scroll::-webkit-scrollbar {
  width: 4px;
}
.custom-scroll::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
}
* {
  transition: all 0.2s ease;
}
.break-words {
  word-break: break-word;
  white-space: pre-wrap;
}
</style>


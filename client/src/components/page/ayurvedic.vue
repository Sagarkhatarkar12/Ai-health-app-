<!-- src/components/page/AyurvedicChatbot.vue -->
<template>
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-950 via-green-900 to-teal-950">
    <!-- Animated nature orbs -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-20 left-10 w-80 h-80 bg-emerald-400/15 rounded-full blur-[130px] animate-float-slow">
      </div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-green-500/15 rounded-full blur-[150px] animate-float-slower">
      </div>
      <div class="absolute top-1/3 right-1/4 w-64 h-64 bg-teal-300/10 rounded-full blur-[100px] animate-pulse-slow">
      </div>
    </div>

    <!-- Leaf pattern overlay -->
    <div class="absolute inset-0 opacity-10">
      <div
        class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M40 10 Q55 20 60 40 Q55 55 40 50 Q25 45 20 40 Q15 20 40 10 Z\' fill=\'none\' stroke=\'%2334d399\' stroke-width=\'0.8\' opacity=\'0.3\' /%3E%3C/svg%3E')]">
      </div>
    </div>

    <NavBar />

    <main class="relative z-10 flex-1 flex flex-col items-center justify-center min-h-screen px-6 py-8">
      <div class="w-full max-w-5xl mx-auto">
        <!-- Header with Ayurvedic branding -->
        <div class="text-center mb-8">
          <div
            class="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/30 mb-6 animate-fade-in-up">
            <span class="text-2xl">🌿</span>
            <span class="text-sm font-medium text-emerald-300 tracking-wider">AYURVEDIC WISDOM • ANCIENT HEALING</span>
            <span class="text-2xl">🍃</span>
          </div>

          <h1
            class="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight animate-fade-in-up animation-delay-200">
            <span class="bg-gradient-to-r from-emerald-200 via-green-200 to-teal-200 bg-clip-text text-transparent">
              Ayurvedic
            </span>
            <br />
            <span class="bg-gradient-to-r from-green-300 via-emerald-200 to-teal-200 bg-clip-text text-transparent">
              Health Companion
            </span>
          </h1>

          <p class="text-lg md:text-xl text-gray-300/90 max-w-3xl mx-auto animate-fade-in-up animation-delay-400">
            Discover personalized Ayurvedic remedies, understand your dosha, and get holistic health guidance powered by
            ancient wisdom and AI.
          </p>
        </div>

        <!-- Chat Interface Card -->
        <div class="relative group perspective-1000 animate-fade-in-up animation-delay-600">
          <!-- Outer glow -->
          <div
            class="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-400 rounded-3xl blur-xl opacity-60 transition-all duration-700 group-hover:opacity-100 group-hover:blur-2xl">
          </div>

          <div
            class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950/90 via-green-900/90 to-teal-950/90 backdrop-blur-xl border border-emerald-500/20 shadow-2xl">
            <!-- Decorative top border -->
            <div
              class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent">
            </div>

            <div class="p-1">
              <div class="flex h-[600px]">
                <!-- Sidebar with Ayurvedic info -->
                <div class="hidden md:block w-72 border-r border-emerald-500/20 p-5 overflow-y-auto">
                  <div class="space-y-6">
                    <!-- Dosha Quick Check -->
                    <div class="bg-emerald-500/5 rounded-2xl p-4 border border-emerald-500/20">
                      <h3 class="text-emerald-300 font-semibold mb-3 flex items-center gap-2">
                        <span>🧘</span> Your Dosha
                      </h3>
                      <div class="space-y-2">
                        <div class="flex justify-between text-sm">
                          <span class="text-gray-300">Vata</span>
                          <span class="text-emerald-300">30%</span>
                        </div>
                        <div class="h-1.5 bg-white/10 rounded-full">
                          <div class="h-full w-[30%] bg-gradient-to-r from-emerald-400 to-green-400 rounded-full"></div>
                        </div>
                        <div class="flex justify-between text-sm">
                          <span class="text-gray-300">Pitta</span>
                          <span class="text-emerald-300">45%</span>
                        </div>
                        <div class="h-1.5 bg-white/10 rounded-full">
                          <div class="h-full w-[45%] bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
                        </div>
                        <div class="flex justify-between text-sm">
                          <span class="text-gray-300">Kapha</span>
                          <span class="text-emerald-300">25%</span>
                        </div>
                        <div class="h-1.5 bg-white/10 rounded-full">
                          <div class="h-full w-[25%] bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                        </div>
                      </div>
                      <button class="mt-4 text-xs text-emerald-400 hover:text-emerald-300 transition">
                        Take full quiz →
                      </button>
                    </div>

                    <!-- Today's Recommendation -->
                    <div class="bg-emerald-500/5 rounded-2xl p-4 border border-emerald-500/20">
                      <h3 class="text-emerald-300 font-semibold mb-3 flex items-center gap-2">
                        <span>🌱</span> Today's Ritual
                      </h3>
                      <p class="text-sm text-gray-300 leading-relaxed">
                        Drink warm water with lemon and honey in the morning to balance Kapha.
                      </p>
                    </div>

                    <!-- Common Herbs -->
                    <div class="bg-emerald-500/5 rounded-2xl p-4 border border-emerald-500/20">
                      <h3 class="text-emerald-300 font-semibold mb-3 flex items-center gap-2">
                        <span>🌿</span> Healing Herbs
                      </h3>
                      <div class="flex flex-wrap gap-2">
                        <span
                          class="px-3 py-1 text-xs bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">Ashwagandha</span>
                        <span
                          class="px-3 py-1 text-xs bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">Tulsi</span>
                        <span
                          class="px-3 py-1 text-xs bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">Triphala</span>
                        <span
                          class="px-3 py-1 text-xs bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">Brahmi</span>
                        <span
                          class="px-3 py-1 text-xs bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">Turmeric</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Main Chat Area -->
                <div class="flex-1 flex flex-col">
                  <!-- Chat Header -->
                  <div class="px-5 py-4 border-b border-emerald-500/20 flex items-center gap-3">
                    <div class="relative">
                      <div class="absolute inset-0 bg-emerald-400/30 rounded-full blur-md"></div>
                      <div
                        class="relative w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                        <span class="text-xl">🌿</span>
                      </div>
                    </div>
                    <div>
                      <h3 class="font-semibold text-white">AyurAI Assistant</h3>
                      <p class="text-xs text-emerald-300 flex items-center gap-1">
                        <span class="relative flex h-2 w-2">
                          <span
                            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Online • Ready to help
                      </p>
                    </div>
                  </div>

                  <!-- Messages Container -->
                  <div ref="messagesContainer" class="flex-1 overflow-y-auto p-5 space-y-4">
                    <!-- Welcome message -->
                    <div class="flex items-start gap-3">
                      <div
                        class="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center flex-shrink-0">
                        <span class="text-sm">🌿</span>
                      </div>
                      <div
                        class="bg-emerald-500/10 backdrop-blur-sm rounded-2xl rounded-tl-none p-4 max-w-[80%] border border-emerald-500/20">
                        <p class="text-gray-200">
                          Namaste! 🙏 I'm your Ayurvedic wellness guide. Ask me about:
                        </p>
                        <ul class="mt-2 space-y-1 text-sm text-gray-300">
                          <li>• Herbal remedies for common ailments</li>
                          <li>• Dosha balancing and diet suggestions</li>
                          <li>• Ayurvedic lifestyle practices</li>
                          <li>• Natural ingredients for your concerns</li>
                        </ul>
                        <p class="mt-2 text-gray-300">How can I help you today?</p>
                      </div>
                    </div>

                    <!-- Dynamic messages -->
                    <div v-for="(msg, idx) in messages" :key="idx"
                      :class="['flex items-start gap-3', msg.sender === 'user' ? 'flex-row-reverse' : '']">
                      <div :class="['w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                        msg.sender === 'user'
                          ? 'bg-gradient-to-br from-cyan-400 to-blue-500'
                          : 'bg-gradient-to-br from-emerald-400 to-green-500']">
                        <span class="text-sm">{{ msg.sender === 'user' ? '👤' : '🌿' }}</span>
                      </div>
                      <div :class="['backdrop-blur-sm rounded-2xl p-4 max-w-[80%] border',
                        msg.sender === 'user'
                          ? 'bg-cyan-500/10 border-cyan-500/30 rounded-tr-none'
                          : 'bg-emerald-500/10 border-emerald-500/20 rounded-tl-none']">
                        <p class="text-gray-200 whitespace-pre-wrap">{{ msg.text }}</p>
                        <span class="text-xs text-gray-500 mt-1 block">{{ msg.time }}</span>
                      </div>
                    </div>

                    <!-- Typing indicator -->
                    <div v-if="isTyping" class="flex items-start gap-3">
                      <div
                        class="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center">
                        <span class="text-sm">🌿</span>
                      </div>
                      <div
                        class="bg-emerald-500/10 backdrop-blur-sm rounded-2xl rounded-tl-none p-4 border border-emerald-500/20">
                        <div class="flex gap-1">
                          <span class="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></span>
                          <span class="w-2 h-2 bg-emerald-400 rounded-full animate-bounce animation-delay-200"></span>
                          <span class="w-2 h-2 bg-emerald-400 rounded-full animate-bounce animation-delay-400"></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Input Area -->
                  <div class="p-5 border-t border-emerald-500/20">
                    <div class="flex gap-3">
                      <div class="flex-1 relative">
                        <input v-model="inputMessage" @keyup.enter="sendMessage" type="text"
                          placeholder="Ask about Ayurvedic remedies, doshas, or herbs..."
                          class="w-full px-5 py-3.5 bg-white/5 backdrop-blur-sm border border-emerald-500/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400/60 transition" />
                      </div>
                      <button @click="sendMessage" :disabled="!inputMessage.trim() || isTyping"
                        class="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-medium shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                        <SendIcon class="w-5 h-5" />
                      </button>
                    </div>
                    <!-- Quick suggestions -->
                    <div class="flex flex-wrap gap-2 mt-3">
                      <button v-for="suggestion in quickSuggestions" :key="suggestion"
                        @click="inputMessage = suggestion; sendMessage()"
                        class="px-3 py-1.5 text-xs bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-300 hover:bg-emerald-500/20 transition">
                        {{ suggestion }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import NavBar from '../../components/page/NavBar.vue'
import { Send as SendIcon } from 'lucide-vue-next'
import api from "../../services/api"


interface Message {
  sender: 'user' | 'bot'
  text: string
  time: string
}

const messages = ref<Message[]>([])
const inputMessage = ref('')
const isTyping = ref(false)
const messagesContainer = ref<HTMLElement>()

const quickSuggestions = [
  'Remedies for cough',
  'Balance Pitta dosha',
  'Benefits of Ashwagandha',
  'Ayurvedic diet for digestion',
  'Natural sleep aid'
]

// Auto-scroll to bottom when new messages arrive
watch(messages, async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
})

async function sendMessage() {
  const text = inputMessage.value.trim()
  if (!text || isTyping.value) return

  // Add user message
  messages.value.push({
    sender: 'user',
    text,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  })
  inputMessage.value = ''

  // Show typing indicator
  isTyping.value = true
  await nextTick()

  try {
    // Call your AI backend for Ayurvedic response
    const response = await fetchAyurvedicResponse(text)

    messages.value.push({
      sender: 'bot',
      text: response,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    })
  } catch (error) {
    messages.value.push({
      sender: 'bot',
      text: "I apologize, but I'm having trouble connecting to the Ayurvedic knowledge base. Please try again in a moment. 🙏",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    })
  } finally {
    isTyping.value = false
  }
}

// API integration - replace with your actual backend endpoint
async function fetchAyurvedicResponse(query: string): Promise<string> {
  try {
    console.log(query)
    const response = await api.post('http://localhost:3000/api/ayurvedic', {
      message: query,
      context: 'You are an expert Ayurvedic practitioner. Provide holistic, natural remedies based on ancient wisdom.'
    })
    return response.data.reply
  } catch (error) {
    // Fallback to mock responses if API fails
    console.warn('Using mock response due to API error')
    return getMockResponse(query)
  }
}

// Mock responses for development/demo
function getMockResponse(query: string): string {
  const lowerQuery = query.toLowerCase()

  if (lowerQuery.includes('cough')) {
    return "For cough, Ayurveda recommends:\n\n🌿 **Tulsi (Holy Basil)** tea with honey and ginger.\n🌿 **Sitopaladi Churna** mixed with honey.\n🌿 Steam inhalation with eucalyptus or peppermint oil.\n\nAlso, avoid cold foods and dairy. Would you like more details on any of these?"
  } else if (lowerQuery.includes('pitta')) {
    return "To balance **Pitta dosha**, focus on cooling foods and activities:\n\n🍉 Eat sweet, bitter, and astringent tastes (cucumber, coconut, leafy greens).\n🧘 Practice cooling pranayama like Sheetali.\n🌙 Avoid spicy, sour, and salty foods.\n\nWould you like a personalized Pitta-pacifying meal plan?"
  } else if (lowerQuery.includes('ashwagandha')) {
    return "**Ashwagandha** (Withania somnifera) is a powerful adaptogen:\n\n✨ Reduces stress and anxiety\n✨ Improves energy and stamina\n✨ Supports thyroid function\n✨ Enhances sleep quality\n\nTypical dosage: 300-500mg of root extract twice daily. Consult an Ayurvedic practitioner before starting."
  } else if (lowerQuery.includes('digestion')) {
    return "For healthy digestion, Ayurveda suggests:\n\n🌿 Drink **Cumin-Coriander-Fennel tea** after meals.\n🌿 Eat fresh ginger with a pinch of salt before meals.\n🌿 Avoid cold drinks and ice water.\n🌿 Practice mindful eating without distractions.\n\nIs there a specific digestive issue you're experiencing?"
  } else if (lowerQuery.includes('sleep')) {
    return "For natural sleep support:\n\n🌙 Drink warm milk with **nutmeg** and **cardamom** before bed.\n🌙 Massage feet with warm sesame oil.\n🌙 Practice **Yoga Nidra** or gentle stretching.\n🌙 Avoid screens 1 hour before sleep.\n\n**Ashwagandha** or **Brahmi** may also help calm the mind."
  } else {
    return "Thank you for your question about Ayurveda. 🌿\n\nBased on Ayurvedic principles, I recommend considering your unique **dosha constitution** (Vata, Pitta, Kapha) for personalized guidance.\n\nCould you tell me more about your specific concern or symptom? I'm here to help with natural, holistic approaches."
  }
}
</script>

<style scoped>
@keyframes float-slow {

  0%,
  100% {
    transform: translateY(0) scale(1);
  }

  50% {
    transform: translateY(-20px) scale(1.05);
  }
}

@keyframes float-slower {

  0%,
  100% {
    transform: translateY(0) scale(1);
  }

  50% {
    transform: translateY(20px) scale(0.95);
  }
}

@keyframes pulse-slow {

  0%,
  100% {
    opacity: 0.4;
    transform: scale(1);
  }

  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

.animate-float-slower {
  animation: float-slower 12s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 6s ease-in-out infinite;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
  opacity: 0;
}

.animation-delay-200 {
  animation-delay: 200ms;
}

.animation-delay-400 {
  animation-delay: 400ms;
}

.animation-delay-600 {
  animation-delay: 600ms;
}

.animation-delay-800 {
  animation-delay: 800ms;
}

.perspective-1000 {
  perspective: 1000px;
}
</style>
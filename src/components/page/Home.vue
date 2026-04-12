<template>
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
    <!-- Animated background orbs -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-20 left-10 w-72 h-72 bg-cyan-400/20 rounded-full blur-[120px] animate-float-slow"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-[140px] animate-float-slower"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[180px] animate-pulse-slow"></div>
    </div>

    <!-- Grid pattern overlay -->
    <div class="absolute inset-0 bg-grid-pattern opacity-30"></div>

    <!-- NavBar component - ensure it's imported -->
    <NavBar />

    <main class="relative z-10 flex-1 flex flex-col items-center justify-center min-h-screen px-6 py-12">
      <div class="max-w-5xl mx-auto text-center">
        <!-- Animated badge -->
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-8 animate-fade-in-up">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span class="text-sm font-medium text-emerald-300 tracking-wider">AI-POWERED HEALTHCARE</span>
        </div>

        <!-- Main headline -->
        <h1 class="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight animate-fade-in-up animation-delay-200">
          <span class="bg-gradient-to-r from-white via-cyan-200 to-indigo-200 bg-clip-text text-transparent">
            Your Health,
          </span>
          <br />
          <span class="bg-gradient-to-r from-indigo-300 via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            Amplified by AI
          </span>
        </h1>

        <!-- Description -->
        <p class="text-lg md:text-xl text-gray-300/90 max-w-2xl mx-auto mb-12 leading-relaxed backdrop-blur-sm bg-white/5 p-6 rounded-3xl border border-white/10 animate-fade-in-up animation-delay-400">
          Experience the future of patient‑doctor interaction. Real‑time insights, predictive analytics, and seamless communication—all in one intelligent platform.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-in-up animation-delay-600">
          <!-- If using Vue Router -->
          <router-link
            to="/patient"
            class="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            <span class="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span class="relative flex items-center gap-2">
              Patient Dashboard
              <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </router-link>

          <router-link
            to="/doctor"
            class="group px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20 text-white font-semibold text-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105"
          >
            <span class="flex items-center gap-2">
              Doctor Dashboard
              <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </router-link>
        </div>

        <!-- Feature pills -->
        <div class="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto animate-fade-in-up animation-delay-800">
          <FeaturePill icon="shield" color="cyan" text="HIPAA Compliant" />
          <FeaturePill icon="bolt" color="purple" text="Real‑time Analysis" />
          <FeaturePill icon="clock" color="emerald" text="24/7 AI Support" />
        </div>
      </div>

      <!-- Decorative wave -->
      <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
    </main>
  </div>
</template>

<script setup lang="ts">
// Uncomment and ensure path is correct
import NavBar from "./NavBar.vue"

// Optional: Extract feature pill to a separate component for reusability
// import FeaturePill from "./FeaturePill.vue"
</script>

<style scoped>
/* Tailwind will generate these if you have the config, but keep as fallback */
.bg-grid-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L30 60 M0 30 L60 30' stroke='rgba(255,255,255,0.03)' stroke-width='0.5' /%3E%3C/svg%3E");
}

@keyframes float-slow {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.05); }
}
@keyframes float-slower {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(20px) scale(0.95); }
}
@keyframes pulse-slow {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
}
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
.animate-float-slower { animation: float-slower 12s ease-in-out infinite; }
.animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
.animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; opacity: 0; }
.animation-delay-200 { animation-delay: 200ms; }
.animation-delay-400 { animation-delay: 400ms; }
.animation-delay-600 { animation-delay: 600ms; }
.animation-delay-800 { animation-delay: 800ms; }
</style>
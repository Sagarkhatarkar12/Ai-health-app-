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

    <!-- NavBar component -->
    <NavBar />

    <main class="relative z-10">
      <!-- Hero Section -->
      <section class="flex flex-col items-center justify-center min-h-[90vh] px-6 py-12">
        <div class="max-w-5xl mx-auto text-center">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-8 animate-fade-in-up">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span class="text-sm font-medium text-emerald-300 tracking-wider">AI-POWERED HEALTHCARE</span>
          </div>

          <!-- Headline -->
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
            Experience the future of patient‑doctor interaction. Real‑time insights, predictive analytics, and seamless
            communication—all in one intelligent platform.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-in-up animation-delay-600">
            <router-link to="/patient/dashboard"
              class="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105 overflow-hidden">
              <span class="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span class="relative flex items-center gap-2">
                Patient Dashboard
                <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </router-link>

            <router-link to="/doctor/dashboard"
              class="group px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20 text-white font-semibold text-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105">
              <span class="flex items-center gap-2">
                Doctor Dashboard
                <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </router-link>
          </div>

          <!-- Feature pills -->
          <div class="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto animate-fade-in-up animation-delay-800">
            <FeaturePill icon="Shield" color="cyan" text="HIPAA Compliant" />
            <FeaturePill icon="Zap" color="purple" text="Real‑time Analysis" />
            <FeaturePill icon="Clock" color="emerald" text="24/7 AI Support" />
          </div>
        </div>
      </section>

      <!-- Stats Section (Trust indicators) -->
      <section class="py-20 px-6 border-y border-white/10 bg-black/20 backdrop-blur-sm">
        <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <StatCard :value="5000" label="Active Patients" suffix="+" />
          <StatCard :value="98" label="Satisfaction Rate" suffix="%" />
          <StatCard :value="24" label="AI Uptime" suffix="/7" />
        </div>
      </section>

      <!-- Features Grid -->
      <section class="py-24 px-6">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              Intelligent <span class="text-indigo-300">Platform</span> Features
            </h2>
            <p class="text-gray-400 mt-4 max-w-2xl mx-auto">
              Everything you need for modern healthcare delivery – powered by AI and designed for humans.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon="Brain" title="AI Diagnostics" description="Preliminary analysis & risk scoring using advanced ML models trained on millions of cases." color="cyan" />
            <FeatureCard icon="Video" title="Telemedicine" description="HD video consultations with screen sharing, prescriptions, and session recording." color="indigo" />
            <FeatureCard icon="Calendar" title="Smart Scheduling" description="AI-driven appointment booking that avoids conflicts and sends reminders." color="purple" />
            <FeatureCard icon="FileText" title="EHR Integration" description="Seamless access to electronic health records, lab results, and history." color="emerald" />
            <FeatureCard icon="MessageSquare" title="Secure Messaging" description="Encrypted chat between patients and care teams with attachment support." color="rose" />
            <FeatureCard icon="Activity" title="Predictive Analytics" description="Early warning for chronic conditions and preventive care recommendations." color="orange" />
          </div>
        </div>
      </section>

      <!-- How It Works -->
      <section class="py-24 px-6 bg-white/5 backdrop-blur-sm">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-200 to-indigo-200 bg-clip-text text-transparent">
              How <span class="text-white">Ayu Mitram</span> Works
            </h2>
            <p class="text-gray-400 mt-4">Simple, secure, and intelligent – from registration to recovery.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard number="01" title="Sign Up & Profile" description="Create your account as a patient or doctor. Set up your preferences and health profile." icon="UserPlus" />
            <StepCard number="02" title="Connect & Consult" description="Book appointments, join video calls, share reports, and get AI‑powered insights." icon="Video" />
            <StepCard number="03" title="Track & Thrive" description="Monitor your progress, receive medication reminders, and stay connected with care." icon="BarChart" />
          </div>
        </div>
      </section>

      <!-- Testimonials -->
      <section class="py-24 px-6">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Loved by <span class="text-cyan-300">Patients & Doctors</span>
            </h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TestimonialCard 
              name="Dr. Meera Krishnamurthy" 
              role="Cardiologist" 
              content="“Ayu Mitram has revolutionised how I manage my practice. The AI summaries save me hours every week – and patients love the smooth video experience.”"
              avatar="👩‍⚕️"
            />
            <TestimonialCard 
              name="Rajesh Sharma" 
              role="Patient" 
              content="“I was skeptical, but the platform is incredibly easy to use. My doctor had all my reports before the call – felt like a premium clinic visit from home.”"
              avatar="👨‍💼"
            />
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <section class="py-20 px-6">
        <div class="max-w-4xl mx-auto text-center bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 rounded-3xl p-12 border border-white/20 backdrop-blur-xl">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Ready to transform healthcare?</h2>
          <p class="text-gray-300 mb-8">Join thousands of users already experiencing the future of medical care.</p>
          <router-link to="/api/register"
            class="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-lg shadow-lg shadow-cyan-500/30 hover:scale-105 transition-all hover:shadow-cyan-500/50">
            Get Started Today
            <ArrowRight class="w-5 h-5" />
          </router-link>
        </div>
      </section>

      <!-- Footer -->
      <footer class="border-t border-white/10 py-12 px-6 text-center text-gray-400 text-sm">
        <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2025 Ayu Mitram – Bridging tradition with technology.</p>
          <div class="flex gap-6">
            <a href="#" class="hover:text-cyan-400 transition-colors">Privacy</a>
            <a href="#" class="hover:text-cyan-400 transition-colors">Terms</a>
            <a href="#" class="hover:text-cyan-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, h } from 'vue'
import NavBar from './NavBar.vue'
import { 
  ArrowRight, Shield, Zap, Clock, Brain, Video, Calendar, FileText, 
  MessageSquare, Activity, UserPlus, BarChart 
} from 'lucide-vue-next'

// ========== Helper Components ==========
// Feature Pill
const FeaturePill = (props, ctx) => {
  const colorMap = { cyan: 'text-cyan-400', purple: 'text-purple-400', emerald: 'text-emerald-400' }
  const IconComponent = { Shield, Zap, Clock }[props.icon]
  return h('div', { class: 'flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10' }, [
    h(IconComponent, { class: `w-4 h-4 ${colorMap[props.color]}` }),
    h('span', { class: 'text-sm font-medium text-white/80' }, props.text)
  ])
}

// Stat Card (with counter animation)
const StatCard = {
  props: ['value', 'label', 'suffix'],
  setup(props) {
    const displayValue = ref(0)
    onMounted(() => {
      let start = 0
      const end = props.value
      const duration = 1500
      const stepTime = 20
      const steps = duration / stepTime
      const increment = end / steps
      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          displayValue.value = end
          clearInterval(timer)
        } else {
          displayValue.value = Math.floor(start)
        }
      }, stepTime)
    })
    return () => h('div', { class: 'backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10' }, [
      h('div', { class: 'text-4xl md:text-5xl font-bold text-white' }, `${displayValue.value}${props.suffix}`),
      h('div', { class: 'text-sm text-gray-300 mt-2' }, props.label)
    ])
  }
}

// Feature Card
const FeatureCard = (props) => {
  const colorMap = { cyan: 'text-cyan-400', indigo: 'text-indigo-400', purple: 'text-purple-400', emerald: 'text-emerald-400', rose: 'text-rose-400', orange: 'text-orange-400' }
  const IconMap = { Brain, Video, Calendar, FileText, MessageSquare, Activity }
  const IconComp = IconMap[props.icon]
  return h('div', { class: 'group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all hover:-translate-y-1 hover:bg-white/10' }, [
    h(IconComp, { class: `w-10 h-10 mb-4 ${colorMap[props.color]}` }),
    h('h3', { class: 'text-xl font-semibold text-white mb-2' }, props.title),
    h('p', { class: 'text-gray-400 text-sm' }, props.description)
  ])
}

// Step Card
const StepCard = (props) => {
  const IconMap = { UserPlus, Video, BarChart }
  const IconComp = IconMap[props.icon]
  return h('div', { class: 'text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10' }, [
    h('div', { class: 'text-5xl font-bold text-cyan-400/30 mb-2' }, props.number),
    h(IconComp, { class: 'w-12 h-12 mx-auto mb-4 text-cyan-400' }),
    h('h3', { class: 'text-xl font-semibold text-white mb-2' }, props.title),
    h('p', { class: 'text-gray-400 text-sm' }, props.description)
  ])
}

// Testimonial Card
const TestimonialCard = (props) => {
  return h('div', { class: 'p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10' }, [
    h('div', { class: 'flex items-center gap-3 mb-4' }, [
      h('div', { class: 'w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center text-white text-xl' }, props.avatar),
      h('div', [
        h('div', { class: 'font-semibold text-white' }, props.name),
        h('div', { class: 'text-xs text-cyan-300' }, props.role)
      ])
    ]),
    h('p', { class: 'text-gray-300 text-sm italic leading-relaxed' }, props.content)
  ])
}
</script>

<style scoped>
/* Same CSS as original plus any extra */
.bg-grid-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L30 60 M0 30 L60 30' stroke='rgba(255,255,255,0.03)' stroke-width='0.5' /%3E%3C/svg%3E");
}
@keyframes float-slow {
  0%,100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.05); }
}
@keyframes float-slower {
  0%,100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(20px) scale(0.95); }
}
@keyframes pulse-slow {
  0%,100% { opacity: 0.4; transform: scale(1); }
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
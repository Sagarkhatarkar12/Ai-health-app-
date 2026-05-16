<template>
  <div class="medical-analyzer">
    <!-- Header with icon -->
    <div class="flex items-center gap-3 mb-6">
      <div class="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <div>
        <h2 class="text-xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">AI Medical Image Analyzer</h2>
        <p class="text-xs text-gray-400">Powered by ResNet-18 • Pneumonia detection</p>
      </div>
    </div>

    <!-- Upload area with drag & drop -->
    <div
      class="relative group rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden"
      :class="[
        isDragging
          ? 'border-cyan-400 bg-cyan-500/10'
          : 'border-white/20 bg-white/5 hover:border-cyan-500/50 hover:bg-white/10',
        previewUrl ? 'p-0' : 'p-8'
      ]"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
    >
      <input
        type="file"
        accept="image/jpeg,image/png,image/jpg,image/dicom"
        @change="onFileChange"
        ref="fileInput"
        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        :disabled="loading"
      />
      <div v-if="!previewUrl" class="text-center">
        <div class="flex justify-center mb-4">
          <div class="p-4 rounded-full bg-white/10 group-hover:bg-cyan-500/20 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-gray-300 group-hover:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <p class="text-gray-300 font-medium">Click or drag & drop</p>
        <p class="text-xs text-gray-500 mt-1">JPEG, PNG, JPG (Max 10MB)</p>
      </div>

      <!-- Preview with overlay -->
      <div v-if="previewUrl" class="relative">
        <img :src="previewUrl" alt="Preview" class="w-full max-h-80 object-contain rounded-t-2xl" />
        <button
          @click="clearImage"
          class="absolute top-3 right-3 p-1.5 bg-black/60 rounded-full hover:bg-red-500 transition-colors backdrop-blur-sm"
          :disabled="loading"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div class="absolute bottom-3 left-3 px-2 py-1 bg-black/60 rounded-md backdrop-blur-sm text-xs text-white">
          {{ selectedFile?.name?.slice(0, 25) || 'Image' }}
        </div>
      </div>
    </div>

    <!-- Analyze button (only if image selected) -->
    <div v-if="previewUrl && !result" class="mt-5 flex justify-center">
      <button
        @click="uploadImage"
        :disabled="loading"
        class="relative px-8 py-3 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 group"
        :class="loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/30'"
      >
        <span v-if="!loading" class="relative z-10 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Analyze Image
        </span>
        <span v-else class="relative z-10 flex items-center gap-2">
          <svg class="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Analyzing...
        </span>
        <div class="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>
    </div>

    <!-- Result section with animation -->
    <Transition name="slide-up">
      <div v-if="result" class="mt-6">
        <div class="rounded-2xl backdrop-blur-md border p-5 transition-all duration-500"
          :class="result.label === 'Pneumonia'
            ? 'bg-red-500/10 border-red-500/30 shadow-lg shadow-red-500/20'
            : 'bg-emerald-500/10 border-emerald-500/30 shadow-lg shadow-emerald-500/20'">
          <div class="flex items-center gap-3 mb-4">
            <div class="p-2 rounded-full"
              :class="result.label === 'Pneumonia' ? 'bg-red-500/20' : 'bg-emerald-500/20'">
              <svg v-if="result.label === 'Pneumonia'" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-bold text-white">AI Analysis Result</h3>
              <p class="text-xs text-gray-400">Powered by deep learning model</p>
            </div>
          </div>

          <div class="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p class="text-sm text-gray-300">Diagnosis</p>
              <p class="text-2xl font-bold"
                :class="result.label === 'Pneumonia' ? 'text-red-400' : 'text-emerald-400'">
                {{ result.label }}
              </p>
            </div>
            <div class="h-12 w-px bg-white/20"></div>
            <div>
              <p class="text-sm text-gray-300">Confidence</p>
              <p class="text-2xl font-bold text-white">{{ result.confidence }}%</p>
            </div>
            <div class="flex-1">
              <div class="h-2 bg-white/10 rounded-full overflow-hidden">
                <div class="h-full rounded-full transition-all duration-1000"
                  :class="result.label === 'Pneumonia' ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-emerald-500 to-cyan-500'"
                  :style="{ width: `${result.confidence}%` }"></div>
              </div>
            </div>
          </div>

          <div class="mt-4 pt-3 border-t border-white/10">
            <p class="text-xs text-gray-400 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              This is an AI-generated analysis. Always consult a qualified healthcare professional for medical advice.
            </p>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Error message with retry -->
    <div v-if="error" class="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-center justify-between">
      <span class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ error }}
      </span>
      <button @click="clearImage" class="px-3 py-1 text-xs bg-red-500/20 rounded-lg hover:bg-red-500/30 transition">Try Again</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import api from "../../services/api"

export default {
  name: 'MedicalImageAnalyzer',
  data() {
    return {
      selectedFile: null,
      previewUrl: null,
      loading: false,
      result: null,
      error: null,
      isDragging: false
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) this.processFile(file);
    },
    handleDrop(event) {
      this.isDragging = false;
      const file = event.dataTransfer.files[0];
      if (file) this.processFile(file);
    },
    processFile(file) {
      // Validation
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        this.error = 'Please upload a valid image (JPEG, PNG).';
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        this.error = 'File size must be less than 10MB.';
        return;
      }

      this.selectedFile = file;
      this.error = null;
      this.result = null;

      const reader = new FileReader();
      reader.onload = (e) => (this.previewUrl = e.target.result);
      reader.readAsDataURL(file);
    },
    clearImage() {
      this.selectedFile = null;
      this.previewUrl = null;
      this.result = null;
      this.error = null;
      this.$refs.fileInput.value = '';
    },
    async uploadImage() {
      if (!this.selectedFile) {
        this.error = 'Please select an image first.';
        return;
      }

      this.loading = true;
      this.error = null;
      this.result = null;

      const formData = new FormData();
      formData.append('image', this.selectedFile);

      try {
        const token = localStorage.getItem('token');
        const response = await axios.post( ` http://localhost:3000/api/ai/analyze-image`, formData, {
          headers: {
            headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${token}`
  }
          }
        });

        if (response.data.success) {
          this.result = response.data.data;
        } else {
          this.error = response.data.message || 'Analysis failed.';
        }
      } catch (err) {
        console.error(err);
        this.error = err.response?.data?.message || 'Could not connect to AI service. Please ensure the server is running.';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
/* Smooth transitions */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s ease-out;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Custom scrollbar (optional) */
.medical-analyzer ::-webkit-scrollbar {
  width: 6px;
}
.medical-analyzer ::-webkit-scrollbar-track {
  background: rgba(255,255,255,0.05);
  border-radius: 10px;
}
.medical-analyzer ::-webkit-scrollbar-thumb {
  background: rgba(6, 182, 212, 0.5);
  border-radius: 10px;
}
</style>
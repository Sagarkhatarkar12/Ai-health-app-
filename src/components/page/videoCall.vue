<template>
  <Card class="max-w-xl mx-auto">
    <CardHeader>
      <CardTitle class="flex items-center space-x-2">
        <Video class="w-5 h-5" />
        <span>Video Call</span>
      </CardTitle>
    </CardHeader>
    <CardContent class="flex items-center justify-center h-64 bg-muted-foreground/10">
      <p class="text-muted-foreground">
        Video call interface will appear here.
      </p>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Video } from 'lucide-vue-next'
</script>
<template>
  <v-card rounded="xl" elevation="3" class="visual-activity">
    <v-card-text class="pa-6">
      <!-- Title -->
      <div class="text-center mb-6">
        <h2 class="display-font" style="font-size: 2rem; color: #5E35B1; margin-bottom: 4px;">
          🎯 Empareja los Conceptos
        </h2>
        <p style="color: #999; font-size: 1rem;">Haz clic en un concepto de la izquierda y uno de la derecha</p>
      </div>

      <!-- Match game -->
      <v-row class="mb-6">
        <!-- Left side -->
        <v-col cols="12" md="6">
          <p class="text-center mb-3" style="font-weight: 700; color: #666;">Concepto</p>
          <div
            v-for="pair in pairs"
            :key="`left-${pair.id}`"
            class="match-card"
            :class="{ 'selected': selected.left === pair.id, 'matched': matches.includes(pair.id) }"
            @click="selectLeft(pair.id)"
            style="cursor: pointer; margin-bottom: 12px;"
          >
            <div style="font-size: 2.5rem; margin-bottom: 8px; text-align: center;">{{ pair.leftEmoji }}</div>
            <div style="font-size: 1.2rem; font-weight: 700; text-align: center; color: #333;">
              {{ pair.leftText }}
            </div>
          </div>
        </v-col>

        <!-- Right side -->
        <v-col cols="12" md="6">
          <p class="text-center mb-3" style="font-weight: 700; color: #666;">Significado</p>
          <div
            v-for="pair in pairs"
            :key="`right-${pair.id}`"
            class="match-card"
            :class="{ 'selected': selected.right === pair.id, 'matched': matches.includes(pair.id) }"
            @click="selectRight(pair.id)"
            style="cursor: pointer; margin-bottom: 12px;"
          >
            <div style="font-size: 2.5rem; margin-bottom: 8px; text-align: center;">{{ pair.rightEmoji }}</div>
            <div style="font-size: 1.2rem; font-weight: 700; text-align: center; color: #333;">
              {{ pair.rightText }}
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- Matches display -->
      <div v-if="matches.length > 0" class="mb-6">
        <v-alert type="success" rounded="xl" class="mb-4">
          <strong>✅ Pares emparejados: {{ matches.length }}/{{ pairs.length }}</strong>
        </v-alert>
      </div>

      <!-- Feedback -->
      <div v-if="message" class="text-center mb-4">
        <v-alert :type="message.type" rounded="xl">
          {{ message.text }}
        </v-alert>
      </div>

      <!-- Buttons -->
      <div class="d-flex justify-center gap-3 mt-6">
        <v-btn
          v-if="matches.length < pairs.length"
          color="grey"
          variant="outlined"
          size="large"
          @click="reset"
          rounded="xl"
        >
          Reiniciar
        </v-btn>
        <v-btn
          v-if="matches.length === pairs.length"
          color="success"
          size="large"
          prepend-icon="mdi-check"
          @click="complete"
          rounded="xl"
        >
          ¡Completado!
        </v-btn>
      </div>

      <!-- Progress -->
      <v-progress-linear
        :model-value="(matches.length / pairs.length) * 100"
        color="success"
        height="8"
        rounded
        class="mt-4"
      />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { MatchPair } from '~/data/visualActivities'

interface Props {
  pairs: MatchPair[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  complete: []
}>()

const selected = ref<{ left: number | null; right: number | null }>({ left: null, right: null })
const matches = ref<number[]>([])
const message = ref<{ type: 'success' | 'error'; text: string } | null>(null)

const selectLeft = (id: number) => {
  if (matches.value.includes(id)) return
  selected.value.left = selected.value.left === id ? null : id
  tryMatch()
}

const selectRight = (id: number) => {
  if (matches.value.includes(id)) return
  selected.value.right = selected.value.right === id ? null : id
  tryMatch()
}

const tryMatch = () => {
  if (selected.value.left !== null && selected.value.right !== null) {
    if (selected.value.left === selected.value.right) {
      matches.value.push(selected.value.left)
      message.value = { type: 'success', text: '✅ ¡Correcto! ¡Emparejaste bien!' }
      selected.value = { left: null, right: null }
      setTimeout(() => {
        message.value = null
      }, 2000)
    } else {
      message.value = { type: 'error', text: '❌ No coinciden. Intenta de nuevo.' }
      selected.value = { left: null, right: null }
      setTimeout(() => {
        message.value = null
      }, 1500)
    }
  }
}

const reset = () => {
  selected.value = { left: null, right: null }
  matches.value = []
  message.value = null
}

const complete = () => {
  emit('complete')
}
</script>

<style scoped>
.match-card {
  padding: 16px;
  border-radius: 12px;
  background: #f5f5f5;
  border: 3px solid #ddd;
  transition: all 0.3s ease;
}

.match-card:hover {
  border-color: #5E35B1;
  transform: scale(1.02);
}

.match-card.selected {
  border-color: #5E35B1;
  background: #ede7f6;
}

.match-card.matched {
  border-color: #4caf50;
  background: #c8e6c9;
  pointer-events: none;
  opacity: 0.8;
}
</style>

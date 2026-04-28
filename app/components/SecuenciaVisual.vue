<template>
  <v-card rounded="xl" elevation="3" class="visual-activity">
    <v-card-text class="pa-6">
      <!-- Title -->
      <div class="text-center mb-6">
        <h2 class="display-font" style="font-size: 2rem; color: #1B3A6B; margin-bottom: 4px;">
          🔢 Ordena los Pasos
        </h2>
        <p style="color: #999; font-size: 1rem;">Haz clic en los pasos en el orden correcto (1 → {{ steps.length }})</p>
      </div>

      <!-- Available steps -->
      <p style="font-weight: 700; color: #666; margin-bottom: 12px;">Pasos disponibles:</p>
      <v-row class="mb-8">
        <v-col
          v-for="step in steps"
          :key="step.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card
            v-if="!selected.map(s => s.id).includes(step.id)"
            class="step-card"
            rounded="xl"
            @click="selectStep(step)"
            style="cursor: pointer; transition: all 0.3s ease;"
          >
            <v-card-text class="pa-4 text-center">
              <div style="font-size: 3rem; margin-bottom: 8px;">{{ step.emoji }}</div>
              <div style="font-size: 1.1rem; font-weight: 700; color: #333;">
                {{ step.text }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Selected sequence -->
      <p v-if="selected.length > 0" style="font-weight: 700; color: #666; margin-bottom: 12px;">
        Tu orden ({{ selected.length }}/{{ steps.length }}):
      </p>
      <v-row v-if="selected.length > 0" class="mb-6">
        <v-col
          v-for="(step, idx) in selected"
          :key="step.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card
            class="selected-step"
            rounded="xl"
            :class="{ 'correct-order': completed && idx === step.order - 1 }"
          >
            <v-card-text class="pa-4 text-center">
              <div class="number-badge mb-2">{{ idx + 1 }}</div>
              <div style="font-size: 2.5rem; margin-bottom: 8px;">{{ step.emoji }}</div>
              <div style="font-size: 1rem; font-weight: 700; color: #333;">
                {{ step.text }}
              </div>
              <v-btn
                v-if="!completed"
                icon
                size="x-small"
                color="error"
                variant="text"
                @click.stop="removeStep(idx)"
                class="mt-2"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Feedback -->
      <div v-if="completed" class="text-center mb-4">
        <v-alert :type="isCorrect ? 'success' : 'warning'" rounded="xl" class="mb-4">
          <div style="font-size: 1.2rem; font-weight: 700;">
            {{ isCorrect ? '✅ ¡Correcto! ¡Ordenaste bien los pasos!' : '❌ El orden no es correcto. Intenta de nuevo.' }}
          </div>
        </v-alert>
      </div>

      <!-- Buttons -->
      <div class="d-flex justify-center gap-3 mt-6">
        <v-btn
          v-if="selected.length > 0 && !completed"
          color="grey"
          variant="outlined"
          size="large"
          @click="reset"
          rounded="xl"
        >
          Reiniciar
        </v-btn>
        <v-btn
          v-if="selected.length === steps.length && !completed"
          color="primary"
          size="large"
          prepend-icon="mdi-check"
          @click="checkOrder"
          rounded="xl"
        >
          Verificar
        </v-btn>
        <v-btn
          v-if="completed && !isCorrect"
          color="primary"
          size="large"
          @click="reset"
          rounded="xl"
        >
          Intentar de Nuevo
        </v-btn>
        <v-btn
          v-if="completed && isCorrect"
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
        :model-value="(selected.length / steps.length) * 100"
        color="primary"
        height="8"
        rounded
        class="mt-4"
      />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { SequenceStep } from '~/data/visualActivities'

interface Props {
  steps: SequenceStep[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  complete: []
}>()

const selected = ref<SequenceStep[]>([])
const completed = ref(false)
const isCorrect = ref(false)

const selectStep = (step: SequenceStep) => {
  selected.value.push(step)
}

const removeStep = (idx: number) => {
  selected.value.splice(idx, 1)
  completed.value = false
  isCorrect.value = false
}

const checkOrder = () => {
  const isValid = selected.value.every((step, idx) => step.order === idx + 1)
  isCorrect.value = isValid
  completed.value = true
}

const reset = () => {
  selected.value = []
  completed.value = false
  isCorrect.value = false
}

const complete = () => {
  emit('complete')
}
</script>

<style scoped>
.step-card {
  border: 4px solid #e0e0e0;
  transition: all 0.3s ease;
}

.step-card:hover {
  border-color: #1B3A6B;
  transform: scale(1.05);
}

.selected-step {
  border: 4px solid #1B3A6B;
  background: linear-gradient(135deg, #ede7f6 0%, #f3e5f5 100%);
  position: relative;
}

.selected-step.correct-order {
  border-color: #4caf50;
  background: linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%);
}

.number-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: #1B3A6B;
  color: white;
  border-radius: 50%;
  font-weight: 700;
  font-size: 1rem;
}
</style>

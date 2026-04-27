<template>
  <v-card rounded="xl" elevation="3" class="visual-activity">
    <v-card-text class="pa-6">
      <!-- Title -->
      <div class="text-center mb-6">
        <div style="font-size: 4rem; margin-bottom: 12px;">{{ question.emoji }}</div>
        <h2 class="display-font" style="font-size: 1.8rem; color: #5E35B1; margin-bottom: 4px;">
          {{ question.question }}
        </h2>
        <p style="color: #999; font-size: 0.95rem;">Pregunta {{ currentQuestion + 1 }}/{{ total }}</p>
      </div>

      <!-- Options -->
      <v-row class="mb-6">
        <v-col
          v-for="(option, idx) in question.options"
          :key="idx"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card
            class="option-card"
            :class="{ 'selected': selectedIdx === idx, 'correct': answered && option.correct, 'incorrect': answered && selectedIdx === idx && !option.correct }"
            rounded="xl"
            @click="selectOption(idx)"
            style="cursor: pointer; transition: all 0.3s ease;"
          >
            <v-card-text class="pa-4 text-center">
              <div style="font-size: 3.5rem; margin-bottom: 12px;">{{ option.emoji }}</div>
              <div style="font-size: 1.1rem; font-weight: 700; color: #333;">
                {{ option.text }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Feedback -->
      <div v-if="answered" class="text-center mb-4">
        <v-alert
          :type="question.options[selectedIdx].correct ? 'success' : 'error'"
          rounded="xl"
          class="mb-4"
        >
          <div style="font-size: 1.2rem; font-weight: 700;">
            {{ question.options[selectedIdx].correct ? '✅ ¡Correcto!' : '❌ Intenta de nuevo' }}
          </div>
        </v-alert>
      </div>

      <!-- Navigation -->
      <div class="d-flex justify-center gap-3 mt-6">
        <v-btn
          v-if="currentQuestion > 0"
          color="grey"
          variant="outlined"
          size="large"
          prepend-icon="mdi-arrow-left"
          @click="prevQuestion"
          rounded="xl"
        >
          Anterior
        </v-btn>
        <v-btn
          v-if="currentQuestion < total - 1 && answered"
          color="primary"
          size="large"
          append-icon="mdi-arrow-right"
          @click="nextQuestion"
          rounded="xl"
        >
          Siguiente
        </v-btn>
        <v-btn
          v-if="currentQuestion === total - 1 && answered"
          color="success"
          size="large"
          prepend-icon="mdi-check"
          @click="complete"
          rounded="xl"
        >
          Completar
        </v-btn>
      </div>

      <!-- Progress -->
      <v-progress-linear
        :model-value="((currentQuestion + 1) / total) * 100"
        color="primary"
        height="8"
        rounded
        class="mt-4"
      />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { QuizQuestion } from '~/data/visualActivities'

interface Props {
  questions: QuizQuestion[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  complete: []
}>()

const currentQuestion = ref(0)
const selectedIdx = ref<number | null>(null)
const answered = ref(false)
const total = computed(() => props.questions.length)
const question = computed(() => props.questions[currentQuestion.value])

const selectOption = (idx: number) => {
  if (!answered.value) {
    selectedIdx.value = idx
    answered.value = true
  }
}

const nextQuestion = () => {
  if (currentQuestion.value < total.value - 1) {
    currentQuestion.value++
    selectedIdx.value = null
    answered.value = false
  }
}

const prevQuestion = () => {
  if (currentQuestion.value > 0) {
    currentQuestion.value--
    selectedIdx.value = null
    answered.value = false
  }
}

const complete = () => {
  emit('complete')
}
</script>

<style scoped>
.option-card {
  border: 4px solid #e0e0e0;
  transition: all 0.3s ease;
}

.option-card:hover {
  border-color: #5E35B1;
  transform: scale(1.05);
}

.option-card.selected {
  border-color: #5E35B1;
  background-color: #ede7f6;
}

.option-card.correct {
  border-color: #4caf50;
  background-color: #c8e6c9;
}

.option-card.incorrect {
  border-color: #f44336;
  background-color: #ffcdd2;
}
</style>

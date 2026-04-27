export const useTextToSpeech = () => {
  const isSpeaking = ref(false)
  const isAvailable = computed(() => 'speechSynthesis' in window)

  const speak = (text: string, options: { lang?: string; rate?: number; pitch?: number } = {}) => {
    if (!isAvailable.value) {
      console.warn('Text-to-Speech no está disponible en este navegador')
      return
    }

    // Detener si ya hay un audio en progreso
    if (isSpeaking.value) {
      window.speechSynthesis.cancel()
      isSpeaking.value = false
      return
    }

    const {
      lang = 'es-ES',
      rate = 0.9,
      pitch = 1,
    } = options

    const utterance = new SpeechSynthesisUtterance(text)
    
    utterance.lang = lang
    utterance.rate = rate
    utterance.pitch = pitch
    utterance.volume = 1

    utterance.onstart = () => {
      isSpeaking.value = true
    }

    utterance.onend = () => {
      isSpeaking.value = false
    }

    utterance.onerror = () => {
      isSpeaking.value = false
    }

    window.speechSynthesis.speak(utterance)
  }

  const stop = () => {
    if (isAvailable.value) {
      window.speechSynthesis.cancel()
      isSpeaking.value = false
    }
  }

  onBeforeUnmount(() => {
    stop()
  })

  return {
    isSpeaking: readonly(isSpeaking),
    isAvailable,
    speak,
    stop,
  }
}

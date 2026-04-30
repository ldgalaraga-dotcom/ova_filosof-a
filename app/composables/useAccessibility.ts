import { computed, onMounted, watch } from 'vue'
import { useOvaStore } from '~/stores/ova'

export const useAccessibility = () => {
  const tienda = useOvaStore()
  
  const speeds = [
    { label: 'Lento', value: 'slow', icon: 'mdi-speedometer-slow' },
    { label: 'Normal', value: 'normal', icon: 'mdi-speedometer-medium' },
    { label: 'Rápido', value: 'fast', icon: 'mdi-speedometer' },
  ] as const
  
  const sizes = [
    { label: 'A', value: 'small', icon: 'mdi-format-font-size-decrease' },
    { label: 'A', value: 'normal', icon: 'mdi-format-font-size' },
    { label: 'A', value: 'large', icon: 'mdi-format-font-size-increase' },
  ] as const
  
  const currentSpeed = computed({
    get: () => tienda.ttsSpeed,
    set: (value) => { tienda.ttsSpeed = value },
  })
  
  const currentSize = computed({
    get: () => tienda.fontSize,
    set: (value) => { tienda.fontSize = value },
  })
  
  const getRootFontSize = () => {
    const sizes = {
      small: '14px',
      normal: '16px',
      large: '18px',
    }
    return sizes[tienda.fontSize]
  }
  
  const applyFontSize = () => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.fontSize = getRootFontSize()
    }
  }
  
  onMounted(() => {
    applyFontSize()
  })
  
  watch(() => tienda.fontSize, () => {
    applyFontSize()
  })
  
  return {
    speeds,
    sizes,
    currentSpeed,
    currentSize,
    getRootFontSize,
    applyFontSize,
  }
}

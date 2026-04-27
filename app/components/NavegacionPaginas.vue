<template>
  <v-row class="mt-8" justify="space-between" align="center">
    <v-col cols="auto">
      <v-btn
        v-if="paginaAnterior"
        :to="paginaAnterior.ruta"
        color="grey-lighten-2"
        variant="flat"
        rounded="xl"
        size="large"
        prepend-icon="mdi-arrow-left"
      >
        {{ paginaAnterior.etiqueta }}
      </v-btn>
    </v-col>

    <!-- Dots indicadores -->
    <v-col cols="auto" class="d-none d-sm-flex">
      <div class="d-flex gap-2 align-center">
        <div
          v-for="pagina in paginas"
          :key="pagina.ruta"
          class="dot-nav"
          :class="{ 'dot-activo': rutaActual === pagina.ruta }"
          :title="pagina.etiqueta"
          @click="ir(pagina.ruta)"
        />
      </div>
    </v-col>

    <v-col cols="auto">
      <v-btn
        v-if="paginaSiguiente"
        :to="paginaSiguiente.ruta"
        color="primary"
        variant="flat"
        rounded="xl"
        size="large"
        append-icon="mdi-arrow-right"
      >
        {{ paginaSiguiente.etiqueta }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
const ruta = useRoute()
const enrutador = useRouter()

const paginas = [
  { ruta: '/contenido',   etiqueta: 'Contenido' },
  { ruta: '/actividades', etiqueta: 'Actividades' },
  { ruta: '/evaluacion',  etiqueta: 'Evaluación' },
  { ruta: '/recursos',    etiqueta: 'Recursos' },
  { ruta: '/creditos',    etiqueta: 'Créditos' },
]

const rutaActual = computed(() => ruta.path)
const indiceActual = computed(() => paginas.findIndex(p => p.ruta === rutaActual.value))

const paginaAnterior = computed(() =>
  indiceActual.value > 0 ? paginas[indiceActual.value - 1] : null
)
const paginaSiguiente = computed(() =>
  indiceActual.value < paginas.length - 1 ? paginas[indiceActual.value + 1] : null
)

function ir(destino: string) {
  enrutador.push(destino)
}
</script>

<style scoped>
.dot-nav {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: #D1C4E9;
  cursor: pointer;
  transition: all 0.2s;
}
.dot-nav:hover { background: #9575CD; transform: scale(1.2); }
.dot-activo { background: #5E35B1; transform: scale(1.3); }
</style>

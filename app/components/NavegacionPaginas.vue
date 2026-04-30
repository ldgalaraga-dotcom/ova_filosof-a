<template>
  <v-row class="mt-8" justify="space-between" align="center">
    <v-col cols="auto">
      <v-btn
        v-if="paginaAnterior"
        :to="paginaAnterior.ruta"
        color="primary"
        variant="outlined"
        rounded="lg"
        size="large"
        prepend-icon="mdi-arrow-left"
        style="font-family:'Cinzel',serif;letter-spacing:0.07em;text-transform:uppercase;font-size:0.8rem;border-color:rgba(27,58,107,0.4)"
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
        rounded="lg"
        size="large"
        append-icon="mdi-arrow-right"
        style="font-family:'Cinzel',serif;letter-spacing:0.07em;text-transform:uppercase;font-size:0.8rem;background:linear-gradient(135deg,#1B3A6B,#1B3A6B)"
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
  { ruta: '/reflexiones', etiqueta: 'Reflexiones' },
  { ruta: '/recursos',    etiqueta: 'Recursos' },
  { ruta: '/evaluacion',  etiqueta: 'Evaluación' },
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
  background: rgba(201,168,76,0.3);
  border: 1px solid rgba(201,168,76,0.5);
  cursor: pointer;
  transition: all 0.2s;
}
.dot-nav:hover { background: #C9A84C; transform: scale(1.2); }
.dot-activo { background: #1B3A6B; transform: scale(1.3); border-color:var(--text-primary); }
</style>

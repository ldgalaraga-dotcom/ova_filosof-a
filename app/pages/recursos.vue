<template>
  <div>
    <div class="d-flex align-center mb-5">
      <v-icon color="accent" size="38" class="mr-3">mdi-bookshelf</v-icon>
      <div>
        <h1 style="font-family:'Fredoka One',cursive;font-size:1.9rem;color:#00838F;line-height:1.1">Recursos</h1>
        <div style="color:#888;font-size:0.95rem">Material extra para seguir aprendiendo 📚</div>
      </div>
    </div>

    <!-- Línea del tiempo de filósofos -->
    <v-card rounded="xl" elevation="3" class="mb-5">
      <v-card-title class="pa-5 pb-2">
        <v-icon color="primary" class="mr-2">mdi-timeline-clock</v-icon>
        <span style="font-family:'Fredoka One',cursive">Grandes Filósofos</span>
      </v-card-title>
      <v-card-text class="pa-5 pt-2">
        <div v-for="(fil, i) in filosofos" :key="fil.nombre" class="d-flex align-start mb-4">
          <div class="d-flex flex-column align-center mr-4">
            <v-avatar :color="fil.color" size="44">
              <span style="font-size:1.4rem">{{ fil.emoji }}</span>
            </v-avatar>
            <div v-if="i < filosofos.length - 1" style="width:2px;height:28px;background:linear-gradient(to bottom,#9575CD,transparent);margin-top:4px" />
          </div>
          <div>
            <div class="d-flex align-center flex-wrap gap-2 mb-1">
              <span style="font-weight:800;font-size:1rem;color:#333">{{ fil.nombre }}</span>
              <v-chip :color="fil.color" size="x-small" label>{{ fil.periodo }}</v-chip>
            </div>
            <div style="font-size:0.9rem;color:#555;line-height:1.5">{{ fil.aporte }}</div>
            <div style="font-size:0.82rem;font-style:italic;color:#999;margin-top:3px">"{{ fil.cita }}"</div>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <!-- Glosario -->
    <v-card rounded="xl" elevation="3" class="mb-5">
      <v-card-title class="pa-5 pb-2">
        <v-icon color="secondary" class="mr-2">mdi-book-alphabet</v-icon>
        <span style="font-family:'Fredoka One',cursive">Glosario Filosófico</span>
      </v-card-title>
      <v-card-text class="pa-5 pt-2">
        <v-row>
          <v-col v-for="termino in glosario" :key="termino.palabra" cols="12" sm="6" md="4">
            <div class="pa-3 rounded-xl" style="background:#EDE7F6;border-left:4px solid #7E57C2;margin-bottom:8px">
              <div style="font-weight:800;color:#5E35B1;font-size:0.95rem">{{ termino.palabra }}</div>
              <div style="font-size:0.88rem;color:#555;line-height:1.5;margin-top:3px">{{ termino.definicion }}</div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Lecturas y videos recomendados -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="3" class="h-100">
          <v-card-title class="pa-5 pb-2">
            <v-icon color="primary" class="mr-2">mdi-book-open</v-icon>
            <span style="font-family:'Fredoka One',cursive">Libros</span>
          </v-card-title>
          <v-card-text class="pa-5 pt-2">
            <div v-for="libro in libros" :key="libro.titulo" class="d-flex align-start mb-3 pa-3 rounded-xl" style="background:#EDE7F6">
              <span style="font-size:1.6rem;margin-right:10px">{{ libro.emoji }}</span>
              <div>
                <div style="font-weight:800;font-size:0.93rem;color:#333">{{ libro.titulo }}</div>
                <div style="font-size:0.82rem;color:#777">{{ libro.descripcion }}</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="3" class="h-100">
          <v-card-title class="pa-5 pb-2">
            <v-icon color="error" class="mr-2">mdi-youtube</v-icon>
            <span style="font-family:'Fredoka One',cursive">Videos Extra</span>
          </v-card-title>
          <v-card-text class="pa-5 pt-2">
            <div v-for="vid in videosExtra" :key="vid.titulo" class="d-flex align-start mb-3 pa-3 rounded-xl" style="background:#FFEBEE">
              <span style="font-size:1.6rem;margin-right:10px">{{ vid.emoji }}</span>
              <div>
                <div style="font-weight:800;font-size:0.93rem;color:#333">{{ vid.titulo }}</div>
                <div style="font-size:0.82rem;color:#777">{{ vid.descripcion }}</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <NavegacionPaginas />
  </div>
</template>

<script setup lang="ts">
import { useOvaStore } from '~/stores/ova'
const tienda = useOvaStore()
onMounted(() => tienda.markPageVisited('recursos'))

const filosofos = [
  { nombre: 'Tales de Mileto', periodo: '624–546 a.C.', emoji: '💧', color: 'blue-lighten-3', aporte: 'Primer filósofo de occidente. Creía que todo venía del agua.', cita: 'El agua es el principio de todas las cosas.' },
  { nombre: 'Sócrates', periodo: '470–399 a.C.', emoji: '🏛️', color: 'purple-lighten-3', aporte: 'Creó el método socrático: enseñar preguntando. Fue condenado a muerte por sus ideas.', cita: 'Solo sé que no sé nada.' },
  { nombre: 'Platón', periodo: '427–347 a.C.', emoji: '🌟', color: 'indigo-lighten-3', aporte: 'Discípulo de Sócrates. Fundó La Academia, la primera universidad del mundo.', cita: 'El conocimiento es el recuerdo del alma.' },
  { nombre: 'Aristóteles', periodo: '384–322 a.C.', emoji: '📚', color: 'teal-lighten-3', aporte: 'Estudió lógica, biología, política y ética. Maestro de Alejandro Magno.', cita: 'El hombre es un animal político.' },
  { nombre: 'Descartes', periodo: '1596–1650', emoji: '🔬', color: 'green-lighten-3', aporte: 'Padre de la filosofía moderna. Usó la duda para encontrar certezas.', cita: 'Pienso, luego existo.' },
  { nombre: 'Kant', periodo: '1724–1804', emoji: '⚖️', color: 'orange-lighten-3', aporte: 'Creó la ética del deber. Preguntó qué podemos conocer, qué debemos hacer.', cita: 'Actúa solo según aquello que pudieras querer que fuera ley universal.' },
]

const glosario = [
  { palabra: 'Filosofía', definicion: 'Amor por la sabiduría. Búsqueda de respuestas a las grandes preguntas.' },
  { palabra: 'Ética', definicion: 'Estudio de lo correcto e incorrecto, la moral y los valores.' },
  { palabra: 'Epistemología', definicion: 'Estudio del conocimiento: cómo sabemos lo que sabemos.' },
  { palabra: 'Ontología', definicion: 'Estudio del ser y la existencia. ¿Qué soy yo? ¿Qué existe?' },
  { palabra: 'Lógica', definicion: 'Ciencia del pensamiento correcto y la argumentación.' },
  { palabra: 'Virtud', definicion: 'Hábito positivo que nos hace mejores personas.' },
  { palabra: 'Razón', definicion: 'Capacidad humana de pensar y llegar a conclusiones.' },
  { palabra: 'Verdad', definicion: 'Afirmación que corresponde con la realidad tal como es.' },
  { palabra: 'Dialéctica', definicion: 'Método de debate para encontrar la verdad.' },
]

const libros = [
  { emoji: '📕', titulo: 'El Mundo de Sofía', descripcion: 'Jostein Gaarder. Filosofía para jóvenes en forma de novela.' },
  { emoji: '📗', titulo: 'Platón para Todos', descripcion: 'Adaptación simple de los diálogos de Platón.' },
  { emoji: '📘', titulo: 'Filosofía en Viñetas', descripcion: 'Historietas sobre los grandes filósofos.' },
]

const videosExtra = [
  { emoji: '▶️', titulo: 'Filosofía para Principiantes (YouTube)', descripcion: 'Serie animada que explica conceptos básicos.' },
  { emoji: '▶️', titulo: 'TED-Ed: Filosofía', descripcion: 'Charlas cortas y animadas sobre preguntas filosóficas.' },
  { emoji: '▶️', titulo: 'Khan Academy Filosofía', descripcion: 'Cursos gratuitos con videos y ejercicios.' },
]
</script>

<template>
  <div>
    <div class="d-flex align-center mb-5">
      <v-icon color="secondary" size="38" class="mr-3">mdi-account-group</v-icon>
      <div>
        <h1 style="font-family:'Cinzel',serif;font-size:1.8rem;color:#C9A84C;line-height:1.1;letter-spacing:0.08em;text-transform:uppercase">
          Créditos
        </h1>
        <div style="color:var(--text-muted);font-size:0.92rem;font-family:'EB Garamond',serif;font-style:italic">
          Los artesanos de este Ágora del Saber ✦
        </div>
      </div>
    </div>

    <!-- Banner principal -->
    <v-card rounded="lg" elevation="4" class="mb-6 text-center"
      style="background:linear-gradient(135deg,#1B3A6B,#122440,#1B3A6B);border:2px solid rgba(201,168,76,0.4)"
    >
      <!-- Friso superior -->
      <div style="height:6px;background:repeating-linear-gradient(90deg,#C9A84C 0px,#C9A84C 10px,#1B3A6B 10px,#1B3A6B 20px)"></div>
      <v-card-text class="pa-8">
        <div style="margin-bottom:10px"><v-icon size="56" color="#C9A84C">mdi-pillar</v-icon></div>
        <div style="font-family:'Cinzel Decorative',serif;font-size:1.7rem;color:#E8C97A;margin-bottom:4px;letter-spacing:0.08em">
          Filosofía para Todos
        </div>
        <div style="color:rgba(232,201,122,0.75);font-size:1rem;margin-bottom:16px;font-family:'EB Garamond',serif;font-style:italic">
          Objeto Virtual de Aprendizaje · Grados X y XI
        </div>
        <!-- Divisor ornamental -->
        <div style="display:flex;align-items:center;gap:10px;margin:0 auto 14px;max-width:300px">
          <div style="flex:1;height:1px;background:rgba(201,168,76,0.5)"></div>
          <span style="color:#C9A84C;font-size:0.9rem">⬥</span>
          <div style="flex:1;height:1px;background:rgba(201,168,76,0.5)"></div>
        </div>
        <div class="d-flex justify-center flex-wrap gap-2">
          <v-chip color="secondary" label style="font-family:'Cinzel',serif;font-size:0.75rem;letter-spacing:0.08em"><v-icon size="16" class="mr-1">mdi-calendar</v-icon> MMXXVI</v-chip>
          <v-chip color="secondary" label style="font-family:'Cinzel',serif;font-size:0.75rem;letter-spacing:0.08em"><v-icon size="16" class="mr-1">mdi-bottle-tonic-plus</v-icon> Filosofía</v-chip>
          <v-chip color="secondary" label style="font-family:'Cinzel',serif;font-size:0.75rem;letter-spacing:0.08em"><v-icon size="16" class="mr-1">mdi-earth</v-icon> Colombia</v-chip>
          <v-chip color="secondary" label style="font-family:'Cinzel',serif;font-size:0.75rem;letter-spacing:0.08em"><v-icon size="16" class="mr-1">mdi-accessibility</v-icon> Inclusivo</v-chip>
        </div>
      </v-card-text>
      <div style="height:6px;background:repeating-linear-gradient(90deg,#C9A84C 0px,#C9A84C 10px,#1B3A6B 10px,#1B3A6B 20px)"></div>
    </v-card>

    <!-- Equipo -->
    <h2 style="font-family:'Cinzel',serif;font-size:1.3rem;color:var(--text-primary);text-align:center;margin-bottom:6px;letter-spacing:0.1em;text-transform:uppercase">
      Los Filósofos del Proyecto
    </h2>
    <div style="display:flex;align-items:center;gap:8px;padding:0;margin:0 auto 20px;max-width:360px">
      <div style="flex:1;height:1px;background:linear-gradient(90deg,transparent,#C9A84C)"></div>
      <span style="color:#C9A84C">✦</span>
      <div style="flex:1;height:1px;background:linear-gradient(90deg,#C9A84C,transparent)"></div>
    </div>

    <v-row class="mb-5">
      <v-col v-for="integrante in equipo" :key="integrante.nombre" cols="12" sm="6" md="4">
        <v-card rounded="lg" elevation="2" class="text-center h-100 greek-panel">
          <div style="height:4px;background:linear-gradient(90deg,#1B3A6B,#C9A84C,#1B3A6B)"></div>
          <v-card-text class="pa-5">
            <v-avatar size="80" class="mb-3" style="border:2px solid rgba(201,168,76,0.5);overflow:hidden;">
              <template #default>
                <v-img v-if="integrante.imagen" :src="integrante.imagen" cover />
                <v-icon v-else size="32" color="white">{{ integrante.icon }}</v-icon>
              </template>
            </v-avatar>
            <div style="font-family:'Cinzel',serif;font-weight:700;font-size:0.88rem;color:var(--text-primary);margin-bottom:4px;letter-spacing:0.03em">
              {{ integrante.nombre }}
            </div>
            <v-chip :color="integrante.color" size="small" label class="mb-2"
              style="font-family:'Cinzel',serif;font-size:0.72rem;letter-spacing:0.06em">
              {{ integrante.rol }}
            </v-chip>
            <div style="font-family:'EB Garamond',serif;font-size:0.9rem;color:var(--text-muted);line-height:1.55;font-style:italic">
              {{ integrante.descripcion }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Accesibilidad -->
    <v-card rounded="lg" elevation="2" class="mb-5 greek-panel">
      <div style="height:4px;background:linear-gradient(90deg,#1B3A6B,#C9A84C,#1B3A6B)"></div>
      <v-card-title class="pa-5 pb-2">
        <v-icon color="accent" class="mr-2">mdi-accessibility</v-icon>
        <span style="font-family:'Cinzel',serif;letter-spacing:0.06em;color:var(--text-primary)">Accesibilidad e Inclusión</span>
      </v-card-title>
      <v-card-text class="pa-5 pt-2">
        <v-row>
          <v-col v-for="caract in caracteristicas" :key="caract.titulo" cols="12" sm="6">
            <div class="d-flex align-start pa-3 rounded-lg mb-2"
              style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25)">
              <span style="margin-right:10px; color: #C9A84C"><v-icon size="28">{{ caract.icon }}</v-icon></span>
              <div>
                <div style="font-family:'Cinzel',serif;font-weight:600;color:var(--text-primary);font-size:0.85rem;letter-spacing:0.04em">
                  {{ caract.titulo }}
                </div>
                <div style="font-family:'EB Garamond',serif;font-size:0.88rem;color:var(--text-muted);line-height:1.4;font-style:italic">
                  {{ caract.descripcion }}
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Licencia -->
    <v-card rounded="lg" elevation="1" class="mb-8" style="background:#F5F0E8;border:1px solid rgba(201,168,76,0.3)">
      <v-card-text class="pa-4 text-center d-flex flex-column align-center"
        style="font-family:'EB Garamond',serif;font-size:0.9rem;color:var(--text-muted);line-height:1.8;font-style:italic">
        <div>
          <v-icon color="grey" class="mr-1">mdi-creative-commons</v-icon>
          Uso educativo sin ánimo de lucro ·
          <strong style="color:var(--text-primary);font-style:normal;font-family:'Cinzel',serif;font-size:0.8rem;letter-spacing:0.05em">
            Creative Commons BY-NC-SA 4.0
          </strong>
        </div>
        <v-btn color="primary" variant="tonal" size="small" class="mt-3" prepend-icon="mdi-link-variant" @click="mostrarReferencias = true" style="font-family:'Cinzel',serif;letter-spacing:0.05em">
          Ver Referencias y Derechos de Autor
        </v-btn>
      </v-card-text>
    </v-card>

    <!-- Dialog de Referencias -->
    <v-dialog v-model="mostrarReferencias" max-width="700px" scrollable>
      <v-card rounded="xl" style="border:2px solid #C9A84C;background:var(--bg-light); max-height:85vh;">
        <v-card-title class="pa-4 d-flex align-center" style="background:linear-gradient(135deg,#1B3A6B,#122440);border-bottom:2px solid #C9A84C; flex: 0 0 auto;">
          <v-icon color="#E8C97A" class="mr-2">mdi-book-open-page-variant</v-icon>
          <span style="font-family:'Cinzel',serif;color:#E8C97A;font-weight:700;font-size:1.1rem;">Referencias y Derechos de Autor</span>
          <v-spacer />
          <v-btn icon variant="text" size="small" color="white" @click="mostrarReferencias = false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text class="pa-5" style="overflow-y: auto;">
          <div style="font-family:'EB Garamond',serif;color:var(--text-dark);line-height:1.6;font-size:1rem;">
            
            <h3 style="font-family:'Cinzel',serif;color:var(--text-primary);border-bottom:1px solid rgba(201,168,76,0.5);padding-bottom:4px;margin-top:0;"><v-icon size="20" class="mr-2">mdi-bookshelf</v-icon> Tecnologías de Desarrollo</h3>
            <ul class="mb-4 pl-5">
              <li><strong>Framework Principal:</strong> <a href="https://nuxt.com/" target="_blank" style="color:#1B3A6B;text-decoration:none;font-weight:bold;">Nuxt 3</a> & <a href="https://vuejs.org/" target="_blank" style="color:#1B3A6B;text-decoration:none;font-weight:bold;">Vue.js 3</a> (Licencia MIT)</li>
              <li><strong>Librería de Componentes:</strong> <a href="https://vuetifyjs.com/" target="_blank" style="color:#1B3A6B;text-decoration:none;font-weight:bold;">Vuetify 3</a> (Licencia MIT)</li>
              <li><strong>Gestión de Estado:</strong> <a href="https://pinia.vuejs.org/" target="_blank" style="color:#1B3A6B;text-decoration:none;font-weight:bold;">Pinia</a> (Licencia MIT)</li>
            </ul>

            <h3 style="font-family:'Cinzel',serif;color:var(--text-primary);border-bottom:1px solid rgba(201,168,76,0.5);padding-bottom:4px;"><v-icon size="20" class="mr-2">mdi-palette</v-icon> Recursos Visuales e Imágenes</h3>
            <ul class="mb-4 pl-5">
              <li><strong>Tipografías:</strong> <a href="https://fonts.google.com/" target="_blank" style="color:#1B3A6B;text-decoration:none;font-weight:bold;">Cinzel y EB Garamond</a> por Google Fonts (OFL - Open Font License).</li>
              <li><strong>Íconos:</strong> Material Design Icons (Licencia Apache 2.0).</li>
              <li><strong>Retratos de Filósofos (Línea de Tiempo):</strong> Imágenes generadas sintéticamente a través de inteligencia artificial generativa exclusivamente para fines ilustrativos y educativos.</li>
            </ul>

            <h3 style="font-family:'Cinzel',serif;color:var(--text-primary);border-bottom:1px solid rgba(201,168,76,0.5);padding-bottom:4px;"><v-icon size="20" class="mr-2">mdi-video</v-icon> Contenido Audiovisual (YouTube)</h3>
            <p class="mb-2">El contenido en video incrustado en la sección "Contenido" se reproduce directamente desde los servidores de YouTube mediante <em>iframes</em>. Los derechos pertenecen a sus respectivos creadores. Se referencian aquí bajo la figura de uso justo y fines educativos:</p>
            <ul class="mb-4 pl-5">
              <li><strong>Unboxing Philosophy:</strong> Videos explicativos sobre Platón, Sócrates, Descartes, Kant, Marx y Nietzsche.</li>
              <li><strong>En Minutos / Educatina / CuriosaMente:</strong> Material sobre Filosofía Medieval, Contemporánea y Filosofía Latinoamericana.</li>
            </ul>

            <v-alert type="info" variant="tonal" color="primary" class="mt-4" style="font-family:'EB Garamond',serif;font-style:italic">
              Este Objeto Virtual de Aprendizaje (OVA) es un proyecto de grado académico diseñado exclusivamente para enriquecer el aprendizaje de la filosofía en estudiantes de secundaria. No persigue fines comerciales ni de lucro.
            </v-alert>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <NavegacionPaginas />
  </div>
</template>

<script setup lang="ts">
import { useOvaStore } from '~/stores/ova'
import { useAccessibility } from '~/composables/useAccessibility'

const tienda = useOvaStore()
useAccessibility() // Mantén la instancia activa para que el watch funcione
const mostrarReferencias = ref(false)
onMounted(() => tienda.markPageVisited('creditos'))

const equipo = [
  { nombre: 'Patricia Barroso Berrocal', rol: 'Dirección Pedagógica', icon: 'mdi-school', color: 'primary',   descripcion: 'Docente de Filosofía — Diseño curricular y validación del aprendizaje.' },
  { nombre: 'Luis Galaraga',             rol: 'Lógica e Integración',  icon: 'mdi-laptop', color: 'accent',    descripcion: 'Encargado de la lógica e integración de actividades del OVA.', imagen: '/img/Luis Galaraga.jpeg' },
  { nombre: 'Lina Franco',               rol: 'Diseño y Estética',     icon: 'mdi-laptop', color: 'accent',    descripcion: 'Encargada del diseño y estética de la interfaz.', imagen: '/img/Lina Franco.jpeg' },
  { nombre: 'Jesus Diaz Arteaga',        rol: 'Programación',         icon: 'mdi-laptop', color: 'accent',    descripcion: 'Apoyo en programación y asistencia técnica del proyecto.', imagen: '/img/Jesus Diaz Arteaga.jpeg' },
  { nombre: 'Psicología Educativa',      rol: 'Diseño Inclusivo',     icon: 'mdi-brain', color: 'success',   descripcion: 'Adaptación de contenidos para educación inclusiva.' },
  { nombre: 'Rector/a',                  rol: 'Dirección Inst.',      icon: 'mdi-pillar', color: 'secondary', descripcion: 'Apoyo institucional y gestión de recursos.' },
  { nombre: 'Estudiantes Piloto',        rol: 'Pruebas',              icon: 'mdi-star-shooting', color: 'warning',   descripcion: 'Grados X y XI que probaron y evaluaron el OVA.' },
  { nombre: 'Padres de Familia',         rol: 'Comunidad',            icon: 'mdi-heart', color: 'error',     descripcion: 'Apoyo continuo al aprendizaje desde el hogar.' },
]

const caracteristicas = [
  { icon: 'mdi-format-size', titulo: 'Texto grande y legible',   descripcion: 'Fuentes clásicas amplificadas para facilitar la lectura.' },
  { icon: 'mdi-volume-high', titulo: 'Lectura en voz alta',       descripcion: 'Botón flotante para escuchar cualquier página.' },
  { icon: 'mdi-cellphone-link', titulo: 'Diseño responsivo',         descripcion: 'Funciona en celular, tableta y computador.' },
  { icon: 'mdi-sync', titulo: 'Sin límite de intentos',    descripcion: 'Actividades y evaluación se pueden repetir.' },
  { icon: 'mdi-check-decagram', titulo: 'Retroalimentación inmediata', descripcion: 'Respuesta visual y textual al instante.' },
  { icon: 'mdi-map-outline', titulo: 'Navegación simple',         descripcion: 'Menú claro y botones siguiente/anterior en cada página.' },
]
</script>

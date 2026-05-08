<template>
  <div>
    <!-- Encabezado -->
    <div class="d-flex align-center flex-wrap justify-space-between mb-4" style="gap:8px">
      <div class="d-flex align-center">
        <v-icon color="secondary" size="28" class="mr-2">mdi-pencil-box-multiple</v-icon>
        <div>
          <h1 class="actividades-titulo">Actividades</h1>
          <div class="actividades-subtitulo">Ejercita tu razón como los grandes filósofos ✦</div>
        </div>
      </div>
      <div class="d-flex flex-column align-end gap-2">
        <v-btn color="primary" variant="tonal" size="small" prepend-icon="mdi-medal" @click="mostrarLogros = true" style="font-family:'Cinzel',serif;letter-spacing:0.05em">
          Mis Logros ({{ tienda.logrosObtenidos.length }}/{{ tienda.logros.length }})
        </v-btn>
        <v-chip color="secondary" size="small" prepend-icon="mdi-star-four-points"
          style="font-family:'Cinzel',serif;letter-spacing:0.06em">
          {{ cantidadCompletadas }}/6
        </v-chip>
      </div>
    </div>

    <!-- Dialog de Logros -->
    <v-dialog v-model="mostrarLogros" max-width="600px" scrollable>
      <v-card rounded="xl" style="border:2px solid #C9A84C;background:var(--bg-light); max-height: 80vh;">
        <v-card-title class="pa-4 d-flex align-center" style="background:linear-gradient(135deg,#1B3A6B,#122440);border-bottom:2px solid #C9A84C; flex: 0 0 auto;">
          <v-icon color="#E8C97A" class="mr-2">mdi-trophy-award</v-icon>
          <span style="font-family:'Cinzel',serif;color:#E8C97A;font-weight:700">Tus Logros Filosóficos</span>
          <v-spacer />
          <v-btn icon variant="text" size="small" color="white" @click="mostrarLogros = false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text class="pa-4 pt-5" style="overflow-y: auto;">
          <v-row dense>
            <v-col v-for="logro in tienda.logros" :key="logro.id" cols="12" sm="6">
              <v-card
                rounded="lg"
                class="pa-3 h-100 d-flex align-center"
                :style="logro.obtenido ? 'border:1px solid #5C6E2E;background:rgba(92,110,46,0.1)' : 'border:1px dashed rgba(201,168,76,0.4);background:rgba(0,0,0,0.02);opacity:0.7'"
              >
                <div style="margin-right:12px;filter: grayscale(100%); opacity: 0.5; color: #C9A84C" :style="logro.obtenido ? 'filter:none;opacity:1' : ''">
                  <v-icon size="40">{{ logro.icon }}</v-icon>
                </div>
                <div>
                  <div style="font-family:'Cinzel',serif;font-size:0.85rem;font-weight:700;color:var(--text-primary);letter-spacing:0.02em">
                    {{ logro.nombre }}
                  </div>
                  <div style="font-family:'EB Garamond',serif;font-size:0.85rem;color:var(--text-dark);line-height:1.2;margin-top:2px">
                    {{ logro.descripcion }}
                  </div>
                  <div v-if="logro.obtenido" style="font-family:'EB Garamond',serif;font-size:0.7rem;color:var(--text-success);margin-top:4px;font-style:italic">
                    Obtenido: {{ logro.fecha }}
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Selector de actividades -->
    <v-row class="mb-5" justify="center" role="tablist" aria-label="Actividades disponibles">
      <v-col v-for="(act, idx) in actividades" :key="idx" cols="6" sm="4" md="auto">
        <v-card
          rounded="lg" elevation="2"
          class="actividad-card"
          :style="actividadActual === idx
            ? 'box-shadow:0 4px 18px rgba(27,58,107,0.22)'
            : 'box-shadow:none'"
          role="tab"
          tabindex="0"
          :aria-selected="actividadActual === idx ? 'true' : 'false'"
          :aria-label="act.nombre + (tienda.completedActivities.includes(idx) ? ' (completada)' : '')"
          @click="actividadActual = idx"
          @keyup.enter="actividadActual = idx"
        >
          <!-- Franja superior de color según estado -->
          <div style="height:4px" :style="tienda.completedActivities.includes(idx)
            ? 'background:linear-gradient(90deg,#5C6E2E,#8BC34A)'
            : actividadActual === idx
              ? 'background:linear-gradient(90deg,#1B3A6B,#C9A84C)'
              : 'background:linear-gradient(90deg,rgba(201,168,76,0.3),rgba(201,168,76,0.1))'">
          </div>
          <v-card-text class="pa-3 text-center">
            <div style="margin-bottom:4px; color: var(--text-primary)" aria-hidden="true"><v-icon size="36">{{ act.icon }}</v-icon></div>
            <div style="font-family:'Cinzel',serif;font-size:0.75rem;font-weight:700;letter-spacing:0.04em;line-height:1.3"
              :style="actividadActual === idx ? 'color:var(--text-primary)' : 'color:var(--text-muted)'">
              {{ act.nombre }}
            </div>
            <v-chip
              :color="tienda.completedActivities.includes(idx) ? 'success' : 'grey-lighten-3'"
              size="x-small" class="mt-2" label
              style="font-family:'Cinzel',serif;font-size:0.65rem">
              {{ tienda.completedActivities.includes(idx) ? '✓ Lista' : 'Pendiente' }}
            </v-chip>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Ventana de actividades -->
    <v-window v-model="actividadActual" :touch="false">

      <!-- ═══════════════════════════════
           ACTIVIDAD 1 — La Dialéctica
           Verdadero o Falso
      ════════════════════════════════ -->
      <v-window-item :value="0">
        <v-card rounded="lg" elevation="3" style="overflow:hidden;border:1px solid rgba(201,168,76,0.25)">
          <div style="background:linear-gradient(135deg,#1B3A6B,#122440);padding:20px 20px 14px">
            <div class="d-flex align-center gap-2 mb-1">
              <v-icon color="secondary">mdi-scale-balance</v-icon>
              <span style="font-family:'Cinzel Decorative',serif;font-size:1.1rem;color:#E8C97A;letter-spacing:0.08em">
                La Dialéctica
              </span>
            </div>
            <div style="font-family:'EB Garamond',serif;font-style:italic;color:rgba(232,201,122,0.75);font-size:0.92rem">
              El arte de distinguir lo verdadero de lo falso · Basado en los 5 videos <v-icon size="16">mdi-pillar</v-icon>
            </div>
          </div>
          <v-card-text class="pa-5">
            <v-row>
              <v-col v-for="(pregunta, i) in preguntasVF" :key="i" cols="12" md="6">
                <v-card variant="outlined" rounded="lg" class="pa-4 h-100 d-flex flex-column"
                  :style="respuestasVF[i] === null
                    ? 'border-color:rgba(201,168,76,0.4)'
                    : respuestasVF[i] === pregunta.correcto
                      ? 'border-color:#5C6E2E;background:#D7EDD5'
                      : 'border-color:#8B3A2A;background:#F5D9D4'"
                >
                  <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:10px; flex: 1">
                    <span style="margin-top:2px; color: #C9A84C"><v-icon size="24">{{ pregunta.icon }}</v-icon></span>
                    <div style="font-family:'EB Garamond',serif;font-size:1rem;font-weight:600;color:var(--text-dark);line-height:1.5">
                      {{ i + 1 }}. {{ pregunta.enunciado }}
                    </div>
                  </div>
                  <v-chip size="x-small" color="primary" variant="tonal" class="mb-3 w-fit"
                    style="font-family:'Cinzel',serif;font-size:0.65rem;letter-spacing:0.05em; align-self: flex-start;">
                    <v-icon size="14" class="mr-1">mdi-video</v-icon> {{ pregunta.video }}
                  </v-chip>
                  <div v-if="respuestasVF[i] === null" class="d-flex gap-3">
                    <v-btn color="success" variant="tonal" rounded="lg"
                      style="font-family:'Cinzel',serif;letter-spacing:0.06em;font-size:0.8rem"
                      @click="responderVF(i, true)">
                      ✓ Verdadero
                    </v-btn>
                    <v-btn color="error" variant="tonal" rounded="lg"
                      style="font-family:'Cinzel',serif;letter-spacing:0.06em;font-size:0.8rem"
                      @click="responderVF(i, false)">
                      ✗ Falso
                    </v-btn>
                  </div>
                  <div v-else style="font-family:'EB Garamond',serif;font-size:0.95rem;color:var(--text-dark);font-style:italic">
                    <strong style="font-style:normal">
                      <v-icon size="20" class="mr-1">{{ respuestasVF[i] === pregunta.correcto ? 'mdi-check-circle' : 'mdi-close-circle' }}</v-icon>
                      {{ respuestasVF[i] === pregunta.correcto ? '¡Correcto!' : 'Incorrecto' }}
                    </strong>
                    — {{ pregunta.explicacion }}
                  </div>
                </v-card>
              </v-col>
            </v-row>
            <div v-if="vfCompletado" class="text-center mt-4">
              <div style="font-family:'Cinzel',serif;font-size:0.85rem;color:var(--text-primary);margin-bottom:10px;letter-spacing:0.05em">
                Acertaste {{ aciertosVF }} de {{ preguntasVF.length }} preguntas
              </div>
              <v-btn color="primary" rounded="lg"
                style="font-family:'Cinzel',serif;letter-spacing:0.08em;text-transform:uppercase"
                @click="tienda.completeActivity(0)">
                <v-icon class="mr-1">mdi-check</v-icon> Completar actividad
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-window-item>

      <!-- ═══════════════════════════════
           ACTIVIDAD 2 — El Simposio
           Emparejar filósofo + idea
      ════════════════════════════════ -->
      <v-window-item :value="1">
        <v-card rounded="lg" elevation="3" style="overflow:hidden;border:1px solid rgba(201,168,76,0.25)">
          <div style="background:linear-gradient(135deg,#2A1B4A,#4A2A7A);padding:20px 20px 14px">
            <div class="d-flex align-center gap-2 mb-1">
              <v-icon color="secondary">mdi-account-group</v-icon>
              <span style="font-family:'Cinzel Decorative',serif;font-size:1.1rem;color:#E8C97A;letter-spacing:0.08em">
                El Simposio
              </span>
            </div>
            <div style="font-family:'EB Garamond',serif;font-style:italic;color:rgba(232,201,122,0.75);font-size:0.92rem">
              «Symposion»: el banquete donde los sabios confrontan sus ideas · Videos: Sócrates, Platón <v-icon size="16">mdi-puzzle</v-icon>
            </div>
          </div>
          <v-card-text class="pa-5">
            <v-row>
              <v-col cols="12" md="6">
                <div class="text-center mb-3">
                  <v-chip color="primary" size="small" style="font-family:'Cinzel',serif;letter-spacing:0.06em">
                    <v-icon size="16" class="mr-1">mdi-account</v-icon> Filósofo / Concepto
                  </v-chip>
                </div>
                <div
                  v-for="fil in juegoEmparejamiento.filosofos" :key="fil.id"
                  class="pa-3 rounded-lg mb-3 text-center"
                  :class="claseFilosofo(fil.id)"
                  style="background:var(--bg-light);border:2px solid transparent;transition:all .2s;cursor:pointer"
                  @click="seleccionarFilosofo(fil.id)"
                >
                  <div style="margin-bottom:6px; color: var(--text-primary)"><v-icon size="40">{{ fil.icon }}</v-icon></div>
                  <div style="font-family:'Cinzel',serif;font-weight:700;font-size:0.88rem;color:var(--text-primary);letter-spacing:0.04em">
                    {{ fil.nombre }}
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="text-center mb-3">
                  <v-chip color="secondary" size="small" style="font-family:'Cinzel',serif;letter-spacing:0.06em">
                    <v-icon size="16" class="mr-1">mdi-lightbulb</v-icon> Idea o definición
                  </v-chip>
                </div>
                <div
                  v-for="idea in juegoEmparejamiento.ideas" :key="idea.id"
                  class="pa-3 rounded-lg mb-3"
                  :class="claseIdea(idea.id)"
                  style="background:var(--bg-warm);border:2px solid transparent;transition:all .2s;cursor:pointer;font-family:'EB Garamond',serif;font-size:0.95rem;color:var(--text-dark);font-style:italic"
                  @click="seleccionarIdea(idea.id)"
                >
                  "{{ idea.texto }}"
                </div>
              </v-col>
            </v-row>
            <div class="mt-3 d-flex gap-3 align-center">
              <div style="font-family:'Cinzel',serif;font-size:0.8rem;color:var(--text-muted);letter-spacing:0.05em">
                Pares: {{ juegoEmparejamiento.paresCorrectos }}/{{ juegoEmparejamiento.filosofos.length }}
              </div>
              <v-btn v-if="juegoEmparejamiento.paresCorrectos > 0" color="grey" variant="outlined" size="small"
                rounded="lg" @click="reiniciarEmparejamiento">
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </div>
            <div v-if="juegoEmparejamiento.paresCorrectos === juegoEmparejamiento.filosofos.length" class="text-center mt-4">
              <v-alert type="success" rounded="lg" class="mb-3"
                style="font-family:'EB Garamond',serif;font-size:1rem">
                <v-icon class="mr-1" color="success">mdi-check-decagram</v-icon> ¡Excelente! Relacionaste todas las ideas correctamente.
              </v-alert>
              <v-btn color="primary" rounded="lg"
                style="font-family:'Cinzel',serif;letter-spacing:0.08em;text-transform:uppercase"
                @click="tienda.completeActivity(1)">
                <v-icon class="mr-1">mdi-check</v-icon> Completar actividad
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-window-item>

      <!-- ═══════════════════════════════
           ACTIVIDAD 3 — La Academia
           (Fusión de El Logos y Las Formas)
      ════════════════════════════════ -->
      <v-window-item :value="2">
        <v-card rounded="lg" elevation="3" style="overflow:hidden;border:1px solid rgba(201,168,76,0.25)">
          <div style="background:linear-gradient(135deg,#1B3A6B,#122440);padding:0">
            <v-tabs v-model="subActividadAcademia" bg-color="transparent" color="secondary" grow
              style="font-family:'Cinzel',serif;letter-spacing:0.05em">
              <v-tab :value="0"><v-icon class="mr-2">mdi-source-branch</v-icon> El Logos</v-tab>
              <v-tab :value="1"><v-icon class="mr-2">mdi-shape-outline</v-icon> Las Formas</v-tab>
            </v-tabs>
          </div>
          
          <v-window v-model="subActividadAcademia" :touch="false">
            <!-- Parte A: El Logos -->
            <v-window-item :value="0">
              <v-card-text class="pa-5">
                <div class="mb-4" style="font-family:'EB Garamond',serif;font-style:italic;color:var(--text-muted);font-size:0.95rem">
                   «Logos»: el camino de la razón ordenada · Toca en el orden correcto.
                </div>
                <v-row>
                  <v-col v-for="paso in juegoOrden.pasosMezclados" :key="paso.id" cols="6" sm="4">
                    <div class="pa-4 rounded-lg text-center mb-2" :class="claseOrden(paso.id)"
                      style="background:var(--bg-light);border:2px solid transparent;transition:all .2s;cursor:pointer"
                      @click="tocarPasoOrden(paso.id)">
                      <div style="margin-bottom:8px; color: var(--text-primary)"><v-icon size="48">{{ paso.icon }}</v-icon></div>
                      <div style="font-family:'Cinzel',serif;font-size:0.82rem;font-weight:700;color:var(--text-primary);letter-spacing:0.04em">
                        {{ paso.etiqueta }}
                      </div>
                    </div>
                  </v-col>
                </v-row>
                <div v-if="juegoOrden.seleccionados.length" class="mt-4">
                  <div class="d-flex align-center justify-space-between mb-2">
                    <div style="font-family:'Cinzel',serif;font-weight:600;font-size:0.82rem;color:var(--text-primary);letter-spacing:0.06em">TU ORDEN:</div>
                    <v-btn v-if="!juegoOrden.completado" size="x-small" variant="text" color="error" @click="juegoOrden.seleccionados = []">
                      <v-icon size="small" class="mr-1">mdi-delete-sweep</v-icon> Limpiar
                    </v-btn>
                  </div>
                  <div class="d-flex flex-wrap gap-2">
                    <v-chip v-for="(id, i) in juegoOrden.seleccionados" :key="id"
                      :color="juegoOrden.completado ? (juegoOrden.ordenCorrecto[i] === id ? 'success' : 'error') : 'primary'"
                      size="small" style="font-family:'Cinzel',serif;font-size:0.72rem" :closable="!juegoOrden.completado"
                      @click:close="juegoOrden.seleccionados = juegoOrden.seleccionados.filter(s => s !== id)">
                      {{ i + 1 }}. {{ juegoOrden.pasosMezclados.find(s => s.id === id)?.etiqueta }}
                    </v-chip>
                  </div>
                </div>
                <div v-if="juegoOrden.seleccionados.length === juegoOrden.pasosMezclados.length && !juegoOrden.completado" class="mt-4">
                  <v-btn color="primary" rounded="lg" @click="verificarOrden">Verificar</v-btn>
                </div>
                <div v-if="juegoOrden.completado" class="mt-4">
                  <v-alert :type="juegoOrden.esCorrecto ? 'success' : 'warning'" rounded="lg">
                    {{ juegoOrden.esCorrecto ? '¡Orden correcto!' : 'Orden incorrecto' }}
                  </v-alert>
                </div>
              </v-card-text>
            </v-window-item>

            <!-- Parte B: Las Formas -->
            <v-window-item :value="1">
              <v-card-text class="pa-5">
                <v-row>
                  <v-col cols="12" md="6">
                    <div v-for="img in juegoFormas.imagenes" :key="img.id"
                      class="rounded-xl mb-3 text-center pa-3" :class="claseImagen(img.id)"
                      style="border:3px solid transparent;transition:all .25s;cursor:pointer;position:relative"
                      @click="seleccionarImagen(img.id)">
                      <div v-if="juegoFormas.emparejados[img.id]" style="position:absolute;top:6px;right:6px;background:#5C6E2E;color:white;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700">✓</div>
                      <v-icon size="40">{{ img.icon }}</v-icon>
                      <div style="font-family:'Cinzel',serif;font-size:0.8rem;font-weight:700">{{ img.nombre }}</div>
                    </div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div v-for="concepto in juegoFormas.conceptos" :key="concepto.id"
                      class="rounded-xl mb-3 pa-3" :class="claseConcepto(concepto.id)"
                      style="border:3px solid transparent;transition:all .25s;cursor:pointer"
                      @click="seleccionarConcepto(concepto.id)">
                      <div style="font-family:'EB Garamond',serif;font-size:0.95rem;font-style:italic">"{{ concepto.texto }}"</div>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-window-item>
          </v-window>

          <v-divider />
          <v-card-text class="pa-4 text-center">
            <v-btn v-if="juegoOrden.completado && juegoFormas.paresCorrectos === juegoFormas.imagenes.length" 
              color="primary" rounded="lg" @click="tienda.completeActivity(2)">
              <v-icon class="mr-1">mdi-check</v-icon> Completar La Academia
            </v-btn>
            <div v-else style="font-family:'Cinzel',serif;font-size:0.8rem;color:var(--text-muted)">
              Completa ambas partes para finalizar esta actividad ({{ (juegoOrden.completado ? 1 : 0) + (juegoFormas.paresCorrectos === juegoFormas.imagenes.length ? 1 : 0) }}/2)
            </div>
          </v-card-text>
        </v-card>
      </v-window-item>

      <!-- ═══════════════════════════════
           ACTIVIDAD 4 — El Oráculo
      ════════════════════════════════ -->
      <v-window-item :value="3">
        <!-- Contenido de El Oráculo (antes era :value="4") -->
        <v-card rounded="lg" elevation="3" style="overflow:hidden;border:1px solid rgba(201,168,76,0.25)">
          <div style="background:linear-gradient(135deg,#1B3A6B,#122440);padding:20px 20px 14px">
            <div class="d-flex align-center gap-2 mb-1">
              <v-icon color="secondary">mdi-eye-circle</v-icon>
              <span style="font-family:'Cinzel Decorative',serif;font-size:1.1rem;color:#E8C97A;letter-spacing:0.08em">
                El Oráculo de Delfos
              </span>
            </div>
          </div>
          <v-card-text class="pa-5">
            <!-- (Contenido simplificado por espacio, lo recuperaré del original) -->
             <div v-for="(preg, i) in preguntasOraculo" :key="i" class="mb-5">
                <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:10px">
                  <div style="min-width:32px;height:32px;border-radius:50%;background:#1B3A6B;display:flex;align-items:center;justify-content:center;color:#E8C97A">{{ i + 1 }}</div>
                  <div style="flex:1">
                    <div class="mb-2 font-weight-bold">{{ preg.pregunta }}</div>
                    <v-row dense>
                      <v-col v-for="(op, oi) in preg.opciones" :key="oi" cols="12" sm="6">
                        <div class="pa-3 rounded-lg mb-2" :style="estiloOpcionOraculo(i, oi)" @click="responderOraculo(i, oi)" style="cursor:pointer;border:2px solid">
                          {{ op }}
                        </div>
                      </v-col>
                    </v-row>
                  </div>
                </div>
             </div>
             <div v-if="oraculoCompletado" class="text-center mt-4">
                <v-btn color="primary" rounded="lg" @click="tienda.completeActivity(3)">Completar Actividad</v-btn>
             </div>
          </v-card-text>
        </v-card>
      </v-window-item>

      <!-- ═══════════════════════════════
           ACTIVIDAD 5 — Sopa de Letras
      ════════════════════════════════ -->
      <v-window-item :value="4">
        <v-card rounded="lg" elevation="3" style="overflow:hidden;border:1px solid rgba(201,168,76,0.25)">
          <div style="background:linear-gradient(135deg,#3A2B1B,#5A422B);padding:20px 20px 14px">
             <div class="d-flex align-center gap-2 mb-1">
              <v-icon color="secondary">mdi-format-letter-matches</v-icon>
              <span style="font-family:'Cinzel Decorative',serif;font-size:1.1rem;color:#E8C97A;letter-spacing:0.08em">Sopa de Letras</span>
            </div>
            <div style="font-family:'EB Garamond',serif;font-style:italic;color:rgba(232,201,122,0.75);font-size:0.92rem">
              Responde las preguntas buscando las palabras en la sopa. Haz clic en la primera letra y luego en la última. <v-icon size="16">mdi-magnify</v-icon>
            </div>
          </div>
          <v-card-text class="pa-5 text-center">
            <div class="sopa-grid mb-4">
              <div v-for="(fila, y) in sopaLetras.grid" :key="'fila-'+y" class="sopa-fila">
                <div v-for="(letra, x) in fila" :key="'celda-'+x+'-'+y" class="sopa-celda" :class="{'celda-encontrada': esCeldaEncontrada(x, y), 'celda-seleccionada': esCeldaSeleccionada(x, y)}" @click="clickCeldaSopa(x, y)">{{ letra }}</div>
              </div>
            </div>

            <!-- Panel de preguntas -->
            <div class="mx-auto" style="max-width:700px;text-align:left">
              <div style="font-family:'Cinzel',serif;font-size:0.85rem;font-weight:700;color:var(--text-primary);letter-spacing:0.06em;margin-bottom:10px;text-transform:uppercase">
                <v-icon size="18" class="mr-1">mdi-help-circle</v-icon> Pistas — Encuentra las respuestas
              </div>
              <div v-for="(palabra, idx) in sopaLetras.palabras" :key="'pista-'+palabra"
                class="d-flex align-center gap-2 pa-2 mb-1 rounded-lg"
                :style="sopaLetras.palabrasEncontradas.includes(palabra)
                  ? 'background:var(--bg-success);border:1px solid var(--border-success)'
                  : 'background:var(--bg-subtle);border:1px solid rgba(201,168,76,0.15)'"
              >
                <div style="min-width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Cinzel',serif;font-size:0.7rem;font-weight:700"
                  :style="sopaLetras.palabrasEncontradas.includes(palabra)
                    ? 'background:var(--border-success);color:white'
                    : 'background:rgba(201,168,76,0.2);color:var(--text-primary)'"
                >{{ idx + 1 }}</div>
                <div style="flex:1;font-family:'EB Garamond',serif;font-size:0.92rem;color:var(--text-dark);line-height:1.3">
                  {{ PISTAS_SOPA[palabra] }}
                </div>
                <div v-if="sopaLetras.palabrasEncontradas.includes(palabra)"
                  style="font-family:'Cinzel',serif;font-size:0.78rem;font-weight:700;color:var(--text-success);letter-spacing:0.04em;white-space:nowrap">
                  <v-icon size="14" class="mr-1">mdi-check-circle</v-icon>{{ palabra }}
                </div>
                <div v-else style="font-family:'Cinzel',serif;font-size:0.78rem;color:var(--text-muted);letter-spacing:0.04em">
                  ? ? ?
                </div>
              </div>
              <div class="text-center mt-3" style="font-family:'Cinzel',serif;font-size:0.75rem;color:var(--text-muted)">
                {{ sopaLetras.palabrasEncontradas.length }} / {{ sopaLetras.palabras.length }} encontradas
              </div>
            </div>

            <div v-if="sopaLetras.completado" class="mt-5 text-center">
              <v-alert type="success" rounded="lg" class="mb-3" style="font-family:'EB Garamond',serif;font-size:1rem">
                <v-icon color="success" class="mr-1">mdi-trophy-award</v-icon> ¡Magnífico! Has encontrado todos los conceptos filosóficos.
              </v-alert>
              <v-btn color="primary" rounded="lg"
                style="font-family:'Cinzel',serif;letter-spacing:0.08em;text-transform:uppercase"
                @click="tienda.completeActivity(4)">
                <v-icon class="mr-1">mdi-check</v-icon> Completar actividad
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-window-item>

      <!-- ═══════════════════════════════
           ACTIVIDAD 6 — Crucigrama
      ════════════════════════════════ -->
      <v-window-item :value="5">
        <v-card rounded="lg" elevation="3" style="overflow:hidden;border:1px solid rgba(201,168,76,0.25)">
          <div style="background:linear-gradient(135deg,#1B3A6B,#5C6E2E);padding:20px 20px 14px">
            <div class="d-flex align-center gap-2 mb-1">
              <v-icon color="secondary">mdi-grid</v-icon>
              <span style="font-family:'Cinzel Decorative',serif;font-size:1.1rem;color:#E8C97A;letter-spacing:0.08em">Crucigrama Filosófico</span>
            </div>
            <div style="font-family:'EB Garamond',serif;font-style:italic;color:rgba(232,201,122,0.75);font-size:0.92rem">
              Encuentra las 10 palabras clave y verifícalas para avanzar.
            </div>
          </div>
          <v-card-text class="pa-5">
            <v-row>
              <v-col cols="12" md="7" class="d-flex flex-column align-center">
                <div class="crucigrama-container pa-4 rounded-xl">
                  <div v-for="(fila, y) in crucigrama.grid" :key="'cf-'+y" class="d-flex">
                    <div v-for="(celda, x) in fila" :key="'cc-'+x+'-'+y" class="crucigrama-celda-wrapper">
                      <div v-if="celda !== ''" class="celda-activa">
                        <!-- Número de pista -->
                        <span class="pista-numero">{{ obtenerNumeroPista(x, y) }}</span>
                        <input v-model="crucigrama.userGrid[y][x]" 
                          maxlength="1" 
                          class="crucigrama-input" 
                          :class="obtenerClaseEstado(x, y)"
                          @input="alEscribir(x, y)" />
                      </div>
                      <div v-else class="crucigrama-vacio"></div>
                    </div>
                  </div>
                </div>
                
                <div class="d-flex gap-3 mt-5">
                  <v-btn color="secondary" variant="flat" rounded="lg" prepend-icon="mdi-check-all"
                    style="font-family:'Cinzel',serif;letter-spacing:0.05em" @click="verificarCrucigrama">
                    Verificar Respuestas
                  </v-btn>
                  <v-btn color="grey" variant="outlined" rounded="lg" prepend-icon="mdi-refresh"
                    style="font-family:'Cinzel',serif;letter-spacing:0.05em" @click="reiniciarCrucigrama">
                    Reiniciar
                  </v-btn>
                </div>
              </v-col>
              
              <v-col cols="12" md="5">
                <div class="pa-4 rounded-lg" style="background:rgba(201,168,76,0.05); border:1px solid rgba(201,168,76,0.2); max-height: 500px; overflow-y: auto;">
                  <div class="mb-4">
                    <div class="text-overline mb-1" style="color:var(--text-muted)">Horizontales</div>
                    <div v-for="h in crucigrama.hints.filter(h => h.dir === 'H')" :key="'h-'+h.id" class="pista-item">
                      <span class="pista-badge">{{ h.id }}</span> {{ h.text }}
                    </div>
                  </div>
                  <div>
                    <div class="text-overline mb-1" style="color:var(--text-muted)">Verticales</div>
                    <div v-for="v in crucigrama.hints.filter(h => h.dir === 'V')" :key="'v-'+v.id" class="pista-item">
                      <span class="pista-badge">{{ v.id }}</span> {{ v.text }}
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
            
            <div v-if="crucigrama.completado" class="text-center mt-6 pa-4 rounded-xl" style="background:rgba(92,110,46,0.1); border:1px solid #5C6E2E">
              <div style="font-family:'Cinzel',serif;color:var(--text-success);font-weight:700;font-size:1.1rem;margin-bottom:10px">
                ✨ ¡HAS RESUELTO EL ENIGMA! ✨
              </div>
              <v-btn color="primary" rounded="lg" size="large"
                style="font-family:'Cinzel',serif;letter-spacing:0.08em;text-transform:uppercase"
                @click="tienda.completeActivity(5)">
                <v-icon class="mr-1">mdi-check</v-icon> Finalizar actividades
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-window-item>

      <!-- ═══════════════════════════════
           ACTIVIDAD 5 — El Oráculo de Delfos
           Identidad y Ética
      ════════════════════════════════ -->
      <v-window-item :value="4">
        <v-card rounded="lg" elevation="3" style="overflow:hidden;border:1px solid rgba(201,168,76,0.25)">
          <div style="background:linear-gradient(135deg,#1B3A6B,#122440);padding:20px 20px 14px">
            <div class="d-flex align-center gap-2 mb-1">
              <v-icon color="secondary">mdi-eye-circle</v-icon>
              <span style="font-family:'Cinzel Decorative',serif;font-size:1.1rem;color:#E8C97A;letter-spacing:0.08em">
                El Oráculo de Delfos
              </span>
            </div>
            <div style="font-family:'EB Garamond',serif;font-style:italic;color:rgba(232,201,122,0.75);font-size:0.92rem">
              «Γνῶθι σεαυτόν» — Conócete a ti mismo · Videos: ¿Quiénes Somos? y ¿Qué es la Ética?
            </div>
          </div>

          <v-card-text class="pa-5">
            <div v-for="(preg, i) in preguntasOraculo" :key="i" class="mb-5">
              <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:10px">
                <div style="
                  min-width:32px;height:32px;border-radius:50%;
                  background:linear-gradient(135deg,#1B3A6B,#1B3A6B);
                  display:flex;align-items:center;justify-content:center;
                  font-family:'Cinzel',serif;font-size:0.8rem;color:#E8C97A;font-weight:700
                ">{{ i + 1 }}</div>
                <div style="flex:1">
                  <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                    <span style="color: #C9A84C"><v-icon size="28">{{ preg.icon }}</v-icon></span>
                    <span style="font-family:'EB Garamond',serif;font-size:1.05rem;font-weight:600;color:var(--text-dark);line-height:1.4">
                      {{ preg.pregunta }}
                    </span>
                  </div>
                  <v-chip size="x-small" color="primary" variant="tonal" class="mb-3"
                    style="font-family:'Cinzel',serif;font-size:0.63rem;letter-spacing:0.05em">
                    <v-icon size="14" class="mr-1">mdi-video</v-icon> {{ preg.video }}
                  </v-chip>
                  <v-row dense>
                    <v-col v-for="(op, oi) in preg.opciones" :key="oi" cols="12" sm="6">
                      <div
                        class="pa-3 rounded-lg mb-2"
                        :style="estiloOpcionOraculo(i, oi)"
                        style="cursor:pointer;border:2px solid;transition:all .2s;font-family:'EB Garamond',serif;font-size:0.95rem;line-height:1.4"
                        @click="responderOraculo(i, oi)"
                      >
                        <span style="font-family:'Cinzel',serif;font-size:0.75rem;font-weight:700;margin-right:6px;opacity:0.7">
                          {{ ['α', 'β', 'γ', 'δ'][oi] }})
                        </span>
                        {{ op }}
                      </div>
                    </v-col>
                  </v-row>
                  <div v-if="respuestasOraculo[i] !== null" class="mt-1 pa-2 rounded-lg"
                    style="font-family:'EB Garamond',serif;font-size:0.9rem;font-style:italic;background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3)">
                    <span v-if="respuestasOraculo[i] === preg.correcto">
                      ✅ ¡Así habló el Oráculo! — {{ preg.explicacion }}
                    </span>
                    <span v-else>
                      <v-icon size="16" class="mr-1">mdi-lightbulb-on</v-icon> El Oráculo dice: {{ preg.explicacion }}
                    </span>
                  </div>
                </div>
              </div>
              <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent);margin-top:8px"></div>
            </div>

            <div v-if="oraculoCompletado" class="text-center mt-4">
              <div style="font-family:'Cinzel',serif;font-size:0.85rem;color:var(--text-primary);margin-bottom:10px;letter-spacing:0.05em">
                Respondiste {{ aciertosOraculo }} de {{ preguntasOraculo.length }} correctamente
              </div>
              <v-btn color="primary" rounded="lg"
                style="font-family:'Cinzel',serif;letter-spacing:0.08em;text-transform:uppercase"
                @click="tienda.completeActivity(4)">
                <v-icon class="mr-1">mdi-check</v-icon> Completar actividad
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-window-item>

      <!-- ═══════════════════════════════
           ACTIVIDAD 6 — Sopa de Letras
      ════════════════════════════════ -->
      <v-window-item :value="5">
        <v-card rounded="lg" elevation="3" style="overflow:hidden;border:1px solid rgba(201,168,76,0.25)">
          <div style="background:linear-gradient(135deg,#3A2B1B,#5A422B);padding:20px 20px 14px">
            <div class="d-flex align-center gap-2 mb-1">
              <v-icon color="secondary">mdi-format-letter-matches</v-icon>
              <span style="font-family:'Cinzel Decorative',serif;font-size:1.1rem;color:#E8C97A;letter-spacing:0.08em">
                Sopa de Letras
              </span>
            </div>
            <div style="font-family:'EB Garamond',serif;font-style:italic;color:rgba(232,201,122,0.75);font-size:0.92rem">
              Busca las 20 palabras clave de la filosofía. Haz clic en la primera letra y luego en la última para seleccionar una palabra. <v-icon size="16">mdi-magnify</v-icon>
            </div>
          </div>
          <v-card-text class="pa-5 text-center">
            
            <div class="sopa-grid mb-4">
              <div v-for="(fila, y) in sopaLetras.grid" :key="'fila-'+y" class="sopa-fila">
                <div v-for="(letra, x) in fila" :key="'celda-'+x+'-'+y"
                  class="sopa-celda"
                  :class="{
                    'celda-encontrada': esCeldaEncontrada(x, y),
                    'celda-seleccionada': esCeldaSeleccionada(x, y)
                  }"
                  @click="clickCeldaSopa(x, y)"
                >
                  {{ letra }}
                </div>
              </div>
            </div>

            <div class="mx-auto" style="max-width:700px;text-align:left">
              <div style="font-family:'Cinzel',serif;font-size:0.85rem;font-weight:700;color:var(--text-primary);letter-spacing:0.06em;margin-bottom:10px;text-transform:uppercase">
                <v-icon size="18" class="mr-1">mdi-help-circle</v-icon> Pistas — Encuentra las respuestas
              </div>
              <div v-for="(palabra, idx) in sopaLetras.palabras" :key="'pista-'+palabra"
                class="d-flex align-center gap-2 pa-2 mb-1 rounded-lg"
                :style="sopaLetras.palabrasEncontradas.includes(palabra)
                  ? 'background:var(--bg-success);border:1px solid var(--border-success)'
                  : 'background:var(--bg-subtle);border:1px solid rgba(201,168,76,0.15)'"
              >
                <div style="min-width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Cinzel',serif;font-size:0.7rem;font-weight:700"
                  :style="sopaLetras.palabrasEncontradas.includes(palabra)
                    ? 'background:var(--border-success);color:white'
                    : 'background:rgba(201,168,76,0.2);color:var(--text-primary)'"
                >{{ idx + 1 }}</div>
                <div style="flex:1;font-family:'EB Garamond',serif;font-size:0.92rem;color:var(--text-dark);line-height:1.3">
                  {{ PISTAS_SOPA[palabra] }}
                </div>
                <div v-if="sopaLetras.palabrasEncontradas.includes(palabra)"
                  style="font-family:'Cinzel',serif;font-size:0.78rem;font-weight:700;color:var(--text-success);letter-spacing:0.04em;white-space:nowrap">
                  <v-icon size="14" class="mr-1">mdi-check-circle</v-icon>{{ palabra }}
                </div>
                <div v-else style="font-family:'Cinzel',serif;font-size:0.78rem;color:var(--text-muted);letter-spacing:0.04em">
                  ? ? ?
                </div>
              </div>
              <div class="text-center mt-3" style="font-family:'Cinzel',serif;font-size:0.75rem;color:var(--text-muted)">
                {{ sopaLetras.palabrasEncontradas.length }} / {{ sopaLetras.palabras.length }} encontradas
              </div>
            </div>

            <div v-if="sopaLetras.completado" class="mt-5 text-center">
              <v-alert type="success" rounded="lg" class="mb-3" style="font-family:'EB Garamond',serif;font-size:1rem">
                <v-icon color="success" class="mr-1">mdi-trophy-award</v-icon> ¡Magnífico! Has encontrado todos los conceptos filosóficos en esta sopa de letras.
              </v-alert>
              <v-btn color="primary" rounded="lg"
                style="font-family:'Cinzel',serif;letter-spacing:0.08em;text-transform:uppercase"
                @click="tienda.completeActivity(5)">
                <v-icon class="mr-1">mdi-check</v-icon> Completar actividad
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-window-item>

    </v-window>

    <!-- ✦ Todo completado ✦ -->
    <v-card v-if="todasCompletadas" class="mt-6" rounded="lg" elevation="3"
      style="background:linear-gradient(135deg,#1B3A6B,#122440);border:2px solid rgba(201,168,76,0.5)">
      <div style="height:5px;background:repeating-linear-gradient(90deg,#C9A84C 0px,#C9A84C 10px,#1B3A6B 10px,#1B3A6B 20px)"></div>
      <v-card-text class="pa-7 text-center">
        <div style="margin-bottom:8px; color: #E8C97A"><v-icon size="64">mdi-trophy-award</v-icon></div>
        <div style="font-family:'Cinzel Decorative',serif;font-size:1.4rem;color:#E8C97A;margin:8px 0;letter-spacing:0.06em">
          ¡Has completado el Ágora!
        </div>
        <div style="font-family:'EB Garamond',serif;font-style:italic;color:rgba(232,201,122,0.75);font-size:1rem;margin-bottom:18px">
          Como Sócrates, has demostrado que la sabiduría crece con la práctica.
        </div>
        <v-btn color="secondary" to="/evaluacion" size="large" prepend-icon="mdi-clipboard-check" rounded="lg"
          style="font-family:'Cinzel',serif;letter-spacing:0.08em;text-transform:uppercase">
          Ir a la Evaluación Final
        </v-btn>
      </v-card-text>
      <div style="height:5px;background:repeating-linear-gradient(90deg,#C9A84C 0px,#C9A84C 10px,#1B3A6B 10px,#1B3A6B 20px)"></div>
    </v-card>

    <NavegacionPaginas />
  </div>
</template>

<script setup lang="ts">
import { useOvaStore } from '~/stores/ova'
import { useAccessibility } from '~/composables/useAccessibility'

const tienda = useOvaStore()
useAccessibility() // Mantén la instancia activa para que el watch funcione
onMounted(() => {
  tienda.markPageVisited('actividades')
  initSopa()
})

const mostrarLogros = ref(false)
const actividadActual = ref(0)
const subActividadAcademia = ref(0)
const actividades = [
  { icon: 'mdi-scale-balance', nombre: 'La Dialéctica' },
  { icon: 'mdi-account-group', nombre: 'El Simposio' },
  { icon: 'mdi-school', nombre: 'La Academia' },
  { icon: 'mdi-eye-circle', nombre: 'El Oráculo' },
  { icon: 'mdi-format-letter-matches', nombre: 'Sopa de Letras' },
  { icon: 'mdi-grid', nombre: 'Crucigrama' },
]
const cantidadCompletadas = computed(() => tienda.completedActivities.length)
const todasCompletadas    = computed(() => tienda.completedActivities.length >= 6)

// ══════════════════════════════════════
// ACTIVIDAD 1 — La Dialéctica (V/F)
// ══════════════════════════════════════
const preguntasVF = [
  {
    icon: 'mdi-head-question', video: 'Video 1 — ¿Qué es la Filosofía?',
    enunciado: 'La filosofía busca respuestas haciendo preguntas.',
    correcto: true,
    explicacion: 'Correcto. Preguntar es el corazón del pensamiento filosófico.',
  },
  {
    icon: 'mdi-book-open-variant', video: 'Video 2 — Sócrates',
    enunciado: 'Sócrates escribió muchos libros y tratados filosóficos.',
    correcto: false,
    explicacion: 'Falso. Sócrates no dejó nada escrito; fue Platón quien documentó sus ideas.',
  },
  {
    icon: 'mdi-pillar', video: 'Video 3 — Platón',
    enunciado: 'Platón fue discípulo de Sócrates.',
    correcto: true,
    explicacion: 'Correcto. Platón aprendió directamente de Sócrates en Atenas.',
  },
  {
    icon: 'mdi-microscope', video: 'Video 6 — Descartes',
    enunciado: 'René Descartes afirmó "Pienso, luego existo".',
    correcto: true,
    explicacion: 'Correcto. Descartes usó la duda para llegar a esa primera certeza indudable.',
  },
  {
    icon: 'mdi-walk', video: 'Video 10 — Existencialismo',
    enunciado: 'Para Sartre, la esencia humana ya está definida desde el nacimiento.',
    correcto: false,
    explicacion: 'Falso. El existencialismo propone que "la existencia precede a la esencia".',
  },
  {
    icon: 'mdi-scale-balance', video: 'Video 7 — Kant',
    enunciado: 'Kant propuso que debemos actuar según una máxima que pueda ser ley universal.',
    correcto: true,
    explicacion: 'Correcto. Este es su famoso "imperativo categórico".',
  },
  {
    icon: 'mdi-earth', video: 'Video 12 — Filosofía Latam',
    enunciado: 'La filosofía latinoamericana propone pensar desde la realidad de los oprimidos.',
    correcto: true,
    explicacion: 'Correcto. Pensadores como Dussel buscan una filosofía de la liberación.',
  },
]
const respuestasVF  = ref<(boolean | null)[]>(Array(preguntasVF.length).fill(null))
const vfCompletado  = computed(() => respuestasVF.value.every(r => r !== null))
const aciertosVF    = computed(() => respuestasVF.value.filter((r, i) => r === preguntasVF[i].correcto).length)
function responderVF(i: number, valor: boolean) { respuestasVF.value[i] = valor }

// ══════════════════════════════════════
// ACTIVIDAD 2 — El Simposio (Emparejar)
// ══════════════════════════════════════
const juegoEmparejamiento = reactive({
  filosofos: [
    { id: 'soc',   nombre: 'Sócrates',    icon: 'mdi-pillar' },
    { id: 'pla',   nombre: 'Platón',      icon: 'mdi-book-open-variant' },
    { id: 'ari',   nombre: 'Aristóteles', icon: 'mdi-bookshelf' },
    { id: 'des',   nombre: 'Descartes',   icon: 'mdi-microscope' },
    { id: 'kan',   nombre: 'Kant',        icon: 'mdi-scale-balance' },
    { id: 'mar',   nombre: 'Marx',        icon: 'mdi-hammer-wrench' },
    { id: 'sar',   nombre: 'Sartre',      icon: 'mdi-walk' },
    { id: 'dus',   nombre: 'Dussel',      icon: 'mdi-earth' },
  ],
  ideas: [
    { id: 'soc',   texto: 'Solo sé que no sé nada.' },
    { id: 'pla',   texto: 'El conocimiento es el recuerdo del alma (Formas).' },
    { id: 'ari',   texto: 'El hombre es un animal político.' },
    { id: 'des',   texto: 'Pienso, luego existo.' },
    { id: 'kan',   texto: 'Actúa según una máxima universal.' },
    { id: 'mar',   texto: 'Transformar el mundo y eliminar la alienación.' },
    { id: 'sar',   texto: 'Estamos condenados a ser libres.' },
    { id: 'dus',   texto: 'Pensar desde la periferia y los oprimidos.' },
  ].sort(() => Math.random() - 0.5),
  seleccionadoFilosofo: null as string | null,
  seleccionadaIdea:     null as string | null,
  emparejados:          {} as Record<string, string>,
  paresCorrectos:       0,
})

function claseFilosofo(id: string) {
  if (juegoEmparejamiento.emparejados[id]) return 'border-success-match'
  if (juegoEmparejamiento.seleccionadoFilosofo === id) return 'border-selected-match'
  return ''
}
function claseIdea(id: string) {
  if (Object.values(juegoEmparejamiento.emparejados).includes(id)) return 'border-success-match'
  if (juegoEmparejamiento.seleccionadaIdea === id) return 'border-selected-match'
  return ''
}
function seleccionarFilosofo(id: string) {
  if (juegoEmparejamiento.emparejados[id]) return
  juegoEmparejamiento.seleccionadoFilosofo = id
  intentarEmparejar()
}
function seleccionarIdea(id: string) {
  if (Object.values(juegoEmparejamiento.emparejados).includes(id)) return
  juegoEmparejamiento.seleccionadaIdea = id
  intentarEmparejar()
}
function intentarEmparejar() {
  const { seleccionadoFilosofo: f, seleccionadaIdea: i } = juegoEmparejamiento
  if (!f || !i) return
  if (f === i) {
    juegoEmparejamiento.emparejados[f] = i
    juegoEmparejamiento.paresCorrectos++
  }
  setTimeout(() => {
    juegoEmparejamiento.seleccionadoFilosofo = null
    juegoEmparejamiento.seleccionadaIdea     = null
  }, 350)
}
function reiniciarEmparejamiento() {
  juegoEmparejamiento.emparejados          = {}
  juegoEmparejamiento.paresCorrectos       = 0
  juegoEmparejamiento.seleccionadoFilosofo = null
  juegoEmparejamiento.seleccionadaIdea     = null
}

// ══════════════════════════════════════
// ACTIVIDAD 3 — El Logos (Ordenar)
// ══════════════════════════════════════
const pasosBase = [
  { id: 1, icon: 'mdi-pillar', etiqueta: 'Clásica (s. V a.C.)' },
  { id: 2, icon: 'mdi-cross', etiqueta: 'Medieval (s. V-XV)' },
  { id: 3, icon: 'mdi-microscope', etiqueta: 'Moderna (s. XVII-XVIII)' },
  { id: 4, icon: 'mdi-lightning-bolt', etiqueta: 'Siglo XIX' },
  { id: 5, icon: 'mdi-walk', etiqueta: 'Contemporánea (s. XX)' },
  { id: 6, icon: 'mdi-earth', etiqueta: 'Latinoamericana' },
]
const juegoOrden = reactive({
  pasosMezclados: [...pasosBase].sort(() => Math.random() - 0.5),
  seleccionados:  [] as number[],
  ordenCorrecto:  [1, 2, 3, 4, 5, 6],
  completado:     false,
  esCorrecto:     false,
})
function claseOrden(id: number) {
  if (juegoOrden.seleccionados.includes(id)) {
    if (juegoOrden.completado) {
      const pos = juegoOrden.seleccionados.indexOf(id)
      return juegoOrden.ordenCorrecto[pos] === id ? 'border-success-match' : 'border-error-match'
    }
    return 'border-selected-match'
  }
  return ''
}
function tocarPasoOrden(id: number) {
  if (juegoOrden.seleccionados.includes(id) || juegoOrden.completado) return
  juegoOrden.seleccionados.push(id)
}
function verificarOrden() {
  juegoOrden.completado = true
  juegoOrden.esCorrecto = juegoOrden.seleccionados.every((id, i) => id === juegoOrden.ordenCorrecto[i])
}
function reiniciarOrden() {
  juegoOrden.seleccionados  = []
  juegoOrden.completado     = false
  juegoOrden.esCorrecto     = false
  juegoOrden.pasosMezclados = [...pasosBase].sort(() => Math.random() - 0.5)
}

// ══════════════════════════════════════
// ACTIVIDAD 4 — Las Formas de Platón
// Relacionar imagen con concepto filosófico
// ══════════════════════════════════════
const juegoFormas = reactive({
  imagenes: [
    { id: 'caverna', icon: 'mdi-fireplace', nombre: 'La Caverna',   contexto: 'Platón' },
    { id: 'cruz',    icon: 'mdi-cross', nombre: 'La Cruz',      contexto: 'Santo Tomás' },
    { id: 'cerebro', icon: 'mdi-brain', nombre: 'La Mente',     contexto: 'Descartes' },
    { id: 'martillo',icon: 'mdi-hammer', nombre: 'El Martillo',  contexto: 'Marx / Nietzsche' },
    { id: 'cadena',  icon: 'mdi-link-variant-off', nombre: 'Cadenas Rotas', contexto: 'Dussel (Liberación)' },
  ],
  conceptos: [
    { id: 'caverna', texto: 'Confundir sombras con la realidad. La educación saca a la luz verdadera.', autor: 'Platón · Alegoría' },
    { id: 'cruz',    texto: 'La razón y la fe no se contradicen, provienen de la misma verdad.', autor: 'Tomás de Aquino · Escolástica' },
    { id: 'cerebro', texto: 'El "cogito". Aunque dude de todo, no puedo dudar de que hay una mente dudando.', autor: 'Descartes · Racionalismo' },
    { id: 'martillo',texto: 'Filosofar a martillazos (destruir ídolos) / La alienación del trabajador.', autor: 'Filosofía del s. XIX' },
    { id: 'cadena',  texto: 'Romper con la opresión y pensar desde la periferia de los excluidos.', autor: 'Filosofía Latinoamericana' },
  ].sort(() => Math.random() - 0.5),
  seleccionadaImagen:   null as string | null,
  seleccionadoConcepto: null as string | null,
  emparejados:          {} as Record<string, string>,
  paresCorrectos:       0,
})

function claseImagen(id: string) {
  if (juegoFormas.emparejados[id]) return 'imagen-correcta'
  if (juegoFormas.seleccionadaImagen === id) return 'imagen-seleccionada'
  return 'imagen-normal'
}
function claseConcepto(id: string) {
  if (Object.values(juegoFormas.emparejados).includes(id)) return 'concepto-correcto'
  if (juegoFormas.seleccionadoConcepto === id) return 'concepto-seleccionado'
  return 'concepto-normal'
}
function seleccionarImagen(id: string) {
  if (juegoFormas.emparejados[id]) return
  juegoFormas.seleccionadaImagen = id
  intentarEmparejarFormas()
}
function seleccionarConcepto(id: string) {
  if (Object.values(juegoFormas.emparejados).includes(id)) return
  juegoFormas.seleccionadoConcepto = id
  intentarEmparejarFormas()
}
function intentarEmparejarFormas() {
  const img = juegoFormas.seleccionadaImagen
  const con = juegoFormas.seleccionadoConcepto
  if (!img || !con) return
  if (img === con) {
    juegoFormas.emparejados[img] = con
    juegoFormas.paresCorrectos++
  }
  setTimeout(() => {
    juegoFormas.seleccionadaImagen   = null
    juegoFormas.seleccionadoConcepto = null
  }, 400)
}
function reiniciarFormas() {
  juegoFormas.emparejados          = {}
  juegoFormas.paresCorrectos       = 0
  juegoFormas.seleccionadaImagen   = null
  juegoFormas.seleccionadoConcepto = null
}

// ══════════════════════════════════════
// ACTIVIDAD 5 — El Oráculo de Delfos
// ══════════════════════════════════════
const preguntasOraculo = [
  {
    icon: 'mdi-mirror', video: 'Video 2 — Sócrates y la Mayéutica',
    pregunta: '«Conócete a ti mismo» es la frase inscrita en el Templo de Delfos. ¿A quién se atribuye su uso constante?',
    opciones: ['Aristóteles', 'Platón', 'Sócrates', 'Descartes'],
    correcto: 2,
    explicacion: 'Se atribuye a Sócrates. Inspira la búsqueda de la sabiduría en nuestro propio interior.',
  },
  {
    icon: 'mdi-thought-bubble-outline', video: 'Video 6 — Descartes',
    pregunta: '¿Cuál es la primera certeza a la que llega Descartes tras aplicar la "duda metódica"?',
    opciones: ['Que el mundo material existe', 'Que Dios existe', 'Que piensa y por tanto existe', 'Que los sentidos no engañan'],
    correcto: 2,
    explicacion: '"Cogito ergo sum" (pienso, luego existo) es la base del racionalismo moderno.',
  },
  {
    icon: 'mdi-scale-balance', video: 'Video 7 — Kant y la Ética',
    pregunta: 'Según Kant, una acción es moralmente correcta si...',
    opciones: ['Produce felicidad', 'Puede convertirse en ley universal', 'Es ordenada por la ley', 'Evita el castigo'],
    correcto: 1,
    explicacion: 'El «imperativo categórico» exige actuar según máximas universalizables.',
  },
  {
    icon: 'mdi-lightning-bolt', video: 'Video 9 — Nietzsche',
    pregunta: '¿Qué significa la famosa frase "Dios ha muerto" de Nietzsche?',
    opciones: ['Una afirmación biológica', 'El declive de los valores absolutos en Occidente', 'Una teoría astronómica', 'Una alabanza a la religión'],
    correcto: 1,
    explicacion: 'Nietzsche se refería al colapso de los valores supremos tradicionales.',
  },
  {
    icon: 'mdi-earth', video: 'Video 12 — Filosofía Latam',
    pregunta: '¿Qué propone principalmente la "Pedagogía del Oprimido" de Paulo Freire?',
    opciones: [
      'Una educación bancaria y memorística',
      'Una educación crítica y liberadora',
      'Un sistema escolar elitista',
      'Excluir a los adultos de la educación',
    ],
    correcto: 1,
    explicacion: 'Freire propone la educación como práctica de la libertad y la concientización.',
  },
]
const respuestasOraculo  = ref<(number | null)[]>(Array(preguntasOraculo.length).fill(null))
const oraculoCompletado  = computed(() => respuestasOraculo.value.every(r => r !== null))
const aciertosOraculo    = computed(() => respuestasOraculo.value.filter((r, i) => r === preguntasOraculo[i].correcto).length)
function responderOraculo(i: number, opcion: number) { respuestasOraculo.value[i] = opcion }
function estiloOpcionOraculo(i: number, oi: number): string {
  const resp    = respuestasOraculo.value[i]
  const correct = preguntasOraculo[i].correcto
  if (resp === null) return 'border-color:rgba(201,168,76,0.3);background:var(--bg-warm);color:var(--text-dark)'
  if (oi === correct) return 'border-color:var(--border-success);background:var(--bg-success);color:var(--text-dark)'
  if (resp === oi)    return 'border-color:var(--border-error);background:var(--bg-error);color:var(--text-dark)'
  return 'border-color:rgba(201,168,76,0.15);background:var(--bg-light);color:var(--text-muted)'
}

// ══════════════════════════════════════
// ACTIVIDAD 6 — Sopa de Letras
// ══════════════════════════════════════
const PALABRAS_SOPA = [
  'FILOSOFIA', 'SOCRATES', 'PLATON', 'ARISTOTELES', 'ETICA', 'COGITO', 
  'DIALECTICA', 'ALIENACION', 'ACADEMIA', 'VERDAD', 'RAZON', 'DESCARTES', 
  'CAVERNA', 'KANT', 'MARX', 'NIETZSCHE', 'MAYEUTICA', 'LIBERACION', 'SARTRE', 'DUSSEL'
]

const PISTAS_SOPA: Record<string, string> = {
  FILOSOFIA: '¿Cómo se le llama al amor por la sabiduría?',
  SOCRATES: '¿Quién fue el maestro de Platón que no dejó escritos?',
  PLATON: '¿Quién escribió "La República" y fundó la Academia?',
  ARISTOTELES: '¿Quién es el padre de la lógica formal?',
  ETICA: '¿Qué rama de la filosofía estudia la moral?',
  COGITO: '¿Cuál es la palabra latina del "pienso, luego existo"?',
  DIALECTICA: '¿Cómo se llama el método de argumentación por tesis, antítesis y síntesis?',
  ALIENACION: '¿Qué concepto marxista describe la separación del trabajador de su producto?',
  ACADEMIA: '¿Cómo se llamó la escuela fundada por Platón en Atenas?',
  VERDAD: '¿Qué concepto busca toda investigación filosófica?',
  RAZON: '¿Cuál es la capacidad humana de pensar críticamente?',
  DESCARTES: '¿Quién fundó el racionalismo con la duda metódica?',
  CAVERNA: '¿Cuál es la alegoría más famosa de Platón?',
  KANT: '¿Quién formuló el imperativo categórico?',
  MARX: '¿Quién dijo que la historia es una lucha de clases?',
  NIETZSCHE: '¿Quién declaró "la muerte de Dios"?',
  MAYEUTICA: '¿Cómo se llama el método socrático de hacer preguntas?',
  LIBERACION: '¿Qué corriente filosófica latinoamericana propone pensar desde los oprimidos?',
  SARTRE: '¿Quién dijo que "la existencia precede a la esencia"?',
  DUSSEL: '¿Quién es el fundador de la Filosofía de la Liberación?',
}

const GRID_SIZE = 16

const sopaLetras = reactive({
  palabras: PALABRAS_SOPA,
  grid: [] as string[][],
  celdasEncontradas: [] as {x: number, y: number}[],
  palabrasEncontradas: [] as string[],
  primerClick: null as {x: number, y: number} | null,
  completado: false,
})

function generarSopa() {
  const grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''))
  const dirs = [
    [0, 1], [1, 0], [1, 1], [1, -1],
    [0, -1], [-1, 0], [-1, -1], [-1, 1]
  ]
  
  for (const palabra of PALABRAS_SOPA) {
    let placed = false
    let attempts = 0
    while (!placed && attempts < 2000) {
      const d = dirs[Math.floor(Math.random() * dirs.length)]
      const startX = Math.floor(Math.random() * GRID_SIZE)
      const startY = Math.floor(Math.random() * GRID_SIZE)
      
      let canPlace = true
      for (let i = 0; i < palabra.length; i++) {
        const nx = startX + d[0] * i
        const ny = startY + d[1] * i
        if (nx < 0 || nx >= GRID_SIZE || ny < 0 || ny >= GRID_SIZE) {
          canPlace = false
          break
        }
        if (grid[ny][nx] !== '' && grid[ny][nx] !== palabra[i]) {
          canPlace = false
          break
        }
      }
      
      if (canPlace) {
        for (let i = 0; i < palabra.length; i++) {
          const nx = startX + d[0] * i
          const ny = startY + d[1] * i
          grid[ny][nx] = palabra[i]
        }
        placed = true
      }
      attempts++
    }
  }

  const letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === '') {
        grid[y][x] = letras.charAt(Math.floor(Math.random() * letras.length))
      }
    }
  }
  return grid
}

function initSopa() {
  sopaLetras.grid = generarSopa()
  sopaLetras.celdasEncontradas = []
  sopaLetras.palabrasEncontradas = []
  sopaLetras.primerClick = null
  sopaLetras.completado = false
}

function clickCeldaSopa(x: number, y: number) {
  if (sopaLetras.completado) return
  
  if (!sopaLetras.primerClick) {
    sopaLetras.primerClick = {x, y}
  } else {
    const p1 = sopaLetras.primerClick
    const p2 = {x, y}
    
    if (p1.x === p2.x && p1.y === p2.y) {
      sopaLetras.primerClick = null
      return
    }
    
    const dx = Math.sign(p2.x - p1.x)
    const dy = Math.sign(p2.y - p1.y)
    const lenX = Math.abs(p2.x - p1.x)
    const lenY = Math.abs(p2.y - p1.y)
    
    if (lenX !== 0 && lenY !== 0 && lenX !== lenY) {
      sopaLetras.primerClick = null
      return
    }
    
    const len = Math.max(lenX, lenY) + 1
    let palabraSeleccionada = ""
    const celdasSeleccionadas = []
    
    for (let i = 0; i < len; i++) {
      const cx = p1.x + dx * i
      const cy = p1.y + dy * i
      palabraSeleccionada += sopaLetras.grid[cy][cx]
      celdasSeleccionadas.push({x: cx, y: cy})
    }
    
    const palabraInvertida = palabraSeleccionada.split('').reverse().join('')
    let palabraMatch = null
    
    if (PALABRAS_SOPA.includes(palabraSeleccionada) && !sopaLetras.palabrasEncontradas.includes(palabraSeleccionada)) {
      palabraMatch = palabraSeleccionada
    } else if (PALABRAS_SOPA.includes(palabraInvertida) && !sopaLetras.palabrasEncontradas.includes(palabraInvertida)) {
      palabraMatch = palabraInvertida
    }
    
    if (palabraMatch) {
      sopaLetras.palabrasEncontradas.push(palabraMatch)
      sopaLetras.celdasEncontradas.push(...celdasSeleccionadas)
      if (sopaLetras.palabrasEncontradas.length === PALABRAS_SOPA.length) {
        sopaLetras.completado = true
      }
    }
    sopaLetras.primerClick = null
  }
}

function esCeldaEncontrada(x: number, y: number) {
  return sopaLetras.celdasEncontradas.some(c => c.x === x && c.y === y)
}

function esCeldaSeleccionada(x: number, y: number) {
  return sopaLetras.primerClick && sopaLetras.primerClick.x === x && sopaLetras.primerClick.y === y
}
// ══════════════════════════════════════
// ACTIVIDAD 6 — Crucigrama
// ══════════════════════════════════════
const crucigrama = reactive({
  grid: Array(12).fill(0).map(() => Array(12).fill('')),
  userGrid: Array(12).fill(0).map(() => Array(12).fill('')),
  validationGrid: Array(12).fill(0).map(() => Array(12).fill(null as boolean | null)),
  hints: [] as { id: number, dir: string, row: number, col: number, text: string }[],
  completado: false,
})

function inicializarCrucigrama() {
  const g = Array(12).fill(0).map(() => Array(12).fill(''))
  
  const poner = (word: string, r: number, c: number, dir: 'H' | 'V') => {
    word.split('').forEach((l, i) => {
      if (dir === 'H') g[r][c + i] = l
      else g[r + i][c] = l
    })
  }

  // Layout 100% verificado — Sin conflictos
  poner("FILOSOFIA", 2, 2, 'H')
  poner("SOCRATES",  1, 5, 'V')
  poner("AGORA",     5, 5, 'H')
  poner("LOGOS",     4, 7, 'V')
  poner("ETHOS",     8, 1, 'H')
  poner("IDEA",      6, 1, 'V')
  poner("RAZON",     9, 0, 'H')
  poner("PLATON",    3, 9, 'V')
  poner("MITO",      1, 3, 'V')
  poner("SER",       1, 5, 'H')

  crucigrama.grid = g
  crucigrama.userGrid = Array(12).fill(0).map(() => Array(12).fill(''))
  crucigrama.validationGrid = Array(12).fill(0).map(() => Array(12).fill(null))
  
  crucigrama.hints = [
    { id: 1, dir: 'H', row: 2, col: 2, text: '¿Cómo se le llama al amor por la sabiduría?' },
    { id: 2, dir: 'V', row: 1, col: 5, text: '¿Quién fue el gran maestro que no dejó escritos?' },
    { id: 3, dir: 'H', row: 5, col: 5, text: '¿Cómo se llamaba la plaza pública de Atenas donde se debatía?' },
    { id: 4, dir: 'V', row: 4, col: 7, text: '¿Qué término griego significa palabra, razón o discurso?' },
    { id: 5, dir: 'H', row: 8, col: 1, text: '¿Qué palabra se refiere a la costumbre o carácter moral?' },
    { id: 6, dir: 'V', row: 6, col: 1, text: '¿Cuál es el nombre de la representación mental de algo?' },
    { id: 7, dir: 'H', row: 9, col: 0, text: '¿Cuál es la capacidad humana de pensar críticamente?' },
    { id: 8, dir: 'V', row: 3, col: 9, text: '¿Quién fue el discípulo de Sócrates y autor de "La República"?' },
    { id: 9, dir: 'V', row: 1, col: 3, text: '¿Cómo se llama el relato simbólico tradicional?' },
    { id: 10, dir: 'H', row: 1, col: 5, text: '¿Cuál es el concepto fundamental de la metafísica de Parménides?' },
  ]
}

onMounted(() => {
  inicializarCrucigrama()
})

function obtenerNumeroPista(x: number, y: number) {
  const hints = crucigrama.hints.filter(h => h.row === y && h.col === x)
  if (hints.length > 0) {
    return hints.map(h => h.id).join('/')
  }
  return ''
}

function alEscribir(x: number, y: number) {
  crucigrama.validationGrid[y][x] = null // Reset validation on type
}

function obtenerClaseEstado(x: number, y: number) {
  const status = crucigrama.validationGrid[y][x]
  if (status === true) return 'celda-correcta'
  if (status === false) return 'celda-incorrecta'
  return ''
}

function verificarCrucigrama() {
  let todoCorrecto = true
  for (let y = 0; y < crucigrama.grid.length; y++) {
    for (let x = 0; x < crucigrama.grid[y].length; x++) {
      const cell = crucigrama.grid[y][x]
      if (cell !== '') {
        const userVal = crucigrama.userGrid[y][x].toUpperCase()
        if (userVal === cell) {
          crucigrama.validationGrid[y][x] = true
        } else {
          crucigrama.validationGrid[y][x] = false
          todoCorrecto = false
        }
      }
    }
  }
  if (todoCorrecto) {
    crucigrama.completado = true
  }
}

function reiniciarCrucigrama() {
  crucigrama.userGrid = Array(crucigrama.grid.length).fill(0).map(() => Array(crucigrama.grid[0].length).fill(''))
  crucigrama.validationGrid = Array(crucigrama.grid.length).fill(0).map(() => Array(crucigrama.grid[0].length).fill(null))
  crucigrama.completado = false
}
</script>

<style scoped>
/* ===== HEADER & TABS ===== */
.actividades-titulo {
  font-family: 'Cinzel', serif;
  font-size: 1.6rem;
  color: #C9A84C;
  line-height: 1.1;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.actividades-subtitulo {
  color: var(--text-muted);
  font-size: 0.88rem;
  font-family: 'EB Garamond', serif;
  font-style: italic;
}
.actividad-card {
  cursor: pointer;
  transition: all .2s;
  min-width: 100px;
  overflow: hidden;
}

/* ===== CRUCIGRAMA ===== */
.crucigrama-grid { display: flex; flex-direction: column; gap: 4px; background: rgba(0,0,0,0.05); padding: 8px; border-radius: 8px; }
.crucigrama-container { background: rgba(27,58,107,0.03); border: 2px solid rgba(201,168,76,0.3); box-shadow: inset 0 0 15px rgba(0,0,0,0.05); overflow-x: auto; -webkit-overflow-scrolling: touch; }
.celda-activa { position: relative; }
.pista-numero { position: absolute; top: 2px; left: 4px; font-size: 0.6rem; font-family: 'Cinzel', serif; font-weight: 700; color: #1B3A6B; z-index: 1; pointer-events: none; }
.crucigrama-celda-wrapper { width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; margin: 1px; flex-shrink: 0; }
.crucigrama-input { width: 36px; height: 36px; text-align: center; font-family: 'Cinzel', serif; font-size: 1.1rem; border: 1px solid #C9A84C; background: white; border-radius: 4px; text-transform: uppercase; transition: all 0.2s; }
.crucigrama-input:focus { outline: none; border-color: #1B3A6B; background: #F8F4EC; transform: scale(1.05); z-index: 2; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
.celda-correcta { background: var(--bg-success) !important; border-color: var(--border-success) !important; color: var(--text-success) !important; font-weight: 700; }
.celda-incorrecta { background: var(--bg-error) !important; border-color: var(--border-error) !important; color: var(--border-error) !important; animation: shake 0.3s; }

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  75% { transform: translateX(2px); }
}

.pista-item { font-family: 'EB Garamond', serif; font-size: 0.95rem; margin-bottom: 8px; line-height: 1.3; color: var(--text-dark); display: flex; align-items: flex-start; gap: 8px; }
.pista-badge { background: #1B3A6B; color: #E8C97A; font-family: 'Cinzel', serif; font-size: 0.65rem; font-weight: 700; width: 18px; height: 18px; border-radius: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; }

.crucigrama-vacio { width: 36px; height: 36px; flex-shrink: 0; }

/* ===== Emparejar ===== */
.border-selected-match { border-color:var(--text-primary) !important; background: #E4EBF5 !important; }
.border-success-match  { border-color: var(--border-success) !important; background: var(--bg-success) !important; }
.border-error-match    { border-color: var(--border-error) !important; background: var(--bg-error) !important; }

/* ===== Formas de Platón — imágenes ===== */
.imagen-normal     { background:var(--bg-light); border-color: rgba(201,168,76,0.25) !important; }
.imagen-seleccionada { background: #E4EBF5 !important; border-color:var(--text-primary) !important; box-shadow: 0 0 0 3px rgba(27,58,107,0.15); }
.imagen-correcta   { background: #D7EDD5 !important; border-color: #5C6E2E !important; opacity: 0.85; }

/* ===== Formas de Platón — conceptos ===== */
.concepto-normal     { background: var(--bg-warm); border-color: rgba(201,168,76,0.2) !important; }
.concepto-seleccionado { background: #E4EBF5 !important; border-color:var(--text-primary) !important; box-shadow: 0 0 0 3px rgba(27,58,107,0.15); }
.concepto-correcto   { background: #D7EDD5 !important; border-color: #5C6E2E !important; opacity: 0.85; }

/* ===== Sopa de Letras ===== */
.sopa-grid {
  display: inline-block;
  background: var(--bg-card);
  border: 2px solid rgba(201,168,76,0.3);
  border-radius: 8px;
  padding: 6px;
  user-select: none;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
}
.sopa-fila {
  display: flex;
}
.sopa-celda {
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Cinzel', monospace;
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.15s;
  border-radius: 4px;
  margin: 1px;
  flex-shrink: 0;
}
.sopa-celda:hover {
  background: rgba(201,168,76,0.15);
}
.celda-seleccionada {
  background: #C9A84C !important;
  color: #1B3A6B !important;
  box-shadow: 0 0 8px rgba(201,168,76,0.6);
}
.celda-encontrada {
  background: rgba(139,195,74,0.2) !important;
  color: #5C6E2E !important;
  font-weight: 800;
}
.dark-mode .celda-encontrada {
  color: #AED581 !important;
}

/* ═══════════════════════════════════════
   RESPONSIVE — MOBILE FIRST (< 600px)
   ═══════════════════════════════════════ */
@media (max-width: 600px) {
  /* Header más compacto */
  .actividades-titulo {
    font-size: 1.2rem;
  }
  .actividades-subtitulo {
    font-size: 0.78rem;
  }
  /* Tarjetas de actividad más compactas */
  .actividad-card {
    min-width: 0;
  }

  /* Sopa de letras: celdas más pequeñas para caber en pantalla */
  .sopa-celda {
    width: 19px;
    height: 19px;
    font-size: 0.65rem;
    margin: 0.5px;
    border-radius: 2px;
  }
  .sopa-grid {
    padding: 3px;
  }

  /* Crucigrama: celdas más pequeñas */
  .crucigrama-celda-wrapper {
    width: 28px;
    height: 28px;
  }
  .crucigrama-input {
    width: 26px;
    height: 26px;
    font-size: 0.85rem;
  }
  .crucigrama-vacio {
    width: 26px;
    height: 26px;
  }
  .pista-numero {
    font-size: 0.5rem;
    top: 1px;
    left: 2px;
  }
  .pista-item {
    font-size: 0.85rem;
  }
  .pista-badge {
    width: 16px;
    height: 16px;
    font-size: 0.55rem;
  }
}

/* Pantallas muy pequeñas (< 380px) */
@media (max-width: 380px) {
  .sopa-celda {
    width: 16px;
    height: 16px;
    font-size: 0.58rem;
    margin: 0;
  }
  .crucigrama-celda-wrapper {
    width: 24px;
    height: 24px;
  }
  .crucigrama-input {
    width: 22px;
    height: 22px;
    font-size: 0.75rem;
  }
  .crucigrama-vacio {
    width: 22px;
    height: 22px;
  }
}
</style>

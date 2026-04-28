<template>
  <div>
    <!-- Encabezado -->
    <div class="d-flex align-center justify-space-between mb-5">
      <div class="d-flex align-center">
        <v-icon color="secondary" size="38" class="mr-3">mdi-pencil-box-multiple</v-icon>
        <div>
          <h1 style="font-family:'Cinzel',serif;font-size:1.8rem;color:#C9A84C;line-height:1.1;letter-spacing:0.06em;text-transform:uppercase">
            Actividades
          </h1>
          <div style="color:#8C7E6A;font-size:0.92rem;font-family:'EB Garamond',serif;font-style:italic">
            Ejercita tu razón como los grandes filósofos ✦
          </div>
        </div>
      </div>
      <v-chip color="secondary" size="small" prepend-icon="mdi-star-four-points"
        style="font-family:'Cinzel',serif;letter-spacing:0.06em">
        {{ cantidadCompletadas }}/5
      </v-chip>
    </div>

    <!-- Selector de actividades (5 tarjetas) -->
    <v-row class="mb-5" justify="center">
      <v-col v-for="(act, idx) in actividades" :key="idx" cols="6" sm="4" md="auto">
        <v-card
          rounded="lg"
          elevation="2"
          style="cursor:pointer;transition:all .2s;border:2px solid transparent;min-width:110px"
          :style="actividadActual === idx
            ? 'border-color:#1B3A6B;background:#EEE8D8;box-shadow:0 4px 16px rgba(27,58,107,0.18)'
            : 'border-color:rgba(201,168,76,0.25)'"
          @click="actividadActual = idx"
        >
          <div v-if="actividadActual === idx" style="height:3px;background:linear-gradient(90deg,#1B3A6B,#C9A84C)"></div>
          <v-card-text class="pa-3 text-center">
            <div style="font-size:1.8rem;margin-bottom:4px">{{ act.emoji }}</div>
            <div style="font-family:'Cinzel',serif;font-size:0.78rem;font-weight:700;color:#1B3A6B;letter-spacing:0.04em;line-height:1.3">
              {{ act.nombre }}
            </div>
            <v-chip
              :color="tienda.completedActivities.includes(idx) ? 'success' : 'grey-lighten-3'"
              size="x-small"
              class="mt-2"
              label
              style="font-family:'Cinzel',serif;font-size:0.65rem"
            >
              {{ tienda.completedActivities.includes(idx) ? '✓ Lista' : 'Pendiente' }}
            </v-chip>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Ventana de actividades -->
    <v-window v-model="actividadActual">

      <!-- ═══════════════════════════════════════════════
           ACTIVIDAD 1: Verdadero / Falso
           Vinculada a los 5 videos
      ════════════════════════════════════════════════ -->
      <v-window-item :value="0">
        <v-card rounded="lg" elevation="2" style="border-top:3px solid #C9A84C;border:1px solid rgba(201,168,76,0.3)">
          <v-card-title class="pa-5 pb-2 d-flex align-center">
            <v-icon color="primary" class="mr-2">mdi-brain</v-icon>
            <span style="font-family:'Cinzel',serif;color:#1B3A6B;letter-spacing:0.06em">¿Verdadero o Falso?</span>
          </v-card-title>
          <v-card-subtitle class="px-5 pb-3"
            style="font-family:'EB Garamond',serif;font-style:italic;color:#8C7E6A">
            Basado en los 5 videos del contenido · Responde con atención 🦉
          </v-card-subtitle>
          <v-card-text class="pa-5">
            <div v-for="(pregunta, i) in preguntasVF" :key="i" class="mb-4">
              <v-card variant="outlined" rounded="lg" class="pa-4"
                :style="respuestasVF[i] === null
                  ? 'border-color:rgba(201,168,76,0.4)'
                  : respuestasVF[i] === pregunta.correcto
                    ? 'border-color:#5C6E2E;background:#D7EDD5'
                    : 'border-color:#8B3A2A;background:#F5D9D4'"
              >
                <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:10px">
                  <span style="font-size:1.2rem;margin-top:2px">{{ pregunta.emoji }}</span>
                  <div style="font-family:'EB Garamond',serif;font-size:1rem;font-weight:600;color:#2C2416;line-height:1.5">
                    {{ i + 1 }}. {{ pregunta.enunciado }}
                  </div>
                </div>
                <!-- Referencia al video -->
                <v-chip size="x-small" color="primary" variant="tonal" class="mb-3"
                  style="font-family:'Cinzel',serif;font-size:0.65rem;letter-spacing:0.05em">
                  📹 {{ pregunta.video }}
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
                <div v-else style="font-family:'EB Garamond',serif;font-size:0.95rem;color:#2C2416;font-style:italic">
                  <strong style="font-style:normal">
                    {{ respuestasVF[i] === pregunta.correcto ? '¡Correcto! 🏛️' : 'Incorrecto 💡' }}
                  </strong>
                  — {{ pregunta.explicacion }}
                </div>
              </v-card>
            </div>
            <div v-if="vfCompletado" class="text-center mt-4">
              <div style="font-family:'Cinzel',serif;font-size:0.85rem;color:#1B3A6B;margin-bottom:10px;letter-spacing:0.05em">
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

      <!-- ═══════════════════════════════════════════════
           ACTIVIDAD 2: Emparejar filósofo + idea
           Vinculada a videos: Sócrates, Platón, Ética
      ════════════════════════════════════════════════ -->
      <v-window-item :value="1">
        <v-card rounded="lg" elevation="2" style="border-top:3px solid #C9A84C;border:1px solid rgba(201,168,76,0.3)">
          <v-card-title class="pa-5 pb-2 d-flex align-center">
            <v-icon color="primary" class="mr-2">mdi-puzzle</v-icon>
            <span style="font-family:'Cinzel',serif;color:#1B3A6B;letter-spacing:0.06em">Emparejar filósofo con su idea</span>
          </v-card-title>
          <v-card-subtitle class="px-5 pb-3"
            style="font-family:'EB Garamond',serif;font-style:italic;color:#8C7E6A">
            Toca un filósofo y luego su idea · Videos: Sócrates, Platón y más 🧩
          </v-card-subtitle>
          <v-card-text class="pa-5">
            <v-row>
              <v-col cols="12" md="6">
                <div class="text-center mb-3">
                  <v-chip color="primary" size="small"
                    style="font-family:'Cinzel',serif;letter-spacing:0.06em">👤 Filósofo / Concepto</v-chip>
                </div>
                <div
                  v-for="fil in juegoEmparejamiento.filosofos"
                  :key="fil.id"
                  class="pa-3 rounded-lg mb-3 text-center"
                  :class="claseFilosofo(fil.id)"
                  style="background:#EEE8D8;border:2px solid transparent;transition:all .2s;cursor:pointer"
                  @click="seleccionarFilosofo(fil.id)"
                >
                  <div style="font-size:1.6rem">{{ fil.emoji }}</div>
                  <div style="font-family:'Cinzel',serif;font-weight:700;font-size:0.88rem;color:#1B3A6B;letter-spacing:0.04em">
                    {{ fil.nombre }}
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="text-center mb-3">
                  <v-chip color="secondary" size="small"
                    style="font-family:'Cinzel',serif;letter-spacing:0.06em">💡 Idea o definición</v-chip>
                </div>
                <div
                  v-for="idea in juegoEmparejamiento.ideas"
                  :key="idea.id"
                  class="pa-3 rounded-lg mb-3"
                  :class="claseIdea(idea.id)"
                  style="background:#FDF6E3;border:2px solid transparent;transition:all .2s;cursor:pointer;font-family:'EB Garamond',serif;font-size:0.95rem;color:#2C2416;font-style:italic"
                  @click="seleccionarIdea(idea.id)"
                >
                  "{{ idea.texto }}"
                </div>
              </v-col>
            </v-row>
            <div class="mt-3 d-flex gap-3 align-center">
              <div style="font-family:'Cinzel',serif;font-size:0.8rem;color:#8C7E6A;letter-spacing:0.05em">
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
                🏛️ ¡Excelente! Relacionaste todas las ideas correctamente.
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

      <!-- ═══════════════════════════════════════════════
           ACTIVIDAD 3: Ordenar pasos del filósofo
           Vinculada a video: ¿Qué es la Filosofía?
      ════════════════════════════════════════════════ -->
      <v-window-item :value="2">
        <v-card rounded="lg" elevation="2" style="border-top:3px solid #C9A84C;border:1px solid rgba(201,168,76,0.3)">
          <v-card-title class="pa-5 pb-2 d-flex align-center">
            <v-icon color="accent" class="mr-2">mdi-sort</v-icon>
            <span style="font-family:'Cinzel',serif;color:#1B3A6B;letter-spacing:0.06em">Ordena el camino del filósofo</span>
          </v-card-title>
          <v-card-subtitle class="px-5 pb-3"
            style="font-family:'EB Garamond',serif;font-style:italic;color:#8C7E6A">
            Toca en el orden correcto (1 → 5) · Video: ¿Qué es la Filosofía? 🔢
          </v-card-subtitle>
          <v-card-text class="pa-5">
            <v-row>
              <v-col v-for="paso in juegoOrden.pasosMezclados" :key="paso.id" cols="6" sm="4">
                <div
                  class="pa-4 rounded-lg text-center mb-2"
                  :class="claseOrden(paso.id)"
                  style="background:#EEE8D8;border:2px solid transparent;transition:all .2s;cursor:pointer"
                  @click="tocarPasoOrden(paso.id)"
                >
                  <div style="font-size:2rem;margin-bottom:6px">{{ paso.emoji }}</div>
                  <div style="font-family:'Cinzel',serif;font-size:0.82rem;font-weight:700;color:#1B3A6B;letter-spacing:0.04em">
                    {{ paso.etiqueta }}
                  </div>
                </div>
              </v-col>
            </v-row>

            <div v-if="juegoOrden.seleccionados.length" class="mt-4">
              <div style="font-family:'Cinzel',serif;font-weight:600;font-size:0.82rem;color:#1B3A6B;margin-bottom:8px;letter-spacing:0.06em">
                TU ORDEN:
              </div>
              <div class="d-flex flex-wrap gap-2">
                <v-chip
                  v-for="(id, i) in juegoOrden.seleccionados"
                  :key="id"
                  :color="juegoOrden.completado
                    ? (juegoOrden.ordenCorrecto[i] === id ? 'success' : 'error')
                    : 'primary'"
                  size="small"
                  style="font-family:'Cinzel',serif;font-size:0.72rem"
                >
                  {{ i + 1 }}. {{ juegoOrden.pasosMezclados.find(s => s.id === id)?.etiqueta }}
                </v-chip>
              </div>
            </div>

            <div v-if="juegoOrden.seleccionados.length === 5 && !juegoOrden.completado" class="mt-4">
              <v-btn color="primary" rounded="lg"
                style="font-family:'Cinzel',serif;letter-spacing:0.08em;text-transform:uppercase"
                @click="verificarOrden">
                <v-icon class="mr-1">mdi-check</v-icon> Verificar
              </v-btn>
            </div>
            <div v-if="juegoOrden.completado" class="mt-4">
              <v-alert :type="juegoOrden.esCorrecto ? 'success' : 'warning'" rounded="lg" class="mb-3"
                style="font-family:'EB Garamond',serif;font-size:0.95rem">
                {{ juegoOrden.esCorrecto
                  ? '🏛️ ¡Orden correcto! Así razona un verdadero filósofo.'
                  : '💡 El orden correcto: Observar → Preguntar → Razonar → Argumentar → Concluir' }}
              </v-alert>
              <div class="d-flex gap-3">
                <v-btn v-if="!juegoOrden.esCorrecto" color="grey" variant="outlined" rounded="lg"
                  style="font-family:'Cinzel',serif;font-size:0.78rem"
                  @click="reiniciarOrden">
                  <v-icon class="mr-1">mdi-refresh</v-icon> Reintentar
                </v-btn>
                <v-btn color="primary" rounded="lg"
                  style="font-family:'Cinzel',serif;letter-spacing:0.08em;text-transform:uppercase"
                  @click="tienda.completeActivity(2)">
                  <v-icon class="mr-1">mdi-check</v-icon> Completar actividad
                </v-btn>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-window-item>

      <!-- ═══════════════════════════════════════════════
           ACTIVIDAD 4: Preguntas múltiple opción
           Vinculada a todos los videos
      ════════════════════════════════════════════════ -->
      <v-window-item :value="3">
        <v-card rounded="lg" elevation="2" style="border-top:3px solid #C9A84C;border:1px solid rgba(201,168,76,0.3)">
          <v-card-title class="pa-5 pb-2 d-flex align-center">
            <v-icon color="success" class="mr-2">mdi-help-circle</v-icon>
            <span style="font-family:'Cinzel',serif;color:#1B3A6B;letter-spacing:0.06em">Preguntas de los Videos</span>
          </v-card-title>
          <v-card-subtitle class="px-5 pb-3"
            style="font-family:'EB Garamond',serif;font-style:italic;color:#8C7E6A">
            Selecciona la opción correcta · Cubre los 5 videos 📜
          </v-card-subtitle>
          <v-card-text class="pa-5">
            <div v-for="(preg, i) in preguntasFinales" :key="i" class="mb-4">
              <v-card variant="outlined" rounded="lg" class="pa-4"
                style="border-color:rgba(201,168,76,0.4)">
                <div class="d-flex align-start gap-2 mb-3">
                  <span style="font-size:1.2rem">{{ preg.emoji }}</span>
                  <div>
                    <div style="font-family:'EB Garamond',serif;font-size:1rem;font-weight:600;color:#2C2416;line-height:1.5">
                      {{ preg.pregunta }}
                    </div>
                    <v-chip size="x-small" color="primary" variant="tonal" class="mt-1"
                      style="font-family:'Cinzel',serif;font-size:0.63rem;letter-spacing:0.05em">
                      📹 {{ preg.video }}
                    </v-chip>
                  </div>
                </div>
                <v-row dense>
                  <v-col v-for="(op, oi) in preg.opciones" :key="oi" cols="12" sm="6">
                    <v-btn
                      block
                      rounded="lg"
                      variant="tonal"
                      :color="respuestasFinales[i] === oi
                        ? (oi === preg.correcto ? 'success' : 'error')
                        : 'blue-lighten-4'"
                      style="font-family:'EB Garamond',serif;font-size:0.92rem;letter-spacing:0.02em;text-transform:none;font-weight:700;color:#000000"
                      class="mb-1"
                      @click="responderFinal(i, oi)"
                    >
                      {{ op }}
                    </v-btn>
                  </v-col>
                </v-row>
                <div v-if="respuestasFinales[i] !== null" class="mt-2"
                  style="font-family:'EB Garamond',serif;font-size:0.9rem;font-style:italic;color:#2C2416">
                  {{ respuestasFinales[i] === preg.correcto
                    ? '✅ ¡Correcto!'
                    : `❌ La respuesta correcta es: ${preg.opciones[preg.correcto]}` }}
                </div>
              </v-card>
            </div>
            <div v-if="finalesCompletado" class="text-center mt-4">
              <div style="font-family:'Cinzel',serif;font-size:0.85rem;color:#1B3A6B;margin-bottom:10px;letter-spacing:0.05em">
                Acertaste {{ aciertosFinales }} de {{ preguntasFinales.length }} preguntas
              </div>
              <v-btn color="primary" rounded="lg"
                style="font-family:'Cinzel',serif;letter-spacing:0.08em;text-transform:uppercase"
                @click="tienda.completeActivity(3)">
                <v-icon class="mr-1">mdi-check</v-icon> Completar actividad
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-window-item>

      <!-- ═══════════════════════════════════════════════
           ACTIVIDAD 5: El Oráculo — Identidad y Ética
           NUEVA · Vinculada a videos 4 y 5
      ════════════════════════════════════════════════ -->
      <v-window-item :value="4">
        <v-card rounded="lg" elevation="2" style="border-top:3px solid #C9A84C;border:1px solid rgba(201,168,76,0.3)">
          <!-- Cabecera decorativa del Oráculo -->
          <div style="background:linear-gradient(135deg,#1B3A6B,#2A5298);padding:20px 20px 14px">
            <div class="d-flex align-center gap-2 mb-1">
              <v-icon color="secondary" class="mr-1">mdi-eye-circle</v-icon>
              <span style="font-family:'Cinzel Decorative',serif;font-size:1.1rem;color:#E8C97A;letter-spacing:0.08em">
                El Oráculo de Delfos
              </span>
            </div>
            <div style="font-family:'EB Garamond',serif;font-style:italic;color:rgba(232,201,122,0.75);font-size:0.92rem">
              "Γνῶθι σεαυτόν" — Conócete a ti mismo · Videos: ¿Quiénes Somos? y ¿Qué es la Ética?
            </div>
          </div>

          <v-card-text class="pa-5">
            <div v-for="(preg, i) in preguntasOraculo" :key="i" class="mb-5">
              <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:10px">
                <div style="
                  min-width:32px;height:32px;border-radius:50%;
                  background:linear-gradient(135deg,#1B3A6B,#4A7FA5);
                  display:flex;align-items:center;justify-content:center;
                  font-family:'Cinzel',serif;font-size:0.8rem;color:#E8C97A;font-weight:700
                ">{{ i + 1 }}</div>
                <div style="flex:1">
                  <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                    <span style="font-size:1.3rem">{{ preg.emoji }}</span>
                    <span style="font-family:'EB Garamond',serif;font-size:1.05rem;font-weight:600;color:#2C2416;line-height:1.4">
                      {{ preg.pregunta }}
                    </span>
                  </div>
                  <v-chip size="x-small" color="primary" variant="tonal" class="mb-3"
                    style="font-family:'Cinzel',serif;font-size:0.63rem;letter-spacing:0.05em">
                    📹 {{ preg.video }}
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
                      💡 El Oráculo dice: {{ preg.explicacion }}
                    </span>
                  </div>
                </div>
              </div>
              <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent);margin-top:8px"></div>
            </div>

            <div v-if="oraculoCompletado" class="text-center mt-4">
              <div style="font-family:'Cinzel',serif;font-size:0.85rem;color:#1B3A6B;margin-bottom:10px;letter-spacing:0.05em">
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

    </v-window>

    <!-- ✦ Completado todo ✦ -->
    <v-card v-if="todasCompletadas" class="mt-6" rounded="lg" elevation="3"
      style="background:linear-gradient(135deg,#1B3A6B,#2A5298);border:2px solid rgba(201,168,76,0.5)">
      <div style="height:5px;background:repeating-linear-gradient(90deg,#C9A84C 0px,#C9A84C 10px,#1B3A6B 10px,#1B3A6B 20px)"></div>
      <v-card-text class="pa-7 text-center">
        <div style="font-size:3.5rem;margin-bottom:8px">🏆</div>
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
import NavegacionPaginas from '~/componentes/NavegacionPaginas.vue'

const tienda = useOvaStore()
onMounted(() => tienda.markPageVisited('actividades'))

const actividadActual = ref(0)
const actividades = [
  { emoji: '⚖️', nombre: 'Verdadero / Falso' },
  { emoji: '🧩', nombre: 'Emparejar' },
  { emoji: '🔢', nombre: 'Ordenar' },
  { emoji: '📜', nombre: 'Preguntas' },
  { emoji: '🔮', nombre: 'El Oráculo' },
]
const cantidadCompletadas = computed(() => tienda.completedActivities.length)
const todasCompletadas    = computed(() => tienda.completedActivities.length >= 5)

// ════════════════════════════════════════
// ACTIVIDAD 1 — Verdadero / Falso (7 preguntas, todos los videos)
// ════════════════════════════════════════
const preguntasVF = [
  {
    emoji: '🤔',
    enunciado: 'La filosofía busca respuestas haciendo preguntas.',
    correcto: true,
    explicacion: 'Correcto. Preguntar es el corazón del pensamiento filosófico.',
    video: 'Video 1 — ¿Qué es la Filosofía?',
  },
  {
    emoji: '📝',
    enunciado: 'Sócrates escribió muchos libros y tratados filosóficos.',
    correcto: false,
    explicacion: 'Falso. Sócrates no dejó nada escrito; fue Platón quien documentó sus ideas.',
    video: 'Video 2 — Sócrates',
  },
  {
    emoji: '🏛️',
    enunciado: 'Platón fue discípulo de Sócrates.',
    correcto: true,
    explicacion: 'Correcto. Platón aprendió directamente de Sócrates en Atenas.',
    video: 'Video 3 — Platón',
  },
  {
    emoji: '🎓',
    enunciado: 'La Academia fue la primera universidad, y la fundó Aristóteles.',
    correcto: false,
    explicacion: 'Falso. La Academia la fundó Platón, no Aristóteles.',
    video: 'Video 3 — Platón',
  },
  {
    emoji: '👤',
    enunciado: '"¿Quiénes somos?" es una pregunta filosófica sobre la identidad personal.',
    correcto: true,
    explicacion: 'Correcto. La identidad es uno de los grandes temas de la filosofía.',
    video: 'Video 4 — ¿Quiénes Somos?',
  },
  {
    emoji: '⚖️',
    enunciado: 'La ética estudia lo correcto e incorrecto en nuestras acciones.',
    correcto: true,
    explicacion: 'Correcto. La ética nos ayuda a decidir cómo actuar bien.',
    video: 'Video 5 — ¿Qué es la Ética?',
  },
  {
    emoji: '🌿',
    enunciado: 'La palabra "filosofía" significa "amor al poder".',
    correcto: false,
    explicacion: 'Falso. Filosofía viene del griego y significa "amor a la sabiduría" (philos + sophia).',
    video: 'Video 1 — ¿Qué es la Filosofía?',
  },
]
const respuestasVF = ref<(boolean | null)[]>(Array(preguntasVF.length).fill(null))
const vfCompletado = computed(() => respuestasVF.value.every(r => r !== null))
const aciertosVF   = computed(() => respuestasVF.value.filter((r, i) => r === preguntasVF[i].correcto).length)
function responderVF(i: number, valor: boolean) { respuestasVF.value[i] = valor }

// ════════════════════════════════════════
// ACTIVIDAD 2 — Emparejar (5 pares: Sócrates, Platón, Aristóteles, Ética, Filosofía)
// ════════════════════════════════════════
const juegoEmparejamiento = reactive({
  filosofos: [
    { id: 'soc',   nombre: 'Sócrates',   emoji: '🏛️' },
    { id: 'pla',   nombre: 'Platón',     emoji: '📜' },
    { id: 'ari',   nombre: 'Aristóteles',emoji: '📚' },
    { id: 'etica', nombre: 'Ética',      emoji: '⚖️' },
    { id: 'filo',  nombre: 'Filosofía',  emoji: '🌿' },
  ],
  ideas: [
    { id: 'soc',   texto: 'Solo sé que no sé nada.' },
    { id: 'pla',   texto: 'El conocimiento es reminiscencia del alma.' },
    { id: 'ari',   texto: 'La felicidad es la meta de la vida.' },
    { id: 'etica', texto: 'Ciencia de lo correcto e incorrecto.' },
    { id: 'filo',  texto: 'Amor a la sabiduría.' },
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
  juegoEmparejamiento.emparejados = {}
  juegoEmparejamiento.paresCorrectos = 0
  juegoEmparejamiento.seleccionadoFilosofo = null
  juegoEmparejamiento.seleccionadaIdea = null
}

// ════════════════════════════════════════
// ACTIVIDAD 3 — Ordenar pasos (5 pasos)
// ════════════════════════════════════════
const pasosBase = [
  { id: 1, emoji: '👁️', etiqueta: 'Observar'   },
  { id: 2, emoji: '❓', etiqueta: 'Preguntar'  },
  { id: 3, emoji: '🧠', etiqueta: 'Razonar'    },
  { id: 4, emoji: '💬', etiqueta: 'Argumentar' },
  { id: 5, emoji: '✅', etiqueta: 'Concluir'   },
]
const juegoOrden = reactive({
  pasosMezclados: [...pasosBase].sort(() => Math.random() - 0.5),
  seleccionados:  [] as number[],
  ordenCorrecto:  [1, 2, 3, 4, 5],
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
  juegoOrden.seleccionados = []
  juegoOrden.completado    = false
  juegoOrden.esCorrecto    = false
  juegoOrden.pasosMezclados = [...pasosBase].sort(() => Math.random() - 0.5)
}

// ════════════════════════════════════════
// ACTIVIDAD 4 — Preguntas múltiple opción (6 preguntas, todos los videos)
// ════════════════════════════════════════
const preguntasFinales = [
  {
    emoji: '🌿', video: 'Video 1 — ¿Qué es la Filosofía?',
    pregunta: '¿Qué significa la palabra "filosofía"?',
    opciones: ['Amor a la sabiduría', 'Amor al poder', 'Ciencia de los astros', 'Arte de la guerra'],
    correcto: 0,
  },
  {
    emoji: '🏛️', video: 'Video 2 — Sócrates',
    pregunta: '¿Cómo enseñaba Sócrates principalmente?',
    opciones: ['Escribiendo tratados', 'Haciendo preguntas en la calle', 'Pintando murales', 'Construyendo templos'],
    correcto: 1,
  },
  {
    emoji: '📜', video: 'Video 3 — Platón',
    pregunta: '¿Qué institución fundó Platón?',
    opciones: ['El Liceo', 'El Coliseo', 'La Academia', 'El Partenón'],
    correcto: 2,
  },
  {
    emoji: '👤', video: 'Video 4 — ¿Quiénes Somos?',
    pregunta: '¿Qué pregunta filosófica aborda la identidad personal?',
    opciones: ['¿Cuánto pesa el alma?', '¿Quién soy yo?', '¿Cuántas estrellas hay?', '¿Qué es el tiempo?'],
    correcto: 1,
  },
  {
    emoji: '⚖️', video: 'Video 5 — ¿Qué es la Ética?',
    pregunta: 'La ética estudia…',
    opciones: ['El movimiento de los planetas', 'La estructura del átomo', 'Lo correcto e incorrecto', 'Los animales marinos'],
    correcto: 2,
  },
  {
    emoji: '🤝', video: 'Video 5 — ¿Qué es la Ética?',
    pregunta: '¿Cuál de estas acciones es considerada ética?',
    opciones: ['Mentir para beneficiarse', 'Ignorar el sufrimiento ajeno', 'Robar si nadie te ve', 'Ayudar a alguien en peligro'],
    correcto: 3,
  },
]
const respuestasFinales = ref<(number | null)[]>(Array(preguntasFinales.length).fill(null))
const finalesCompletado = computed(() => respuestasFinales.value.every(r => r !== null))
const aciertosFinales   = computed(() => respuestasFinales.value.filter((r, i) => r === preguntasFinales[i].correcto).length)
function responderFinal(i: number, opcion: number) { respuestasFinales.value[i] = opcion }

// ════════════════════════════════════════
// ACTIVIDAD 5 — El Oráculo: Identidad y Ética (5 preguntas)
// Videos 4 y 5 principalmente
// ════════════════════════════════════════
const preguntasOraculo = [
  {
    emoji: '🪞', video: 'Video 4 — ¿Quiénes Somos?',
    pregunta: '"Conócete a ti mismo" es la frase inscrita en el Templo de Delfos. ¿A quién se atribuye este precepto?',
    opciones: ['Aristóteles', 'Platón', 'Sócrates', 'Alejandro Magno'],
    correcto: 2,
    explicacion: 'Se atribuye a Sócrates (o al Oráculo de Delfos). Inspira la búsqueda de la identidad propia.',
  },
  {
    emoji: '💭', video: 'Video 4 — ¿Quiénes Somos?',
    pregunta: 'Según la filosofía, ¿qué define principalmente tu identidad?',
    opciones: ['Tu ropa y apariencia', 'Tu cuenta bancaria', 'Tus valores, acciones y pensamiento', 'Tu color de cabello'],
    correcto: 2,
    explicacion: 'La identidad filosófica se construye desde adentro: lo que piensas, valoras y haces.',
  },
  {
    emoji: '⚖️', video: 'Video 5 — ¿Qué es la Ética?',
    pregunta: 'La ética filosófica busca responder a la pregunta…',
    opciones: ['¿Cuánto mide el universo?', '¿Cómo debo actuar?', '¿Qué hay después de la muerte?', '¿Por qué existe algo?'],
    correcto: 1,
    explicacion: 'La ética es la rama que orienta nuestras acciones: ¿qué está bien o mal hacer?',
  },
  {
    emoji: '🌐', video: 'Video 5 — ¿Qué es la Ética?',
    pregunta: 'Kant propuso que debemos actuar según una regla que pueda ser…',
    opciones: ['Secreta y privada', 'Ley universal para todos', 'Útil solo para mí', 'Decidida por el rey'],
    correcto: 1,
    explicacion: 'El "imperativo categórico" de Kant dice: actúa solo según la máxima que quisieras ver como ley universal.',
  },
  {
    emoji: '🕊️', video: 'Videos 4 y 5 — Identidad y Ética',
    pregunta: '¿Por qué es importante reflexionar sobre quiénes somos para actuar éticamente?',
    opciones: [
      'Porque la moda define lo que está bien',
      'Porque quien se conoce a sí mismo elige con más conciencia',
      'Porque los demás nos dicen qué hacer',
      'Porque la identidad no tiene relación con la ética',
    ],
    correcto: 1,
    explicacion: 'Conocerse a uno mismo permite tomar decisiones conscientes y responsables: la base de la vida ética.',
  },
]
const respuestasOraculo = ref<(number | null)[]>(Array(preguntasOraculo.length).fill(null))
const oraculoCompletado = computed(() => respuestasOraculo.value.every(r => r !== null))
const aciertosOraculo   = computed(() => respuestasOraculo.value.filter((r, i) => r === preguntasOraculo[i].correcto).length)
function responderOraculo(i: number, opcion: number) { respuestasOraculo.value[i] = opcion }
function estiloOpcionOraculo(i: number, oi: number): string {
  const resp = respuestasOraculo.value[i]
  const correcto = preguntasOraculo[i].correcto
  if (resp === null) return 'border-color:rgba(201,168,76,0.3);background:#FDFAF3;color:#2C2416'
  if (oi === correcto) return 'border-color:#5C6E2E;background:#D7EDD5;color:#2C2416'
  if (resp === oi)     return 'border-color:#8B3A2A;background:#F5D9D4;color:#2C2416'
  return 'border-color:rgba(201,168,76,0.15);background:#F8F4EC;color:#8C7E6A'
}
</script>

<style scoped>
.border-selected-match { border-color: #1B3A6B !important; background: #E4EBF5 !important; }
.border-success-match  { border-color: #5C6E2E !important; background: #D7EDD5 !important; }
.border-error-match    { border-color: #8B3A2A !important; background: #F5D9D4 !important; }
</style>

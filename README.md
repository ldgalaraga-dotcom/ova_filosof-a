# 🦉 OVA Filosofía para Todos

**Objeto Virtual de Aprendizaje de Filosofía**  
Dirigido a estudiantes de grado 10 y 11 con énfasis en inclusión educativa.

---

## 🚀 Tecnologías

- **Nuxt 3** – Framework Vue para aplicaciones web
- **Vue 3** – Framework JavaScript reactivo
- **Vuetify 3** – Librería de componentes Material Design
- **Pinia** – Gestión de estado
- **TypeScript** – Tipado estático

---

## 📋 Contenidos del OVA

| Sección | Descripción |
|---|---|
| 📖 **Contenido** | 4 unidades: Filosofía, Identidad, Ética, Epistemología |
| ✏️ **Actividades** | 4 actividades interactivas |
| 📋 **Evaluación** | Quiz de 10 preguntas con retroalimentación |
| 📚 **Recursos** | Línea del tiempo, glosario y recursos adicionales |
| 👥 **Créditos** | Equipo, tecnologías y objetivos |

### Actividades incluidas:
1. **Relaciona filósofo con su idea** (juego de emparejamiento)
2. **Verdadero o Falso** (5 enunciados con explicación)
3. **Dilemas Éticos** (3 situaciones con reflexión)
4. **Ordena los Pasos** (método filosófico)

---

## ⚙️ Instalación y Ejecución

### Requisitos previos
- Node.js 18+ instalado
- npm o yarn

### Pasos:

```bash
# 1. Entrar al directorio del proyecto
cd ova-filosofia

# 2. Instalar dependencias
npm install

# 3. Ejecutar en desarrollo
npm run dev
```

Abrir en el navegador: **http://localhost:3000**

### Generar versión de producción:
```bash
npm run build
npm run preview
```

### Generar sitio estático (para subir a servidor):
```bash
npm run generate
# Los archivos quedan en la carpeta .output/public/
```

---

## ♿ Características de Accesibilidad

- Textos grandes y legibles (familia Nunito)
- Contraste de colores alto
- Diseño responsivo (móvil, tableta, PC)
- Actividades repetibles sin límite
- Retroalimentación inmediata en cada actividad
- Navegación simple y predecible
- Progreso guardado en el navegador

---

## 📁 Estructura del Proyecto

```
ova-filosofia/
├── pages/
│   ├── index.vue          # Redirección
│   ├── contenido.vue      # 4 unidades de contenido
│   ├── actividades.vue    # 4 actividades interactivas
│   ├── evaluacion.vue     # Quiz de evaluación
│   ├── recursos.vue       # Recursos y glosario
│   └── creditos.vue       # Créditos del proyecto
├── layouts/
│   └── default.vue        # Layout con barra y navegación
├── stores/
│   └── ova.ts             # Estado global (Pinia)
├── plugins/
│   └── vuetify.ts         # Configuración Vuetify
├── assets/
│   └── main.css           # Estilos globales
├── nuxt.config.ts         # Configuración Nuxt
└── package.json
```

---

## 📄 Licencia

Creative Commons BY-NC-SA 4.0 – Uso educativo sin ánimo de lucro.
# ova_filosof-a

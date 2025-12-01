<script setup lang="ts">
import { ref, computed } from "vue";
import HeroSection from "./components/HelloWorld.vue";
// Importar iconos para la sección de comunidad
import {
  MessageSquare,
  Users,
  Paintbrush,
  ThumbsUp,
  GitBranch,
  User,
  X,
} from "lucide-vue-next";

// ----- Contexto de tu Juego -----
const gameTitle = "FIVE NIGHTS IN THE CEJA";
const gameDescription =
  "Un joven debe atravesar cinco zonas urbanas peligrosas de La Paz para llegar a casa, enfrentando amenazas físicas, psicológicas y sobrenaturales.";

// ----- Datos de Personajes -----
const characters = ref([
  {
    id: 1,
    name: "El Protagonista",
    description: "Un joven paceño que debe sobrevivir a las calles nocturnas de La Paz.",
    imageUrl: "https://placehold.co/300x400/b71c1c/ffffff?text=Protagonista",
    fullDescription: "Un estudiante universitario de 22 años que vive en La Ceja. Después de una noche de fiesta en El Alto, debe encontrar el camino a casa atravesando las zonas más peligrosas de La Paz. Su única meta es llegar vivo, pero las calles nocturnas esconden más de lo que aparenta."
  },
  {
    id: 2,
    name: "El Cazador",
    description: "Enemigo misterioso que acecha en las sombras de los baños.",
    imageUrl: "https://placehold.co/300x400/0a0a0a/e0e0e0?text=Cazador",
    fullDescription: "Una figura siniestra que rondan los baños de las discotecas en busca de víctimas vulnerables. Su identidad es un misterio, pero su presencia es inconfundible. Se mueve en silencio y conoce cada rincón oscuro de la ciudad nocturna."
  },
  {
    id: 3,
    name: "El Vigilante",
    description: "Guardián corrupto que controla las calles del centro.",
    imageUrl: "https://placehold.co/300x400/1a1a1a/e0e0e0?text=Vigilante",
    fullDescription: "Un ex-policía que ahora trabaja para organizaciones criminales locales. Conoce todos los atajos y rutas de escape, pero también controla quién puede pasar por su territorio. Su corrupción es legendaria en las calles de La Paz."
  }
]);

// Estado del modal de personajes
const showCharacterModal = ref(false);

const openCharacterModal = () => {
  showCharacterModal.value = true;
};

const closeCharacterModal = () => {
  showCharacterModal.value = false;
};

// Estado del modal de mapas
const showMapModal = ref(false);
const selectedMap = ref<Level | null>(null);

const openMapModal = (level: Level) => {
  selectedMap.value = level;
  showMapModal.value = true;
};

const closeMapModal = () => {
  showMapModal.value = false;
  selectedMap.value = null;
};

// ----- Datos de Niveles (CON IMÁGENES) -----
const levels = ref([
  {
    title: "Nivel 1: El Despertar",
    setting: "Baño de una discoteca en El Alto, 2:45 a.m.",
    description:
      "Escapa de los 'cazadores de borrachos' en un silencio incómodo, encontrando tu celular para huir por la puerta trasera.",
    imageUrl:
      "https://placehold.co/600x400/0a0a0a/e0e0e0?text=Discoteca+Vac%C3%ADa",
    mapImage: "https://placehold.co/800x500/1a1a1a/b71c1c?text=Mapa+Discoteca",
    detailedDescription: "Te despiertas desorientado en el baño de una discoteca en El Alto. El ambiente es claustrofóbico y amenazante. Los 'cazadores de borrachos' patrullan los pasillos, buscando víctimas fáciles. Debes moverte sigilosamente, evitar ser detectado y encontrar tu celular que perdiste durante la noche. La única salida segura es por la puerta trasera, pero el camino está lleno de peligros. Cada sombra puede esconder una amenaza, cada ruido puede delatar tu posición.",
    objectives: ["Encontrar tu celular perdido", "Evitar a los cazadores", "Escapar por la puerta trasera", "Mantener el sigilo absoluto"]
  },
  {
    title: "Nivel 2: La Bajada",
    setting: "Zona 12 de Octubre, El Alto.",
    description:
      "Desciende por calles mal iluminadas, evitando asaltantes y perros callejeros, hasta el puesto de salchipapa.",
    imageUrl:
      "https://placehold.co/600x400/0a0a0a/e0e0e0?text=Callej%C3%B3n+Oscuro",
    mapImage: "https://placehold.co/800x500/1a1a1a/b71c1c?text=Calles+12+Octubre",
    detailedDescription: "Las calles de la Zona 12 de Octubre se extienden ante ti como un laberinto nocturno. La iluminación es escasa y las sombras ocultan peligros constantes. Asaltantes acechan en cada esquina, esperando el momento perfecto para atacar. Los perros callejeros, hambrientos y agresivos, patrullan en manadas. Tu objetivo es llegar al puesto de salchipapa, un refugio temporal donde podrás reagruparte, pero el camino es traicionero y cada paso mal dado puede ser el último.",
    objectives: ["Navegar por calles oscuras", "Evitar asaltantes", "Esquivar perros callejeros", "Llegar al puesto de salchipapa"]
  },
  {
    title: "Nivel 3: El Cruce",
    setting: "Puente del Arquitecto.",
    description:
      "Sobrevive a vendedores falsos, policías corruptos y ladrones para tomar el minibús y continuar tu huida.",
    imageUrl: "https://placehold.co/600x400/0a0a0a/e0e0e0?text=Puente+Nocturno",
    mapImage: "https://placehold.co/800x500/1a1a1a/b71c1c?text=Puente+Arquitecto",
    detailedDescription: "El Puente del Arquitecto es un punto de convergencia donde múltiples amenazas se entrecruzan. Vendedores falsos intentan distraerte con ofertas engañosas mientras sus cómplices preparan el asalto. Policías corruptos controlan el área, extorsionando a cualquiera que pase. Ladrones experimentados conocen cada escondite del puente. Tu misión es atravesar este gauntlet de corrupción y peligro para llegar a la parada de minibús, tu única oportunidad de escape hacia La Ceja.",
    objectives: ["Identificar vendedores falsos", "Evitar policías corruptos", "Escapar de ladrones", "Abordar el minibús a salvo"]
  },
]);

// ----- Datos de la Comunidad (NUEVO) -----
type PostType = "Opinión" | "Sugerencia" | "Creación";

interface Level {
  title: string;
  setting: string;
  description: string;
  imageUrl: string;
  mapImage: string;
  detailedDescription: string;
  objectives: string[];
}

const communityPosts = ref([
  {
    id: 1,
    type: "Opinión" as PostType,
    title: "¡Qué susto el Nivel 2! No me lo esperaba",
    author: "Gamer_Bolivia",
    avatarUrl: "https://placehold.co/40x40/b71c1c/ffffff?text=G",
    content:
      "En serio, la parte donde suenan los perros y no sabes de dónde... 10/10. Me recordó a cuando volvía de una fiesta en la 12.",
    upvotes: 42,
    comments: 8,
  },
  {
    id: 2,
    type: "Sugerencia" as PostType,
    title: "Sugerencia: Añadir un 'Modo Paceño'",
    author: "Llajta_Mike",
    avatarUrl: "https://placehold.co/40x40/1a1a1a/e0e0e0?text=L",
    content:
      "¿Qué tal si en un modo difícil el personaje tiene que comer un sándwich de chola para recuperar vida pero solo hay uno en todo el mapa?",
    upvotes: 112,
    comments: 23,
  },
  {
    id: 3,
    type: "Creación" as PostType,
    title: "[SKIN] Hice un mod del 'Pepino' como enemigo",
    author: "ArteDigital",
    avatarUrl: "https://placehold.co/40x40/1a1a1a/e0e0e0?text=A",
    content:
      "Adjunto un diseño de cómo se vería el 'Pepino' persiguiéndote en el Nivel 3. ¡Espero que a los desarrolladores les guste! [Ver Imagen]",
    upvotes: 89,
    comments: 15,
  },
  {
    id: 4,
    type: "Sugerencia" as PostType,
    title: "Los 'cazadores de borrachos' deberían robarte el celular",
    author: "Ceja_Survivor",
    avatarUrl: "https://placehold.co/40x40/1a1a1a/e0e0e0?text=C",
    content:
      "Si te atrapan, en lugar de 'Game Over', que te quiten el celular. Y tengas que buscar un punto de WiFi gratis para ver el mapa.",
    upvotes: 74,
    comments: 11,
  },
]);

// Sistema de Pestañas para la Comunidad
const activeTab = ref<PostType>("Opinión");
const filteredPosts = computed(() => {
  return communityPosts.value.filter((post) => post.type === activeTab.value);
});

// Iconos para tipos de post
const postIcons = {
  Opinión: MessageSquare,
  Sugerencia: GitBranch,
  Creación: Paintbrush,
};
</script>

<template>
  <main>
    <HeroSection :msg="gameTitle" :description="gameDescription" />

    <div class="content-wrapper">
      <!-- ===== SECCIÓN DE PERSONAJES ===== -->
      <section class="characters-section">
        <h2
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
        >
          Conoce a los Personajes
        </h2>

        <!-- Personaje Principal -->
        <div class="main-character" v-if="characters.length > 0">
          <div
            class="character-card"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 200 } }"
          >
            <div class="character-image">
              <img :src="characters[0]!.imageUrl" :alt="characters[0]!.name" />
            </div>
            <div class="character-info">
              <h3>{{ characters[0]!.name }}</h3>
              <p>{{ characters[0]!.description }}</p>
            </div>
          </div>
        </div>

        <!-- Botón Conoce Más -->
        <div class="character-cta">
          <button
            class="cta-button"
            @click="openCharacterModal"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 400 } }"
          >
            <User :size="24" />
            <span>Conoce Más</span>
          </button>
        </div>
      </section>
      <!-- ===== SECCIÓN DE NIVELES (ACTUALIZADA) ===== -->
      <section class="levels-section">
        <h2
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
        >
          Sobrevive a la Noche
        </h2>

        <div class="levels-list">
          <div
            class="level-card"
            v-for="(level, index) in levels"
            :key="level.title"
            @click="openMapModal(level)"
            v-motion
            :initial="{ opacity: 0, x: -100 }"
            :enter="{
              opacity: 1, 
              x: 0,
              transition: { delay: index * 150 },
            }"
          >
            <!-- Imagen del Nivel -->
            <div class="level-image">
              <img :src="level.imageUrl" :alt="level.title" />
            </div>
            <!-- Contenido del Nivel -->
            <div class="level-content">
              <h3>{{ level.title }}</h3>
              <strong>{{ level.setting }}</strong>
              <p>{{ level.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== NUEVA SECCIÓN: COMUNIDAD ===== -->
      <section class="community-section">
        <h2
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
        >
          Apoyo de la Comunidad
        </h2>
        <p
          class="community-subtitle"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{
            opacity: 1, 
            y: 0,
            transition: { duration: 500, delay: 150 },
          }"
        >
          Únete a la conversación, comparte tus creaciones y ayuda a mejorar el
          juego.
        </p>
        <!-- Pestañas de la Comunidad -->
        <div
          class="community-tabs"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{
            opacity: 1, 
            y: 0,
            transition: { duration: 500, delay: 300 },
          }"
        >
          <button
            @click="activeTab = 'Opinión'"
            :class="{ active: activeTab === 'Opinión' }"
          >
            <MessageSquare :size="18" /> Opiniones
          </button>
          <button
            @click="activeTab = 'Sugerencia'"
            :class="{ active: activeTab === 'Sugerencia' }"
          >
            <GitBranch :size="18" /> Sugerencias
          </button>
          <button
            @click="activeTab = 'Creación'"
            :class="{ active: activeTab === 'Creación' }"
          >
            <Paintbrush :size="18" /> Creaciones
          </button>
        </div>

        <!-- Feed de la Comunidad -->
        <div class="community-feed">
          <div
            class="community-post"
            v-for="post in filteredPosts"
            :key="post.id"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{
              opacity: 1, 
              y: 0,
              transition: { delay: post.id * 100 },
            }"
          >
            <!-- Encabezado del Post -->
            <div class="post-header">
              <img
                :src="post.avatarUrl"
                :alt="post.author"
                class="post-avatar"
              />
              <span class="post-author">{{ post.author }}</span>
              <span class="post-type">
                <component :is="postIcons[post.type]" :size="14" />
                {{ post.type }}
              </span>
            </div>

            <!-- Cuerpo del Post -->
            <div class="post-body">
              <h4>{{ post.title }}</h4>
              <p>{{ post.content }}</p>
            </div>

            <!-- Pie del Post -->
            <div class="post-footer">
              <span><ThumbsUp :size="16" /> {{ post.upvotes }}</span>
              <span
                ><MessageSquare :size="16" />
                {{ post.comments }} Comentarios</span
              >
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- ===== MODAL DE PERSONAJES ===== -->
    <div v-if="showCharacterModal" class="modal-overlay" @click="closeCharacterModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Personajes del Juego</h3>
          <button class="modal-close" @click="closeCharacterModal">
            <X :size="24" />
          </button>
        </div>
        
        <div class="characters-grid">
          <div
            class="character-modal-card"
            v-for="character in characters"
            :key="character.id"
          >
            <div class="character-modal-image">
              <img :src="character.imageUrl" :alt="character.name" />
            </div>
            <div class="character-modal-info">
              <h4>{{ character.name }}</h4>
              <p>{{ character.fullDescription }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== MODAL DE MAPAS ===== -->
    <div v-if="showMapModal" class="modal-overlay" @click="closeMapModal">
      <div class="map-modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ selectedMap?.title }}</h3>
          <button class="modal-close" @click="closeMapModal">
            <X :size="24" />
          </button>
        </div>
        
        <div class="map-modal-body">
          <!-- Imagen del Mapa -->
          <div class="map-image-container">
            <img :src="selectedMap?.mapImage" :alt="selectedMap?.title" />
          </div>
          
          <!-- Información del Nivel -->
          <div class="map-info-section">
            <div class="map-setting">
              <strong>Ubicación:</strong> {{ selectedMap?.setting }}
            </div>
            
            <div class="map-description">
              <h4>Descripción</h4>
              <p>{{ selectedMap?.detailedDescription }}</p>
            </div>
            
            <div class="map-objectives" v-if="selectedMap?.objectives">
              <h4>Objetivos</h4>
              <ul>
                <li v-for="objective in selectedMap.objectives" :key="objective">
                  {{ objective }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="main-footer">
      <p>Todos los derechos reservados © 2025. FIVE NIGHTS IN THE CEJA.</p>
    </footer>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
}

.content-wrapper {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

/* --- Estilos de Niveles Actualizados --- */

.levels-section {
  padding: 4em 1em;
}

.levels-section h2 {
  font-family: "Creepster", cursive;
  font-size: 3.5rem;
  color: var(--color-primary);
  text-transform: uppercase;
  margin-bottom: 1.5em;
  letter-spacing: 2px;
  animation: breathing-glow 4s infinite ease-in-out;
}

@keyframes breathing-glow {
  0% {
    text-shadow: 0 0 10px rgba(183, 28, 28, 0.5);
    opacity: 0.8;
  }
  50% {
    text-shadow: 0 0 25px rgba(183, 28, 28, 1);
    opacity: 1;
  }
  100% {
    text-shadow: 0 0 10px rgba(183, 28, 28, 0.5);
    opacity: 0.8;
  }
}

.levels-list {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.level-card {
  display: flex;
  background-color: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  text-align: left;
  overflow: hidden; /* Importante para la imagen */
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  cursor: pointer;
}

.level-card:hover {
  transform: translateY(-10px) scale(1.01);
  box-shadow: 0 15px 30px rgba(183, 28, 28, 0.2);
  border-color: var(--color-primary);
}

.level-image {
  flex: 0 0 350px; /* Ancho fijo para la imagen */
  min-height: 220px;
  max-width: 100%; /* Evita que el contenedor de la imagen se estire indebidamente */
}

.level-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  max-width: 100%; /* Asegura que la imagen no se desborde */
  opacity: 0.7;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.level-card:hover .level-image img {
  opacity: 1;
  transform: scale(1.05);
}

.level-content {
  padding: 1.5rem 2rem;
  flex: 1;
}

.level-content h3 {
  font-size: 1.75rem;
  color: var(--color-primary-hover);
  margin-top: 0;
  margin-bottom: 0.25em;
}

.level-content strong {
  color: #aaa;
  font-size: 0.9rem;
  display: block;
  margin-bottom: 1rem;
  font-weight: 700;
}

.level-content p {
  font-size: 1rem;
  line-height: 1.6;
}

/* --- Estilos de la Nueva Sección de Comunidad --- */

.community-section {
  padding: 4em 1em;
  margin-top: 4em;
  border-top: 1px solid var(--color-border);
}

.community-section h2 {
  font-family: "Creepster", cursive;
  font-size: 3.5rem;
  color: var(--color-primary);
  text-transform: uppercase;
  margin-bottom: 0.5em;
  letter-spacing: 2px;
  animation: breathing-glow 4s infinite ease-in-out;
}

.community-subtitle {
  font-size: 1.2rem;
  color: #ccc;
  margin-top: 0;
  margin-bottom: 3em;
}

.community-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.community-tabs button {
  background: transparent;
  border: 2px solid var(--color-border);
  color: var(--color-text);
  padding: 0.7rem 1.8rem;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 700;
  font-family: "Montserrat", sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.7em;
}

.community-tabs button:hover,
.community-tabs button.active {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
  transform: scale(1.05);
}

.community-feed {
  display: grid;
  /* Rejilla responsive para posts */
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.community-post {
  background-color: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.community-post:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(183, 28, 28, 0.1);
  border-color: var(--color-primary-hover);
}

.post-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-border);
}

.post-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--color-border);
}

.post-author {
  font-weight: 700;
  color: white;
}

.post-type {
  margin-left: auto; /* Empuja el tipo a la derecha */
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #aaa;
  background: #2a2a2a;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
}

.post-body h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  color: var(--color-primary-hover);
  font-weight: 700;
}

.post-body p {
  margin: 0;
  color: #ccc;
  font-size: 0.95rem;
}

.post-footer {
  display: flex;
  gap: 1.5rem;
  margin-top: 1.25rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--color-border);
  font-size: 0.9rem;
  color: #888;
  align-items: center;
}

.post-footer span {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
}

.main-footer {
  background-color: var(--color-card);
  padding: 2em;
  margin-top: 4em;
  border-top: 1px solid var(--color-border);
  color: #888;
}

/* --- Estilos de la Sección de Personajes --- */

.characters-section {
  padding: 4em 1em;
  margin-top: 2em;
  border-top: 1px solid var(--color-border);
}

.characters-section h2 {
  font-family: "Creepster", cursive;
  font-size: 3.5rem;
  color: var(--color-primary);
  text-transform: uppercase;
  margin-bottom: 1.5em;
  letter-spacing: 2px;
  animation: breathing-glow 4s infinite ease-in-out;
}

.main-character {
  display: flex;
  justify-content: center;
  margin-bottom: 2.5rem;
}

.character-card {
  background-color: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  max-width: 600px;
  width: 100%;
  display: flex;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.character-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 15px 30px rgba(183, 28, 28, 0.2);
  border-color: var(--color-primary);
}

.character-image {
  flex: 0 0 250px;
  min-height: 300px;
}

.character-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.character-card:hover .character-image img {
  opacity: 1;
  transform: scale(1.05);
}

.character-info {
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.character-info h3 {
  font-size: 2rem;
  color: var(--color-primary-hover);
  margin: 0 0 1rem 0;
  font-weight: 700;
}

.character-info p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #ccc;
  margin: 0;
}

.character-cta {
  display: flex;
  justify-content: center;
}

/* --- Estilos del Modal --- */

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background-color: var(--color-card);
  border: 2px solid var(--color-primary);
  border-radius: 12px;
  width: 90%;
  max-width: 1000px;
  max-height: 80vh;
  overflow-y: auto;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateY(-50px) scale(0.9);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--color-border);
}

.modal-header h3 {
  font-family: "Creepster", cursive;
  font-size: 2.2rem;
  color: var(--color-primary);
  margin: 0;
  letter-spacing: 1px;
}

.modal-close {
  background: transparent;
  border: none;
  color: var(--color-text);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.modal-close:hover {
  background-color: var(--color-primary);
  color: white;
}

.characters-grid {
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.character-modal-card {
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.character-modal-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(183, 28, 28, 0.1);
}

.character-modal-image {
  height: 250px;
  overflow: hidden;
}

.character-modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.character-modal-card:hover .character-modal-image img {
  transform: scale(1.1);
}

.character-modal-info {
  padding: 1.5rem;
}

.character-modal-info h4 {
  font-size: 1.5rem;
  color: var(--color-primary-hover);
  margin: 0 0 1rem 0;
  font-weight: 700;
}

.character-modal-info p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #ccc;
  margin: 0;
}

/* --- Estilos del Modal de Mapas --- */

.map-modal-content {
  background-color: var(--color-card);
  border: 2px solid var(--color-primary);
  border-radius: 12px;
  width: 90%;
  max-width: 1200px;
  max-height: 85vh;
  overflow-y: auto;
  animation: slideIn 0.3s ease;
}

.map-modal-body {
  padding: 0;
}

.map-image-container {
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-bottom: 1px solid var(--color-border);
}

.map-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.map-image-container:hover img {
  transform: scale(1.02);
}

.map-info-section {
  padding: 2rem;
}

.map-setting {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: var(--color-primary-hover);
  padding: 1rem;
  background-color: var(--color-background);
  border-radius: 8px;
  border-left: 4px solid var(--color-primary);
}

.map-setting strong {
  color: var(--color-primary);
  font-weight: 700;
}

.map-description {
  margin-bottom: 2rem;
}

.map-description h4 {
  font-family: "Creepster", cursive;
  font-size: 1.8rem;
  color: var(--color-primary);
  margin: 0 0 1rem 0;
  letter-spacing: 1px;
}

.map-description p {
  font-size: 1rem;
  line-height: 1.7;
  color: #ccc;
  text-align: justify;
}

.map-objectives {
  margin-top: 2rem;
}

.map-objectives h4 {
  font-family: "Creepster", cursive;
  font-size: 1.8rem;
  color: var(--color-primary);
  margin: 0 0 1rem 0;
  letter-spacing: 1px;
}

.map-objectives ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.map-objectives li {
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 0.8rem 1.2rem;
  margin-bottom: 0.8rem;
  position: relative;
  color: #ccc;
  transition: all 0.3s ease;
}

.map-objectives li:before {
  content: "★";
  color: var(--color-primary);
  font-weight: bold;
  margin-right: 0.8rem;
}

.map-objectives li:hover {
  border-color: var(--color-primary);
  transform: translateX(5px);
  box-shadow: 0 2px 8px rgba(183, 28, 28, 0.1);
}

/* --- Responsividad --- */

@media (max-width: 768px) {
  .level-card {
    flex-direction: column; /* Apila imagen y texto en móviles */
  }

  .level-image {
    flex: 0 0 200px; /* Ancho completo, altura fija */
  }

  .character-card {
    flex-direction: column;
    text-align: center;
  }

  .character-image {
    flex: 0 0 300px;
  }

  .characters-section h2 {
    font-size: 2.5rem;
  }

  .modal-content {
    width: 95%;
    margin: 1rem;
  }

  .modal-header {
    padding: 1rem 1.5rem;
  }

  .modal-header h3 {
    font-size: 1.8rem;
  }

  .characters-grid {
    padding: 1.5rem;
    grid-template-columns: 1fr;
  }

  .map-modal-content {
    width: 95%;
    margin: 1rem;
  }

  .map-image-container {
    height: 250px;
  }

  .map-info-section {
    padding: 1.5rem;
  }

  .map-description h4,
  .map-objectives h4 {
    font-size: 1.4rem;
  }

  .map-setting {
    font-size: 1rem;
    padding: 0.8rem;
  }
}
</style>

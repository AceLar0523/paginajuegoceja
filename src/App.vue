<script setup lang="ts">
import { ref, computed } from 'vue'
import HeroSection from './components/HelloWorld.vue'
// Importar iconos para la sección de comunidad
import { MessageSquare, Users, Paintbrush, ThumbsUp, GitBranch } from 'lucide-vue-next'

// ----- Contexto de tu Juego -----
const gameTitle = "FIVE NIGHTS IN THE CEJA"
const gameDescription = "Un joven debe atravesar cinco zonas urbanas peligrosas de La Paz para llegar a casa, enfrentando amenazas físicas, psicológicas y sobrenaturales."

// ----- Datos de Niveles (CON IMÁGENES) -----
const levels = ref([
  {
    title: "Nivel 1: El Despertar",
    setting: "Baño de una discoteca en El Alto, 2:45 a.m.",
    description: "Escapa de los 'cazadores de borrachos' en un silencio incómodo, encontrando tu celular para huir por la puerta trasera.",
    // Placeholder oscuro con texto. ¡Cámbialos por tus capturas!
    imageUrl: "https://placehold.co/600x400/0a0a0a/e0e0e0?text=Discoteca+Vac%C3%ADa"
  },
  {
    title: "Nivel 2: La Bajada",
    setting: "Zona 12 de Octubre, El Alto.",
    description: "Desciende por calles mal iluminadas, evitando asaltantes y perros callejeros, hasta el puesto de salchipapa.",
    imageUrl: "https://placehold.co/600x400/0a0a0a/e0e0e0?text=Callej%C3%B3n+Oscuro"
  },
  {
    title: "Nivel 3: El Cruce",
    setting: "Puente del Arquitecto.",
    description: "Sobrevive a vendedores falsos, policías corruptos y ladrones para tomar el minibús y continuar tu huida.",
    imageUrl: "https://placehold.co/600x400/0a0a0a/e0e0e0?text=Puente+Nocturno"
  }
])

// ----- Datos de la Comunidad (NUEVO) -----
type PostType = 'Opinión' | 'Sugerencia' | 'Creación';

const communityPosts = ref([
  {
    id: 1,
    type: 'Opinión' as PostType,
    title: "¡Qué susto el Nivel 2! No me lo esperaba",
    author: "Gamer_Bolivia",
    avatarUrl: "https://placehold.co/40x40/b71c1c/ffffff?text=G",
    content: "En serio, la parte donde suenan los perros y no sabes de dónde... 10/10. Me recordó a cuando volvía de una fiesta en la 12.",
    upvotes: 42,
    comments: 8,
  },
  {
    id: 2,
    type: 'Sugerencia' as PostType,
    title: "Sugerencia: Añadir un 'Modo Paceño'",
    author: "Llajta_Mike",
    avatarUrl: "https://placehold.co/40x40/1a1a1a/e0e0e0?text=L",
    content: "¿Qué tal si en un modo difícil el personaje tiene que comer un sándwich de chola para recuperar vida pero solo hay uno en todo el mapa?",
    upvotes: 112,
    comments: 23,
  },
  {
    id: 3,
    type: 'Creación' as PostType,
    title: "[SKIN] Hice un mod del 'Pepino' como enemigo",
    author: "ArteDigital",
    avatarUrl: "https://placehold.co/40x40/1a1a1a/e0e0e0?text=A",
    content: "Adjunto un diseño de cómo se vería el 'Pepino' persiguiéndote en el Nivel 3. ¡Espero que a los desarrolladores les guste! [Ver Imagen]",
    upvotes: 89,
    comments: 15,
  },
  {
    id: 4,
    type: 'Sugerencia' as PostType,
    title: "Los 'cazadores de borrachos' deberían robarte el celular",
    author: "Ceja_Survivor",
    avatarUrl: "https://placehold.co/40x40/1a1a1a/e0e0e0?text=C",
    content: "Si te atrapan, en lugar de 'Game Over', que te quiten el celular. Y tengas que buscar un punto de WiFi gratis para ver el mapa.",
    upvotes: 74,
    comments: 11,
  },
])

// Sistema de Pestañas para la Comunidad
const activeTab = ref<PostType>('Opinión');
const filteredPosts = computed(() => {
  return communityPosts.value.filter(post => post.type === activeTab.value);
});

// Iconos para tipos de post
const postIcons = {
  'Opinión': MessageSquare,
  'Sugerencia': GitBranch,
  'Creación': Paintbrush,
}

</script>

<template>
  <main>
    <HeroSection :msg="gameTitle" :description="gameDescription" />
    
    <div class="content-wrapper">
      <!-- ===== SECCIÓN DE NIVELES (ACTUALIZADA) ===== -->
      <section class="levels-section">
        <h2 v-motion-slide-visible-once-bottom>
          Sobrevive a la Noche
        </h2>
        
        <div class="levels-list">
          <div 
            class="level-card" 
            v-for="(level, index) in levels" 
            :key="level.title"
            v-motion
            :initial="{ opacity: 0, x: -100 }"
            :visible-once="{ opacity: 1, x: 0, transition: { delay: index * 150 } }"
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
        <h2 v-motion-slide-visible-once-bottom>
          Apoyo de la Comunidad
        </h2>
        <p class="community-subtitle" v-motion-slide-visible-once-bottom>
          Únete a la conversación, comparte tus creaciones y ayuda a mejorar el juego.
        </p>

        <!-- Pestañas de la Comunidad -->
        <div class="community-tabs" v-motion-slide-visible-once-bottom>
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
            :visible-once="{ opacity: 1, y: 0, transition: { delay: post.id * 100 } }"
          >
            <!-- Encabezado del Post -->
            <div class="post-header">
              <img :src="post.avatarUrl" :alt="post.author" class="post-avatar" />
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
              <span><MessageSquare :size="16" /> {{ post.comments }} Comentarios</span>
            </div>
          </div>
        </div>
      </section>
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
  font-family: 'Creepster', cursive;
  font-size: 3.5rem;
  color: var(--color-primary);
  text-transform: uppercase;
  margin-bottom: 1.5em;
  letter-spacing: 2px;
  animation: breathing-glow 4s infinite ease-in-out;
}

@keyframes breathing-glow {
  0% { text-shadow: 0 0 10px rgba(183, 28, 28, 0.5); opacity: 0.8; }
  50% { text-shadow: 0 0 25px rgba(183, 28, 28, 1); opacity: 1; }
  100% { text-shadow: 0 0 10px rgba(183, 28, 28, 0.5); opacity: 0.8; }
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
  font-family: 'Creepster', cursive;
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
  font-family: 'Montserrat', sans-serif;
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

/* --- Responsividad --- */

@media (max-width: 768px) {
  .level-card {
    flex-direction: column; /* Apila imagen y texto en móviles */
  }

  .level-image {
    flex: 0 0 200px; /* Ancho completo, altura fija */
  }
}

</style>
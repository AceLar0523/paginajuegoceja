<script setup lang="ts">
import { ref } from 'vue'
// Importamos el componente (aunque el archivo se llame HelloWorld.vue, 
// ahora es nuestra HeroSection)
import HeroSection from './components/HelloWorld.vue'

// ----- Contexto de tu Juego -----
const gameTitle = "FIVE NIGHTS IN THE CEJA"
const gameDescription = "Un joven debe atravesar cinco zonas urbanas peligrosas de La Paz para llegar a casa, enfrentando amenazas físicas, psicológicas y sobrenaturales."

const levels = ref([
  {
    title: "Nivel 1: El Despertar",
    setting: "Baño de una discoteca en El Alto, 2:45 a.m.",
    description: "Escapa de los 'cazadores de borrachos' en un silencio incómodo, encontrando tu celular para huir por la puerta trasera."
  },
  {
    title: "Nivel 2: La Bajada",
    setting: "Zona 12 de Octubre, El Alto.",
    description: "Desciende por calles mal iluminadas, evitando asaltantes y perros callejeros, hasta el puesto de salchipapa."
  },
  {
    title: "Nivel 3: El Cruce",
    setting: "Puente del Arquitecto.",
    description: "Sobrevive a vendedores falsos, policías corruptos y ladrones para tomar el minibús y continuar tu huida."
  }
])
</script>

<template>
  <main>
    <HeroSection :msg="gameTitle" :description="gameDescription" />
    
    <div class="content-wrapper">
      <section class="levels-section">
        <h2 v-motion-slide-visible-once-bottom>
          Sobrevive a la Noche
        </h2>
        
        <div class="levels-grid">
          <div 
            class="level-card" 
            v-for="(level, index) in levels" 
            :key="level.title"
            v-motion
            :initial="{ opacity: 0, y: 100 }"
            :visible-once="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
          >
            <h3>{{ level.title }}</h3>
            <strong>{{ level.setting }}</strong>
            <p>{{ level.description }}</p>
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
  box-sizing: border-box; /* Asegura que el padding no desborde */
}

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
}

.levels-grid {
  display: grid;
  /* Rejilla responsive */
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.level-card {
  background-color: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 2rem;
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.level-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 20px rgba(183, 28, 28, 0.2);
  border-color: var(--color-primary);
}

.level-card h3 {
  font-size: 1.75rem;
  color: var(--color-primary-hover);
  margin-top: 0;
  margin-bottom: 0.25em;
}

.level-card strong {
  color: #aaa;
  font-size: 0.9rem;
  display: block;
  margin-bottom: 1rem;
  font-weight: 700;
}

.level-card p {
  font-size: 1rem;
  line-height: 1.6;
}

.main-footer {
  background-color: var(--color-card);
  padding: 2em;
  margin-top: 4em;
  border-top: 1px solid var(--color-border);
  color: #888;
}
</style>
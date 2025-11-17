<script setup lang="ts">
import { PlayCircle } from 'lucide-vue-next'
defineProps<{ 
  msg: string, 
  description: string 
}>()
</script>

<template>
  <section class="hero-section">
    <div class="hero-background"></div>
    
    <div class="hero-content" v-motion-fade-in>
      <h1 class="game-title">{{ msg }}</h1>
      <p class="game-description">{{ description }}</p>
      
      <button class="cta-button">
        <PlayCircle :size="24" />
        <span>Ver Tráiler</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  height: 95vh; /* Casi toda la altura de la pantalla */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  border-bottom: 2px solid var(--color-primary);
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* REEMPLAZA ESTA URL con una imagen o GIF de tu juego. 
    Usamos un placeholder oscuro por ahora.
  */
  background: #000 url('https://via.placeholder.com/1920x1080/0a0a0a/111111?text=Fondo+del+Juego') no-repeat center center/cover;
  filter: brightness(0.3) blur(2px); /* Oscurece y desenfoca el fondo */
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 2em;
}

.game-title {
  /* Fuente de Terror para el título */
  font-family: 'Creepster', cursive; 
  font-size: clamp(3.5rem, 9vw, 8rem); /* Tamaño responsivo */
  color: var(--color-primary);
  margin: 0;
  line-height: 1.1;
  text-shadow: 0 0 15px rgba(183, 28, 28, 0.7);
}

.game-description {
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  max-width: 650px;
  margin: 1em auto 2.5em;
  color: #ccc;
  font-weight: 400;
}

.cta-button {
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.8em 2.2em;
  font-size: 1.2rem;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.7em;
  /* Animación de pulso */
  animation: pulse 2s infinite;
}

.cta-button:hover {
  background-color: var(--color-primary-hover);
  transform: scale(1.05);
  animation-play-state: paused; /* Pausa la animación al pasar el mouse */
}

/* Animación de pulso para el botón */
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(183, 28, 28, 0.7); }
  70% { box-shadow: 0 0 0 15px rgba(183, 28, 28, 0); }
  100% { box-shadow: 0 0 0 0 rgba(183, 28, 28, 0); }
}
</style>
<script setup lang="ts">
import { PlayCircle, Download } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
// Corrección: Importar como un namespace
import * as anime from 'animejs' 

defineProps<{ 
  msg: string, 
  description: string 
}>()

const titleRef = ref(null)

onMounted(() => {
  if (titleRef.value) {
    const textWrapper = titleRef.value as HTMLElement;
    textWrapper.innerHTML = textWrapper.textContent!.replace(
      /\S/g, 
      "<span class='letter'>$&</span>"
    );

    // Corrección: Usar 'anime.default' para acceder a la función
    anime.default.timeline({ loop: false })
      .add({
        targets: '.letter',
        translateY: [60, 0],
        opacity: [0, 1],
        filter: ['blur(15px)', 'blur(0px)'],
        easing: 'easeOutExpo',
        duration: 1800,
        delay: anime.default.stagger(100) // Y aquí también
      });
  }
})
</script>

<template>
  <section class="hero-section">
    <div class="hero-background"></div>
    
    <div class="hero-content" v-motion-fade-in>
      <h1 class="game-title" ref="titleRef">{{ msg }}</h1>
      <p class="game-description">{{ description }}</p>
      
      <div class="button-group">
        <button class="cta-button">
          <PlayCircle :size="24" />
          <span>Ver Tráiler</span>
        </button>
        
        <a 
          href="https://github.com/acelar0523/paginajuegoceja" 
          target="_blank" 
          class="cta-button cta-button-secondary"
        >
          <Download :size="24" />
          <span>Descargar Juego</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: 95vh; /* Cambiado de height a min-height */
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
  /* Reemplaza este placeholder por una imagen tuya */
  background: #000 url('https://images.pexels.com/photos/5199617/pexels-photo-5199617.jpeg') no-repeat center center/cover;
  filter: brightness(0.3) blur(2px);
  z-index: 1;
  animation: subtle-zoom 20s infinite alternate ease-in-out;
}

@keyframes subtle-zoom {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 2em;
}

.game-title {
  font-family: 'Creepster', cursive; 
  font-size: clamp(3.5rem, 9vw, 8rem);
  color: var(--color-primary);
  margin: 0;
  line-height: 1.1;
  text-shadow: 0 0 15px rgba(183, 28, 28, 0.7);
  
  :deep(.letter) {
    display: inline-block;
    line-height: 1em;
    opacity: 0;
  }
}

.game-description {
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  max-width: 650px;
  margin: 1em auto 2.5em;
  color: #ccc;
  font-weight: 400;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
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
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.7em;
  text-decoration: none;
  animation: pulse 2s infinite;
}

.cta-button:hover {
  background-color: var(--color-primary-hover);
  transform: scale(1.05);
  animation-play-state: paused;
}

.cta-button-secondary {
  background-color: transparent;
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
  animation: none;
}

.cta-button-secondary:hover {
  background-color: var(--color-primary);
  color: white;
  transform: scale(1.05);
}


@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(183, 28, 28, 0.7); }
  70% { box-shadow: 0 0 0 15px rgba(183, 28, 28, 0); }
  100% { box-shadow: 0 0 0 0 rgba(183, 28, 28, 0); }
}
</style>
<script setup lang="ts">
import { X } from 'lucide-vue-next'

defineProps<{
  isVisible: boolean
}>()

defineEmits<{
  close: []
}>()

// Datos del equipo
const teamMembers = [
  {
    id: 1,
    name: "JHOSUE AMETH FARIÑAS POZO",
    role: "Product Owner, Desarrollador",
    avatar: "/img/jhosue-avatar.jpeg",
    description: "Líder del proyecto y desarrollador principal, encargado de definir la visión del producto y coordinar el equipo de desarrollo."
  },
  {
    id: 2,
    name: "ISACC LEONARDO MEALLA POZO", 
    role: "Desarrollador",
    avatar: "/img/isacc-avatar.jpeg",
    description: "Desarrollador especializado en la implementación de mecánicas de juego y sistemas de interacción del usuario."
  },
  {
    id: 3,
    name: "FRANZ JHOSTIN OROZCO SALAZAR",
    role: "Desarrollador", 
    avatar: "/img/franz-avatar.jpg",
    description: "Desarrollador enfocado en la programación de funcionalidades core y optimización del rendimiento del juego."
  },
  {
    id: 4,
    name: "KEVIN ALEXIS MUJICA LAIME",
    role: "Diseñador, Desarrollador",
    avatar: "/img/kevin-avatar.jpg", 
    description: "Diseñador y desarrollador, responsable de la experiencia visual del usuario y la implementación del frontend."
  },
  {
    id: 5,
    name: "AMILKAR HUGO GUARACHI NINA",
    role: "Desarrollador, Documentador",
    avatar: "/img/amilkar-avatar.jpg",
    description: "Desarrollador y documentador, encargado de mantener la documentación del proyecto y desarrollar funcionalidades clave."
  }
]
</script>

<template>
  <div v-if="isVisible" class="team-modal-overlay" @click="$emit('close')">
    <div class="team-modal-content" @click.stop>
      <div class="team-modal-header">
        <h2>Conoce Nuestro Equipo</h2>
        <button class="team-modal-close" @click="$emit('close')">
          <X :size="24" />
        </button>
      </div>

      <div class="team-intro">
        <p>
          Somos un equipo apasionado de 5 desarrolladores bolivianos comprometidos con crear 
          experiencias de terror urbano únicas que capturen la esencia de las calles nocturnas de La Paz.
        </p>
      </div>

      <div class="team-grid">
        <div 
          class="team-card" 
          v-for="member in teamMembers" 
          :key="member.id"
        >
          <div class="team-avatar">
            <img :src="member.avatar" :alt="member.name" />
          </div>
          <div class="team-info">
            <h3>{{ member.name }}</h3>
            <span class="team-role">{{ member.role }}</span>
            <p>{{ member.description }}</p>
          </div>
        </div>
      </div>

      <div class="team-footer">
        <p>
          <strong>FIVE NIGHTS IN THE CEJA</strong> es más que un juego, 
          es una representación auténtica de la cultura urbana boliviana.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.team-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease;
}

.team-modal-content {
  background-color: var(--color-card);
  border: 2px solid var(--color-primary);
  border-radius: 12px;
  width: 95%;
  max-width: 1200px;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from {
    transform: translateY(-30px) scale(0.95);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

.team-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2.5rem 1rem;
  border-bottom: 1px solid var(--color-border);
}

.team-modal-header h2 {
  font-family: 'Creepster', cursive;
  font-size: 2.5rem;
  color: var(--color-primary);
  margin: 0;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.team-modal-close {
  background: transparent;
  border: none;
  color: var(--color-text);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.team-modal-close:hover {
  background-color: var(--color-primary);
  color: white;
}

.team-intro {
  padding: 2rem 2.5rem 1rem;
  text-align: center;
}

.team-intro p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #ccc;
  max-width: 800px;
  margin: 0 auto;
}

.team-grid {
  padding: 2rem 2.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.team-card {
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.team-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(183, 28, 28, 0.05), transparent);
  transition: left 0.6s ease;
}

.team-card:hover::before {
  left: 100%;
}

.team-card:hover {
  border-color: var(--color-primary);
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(183, 28, 28, 0.15);
}

.team-avatar {
  width: 120px;
  height: 120px;
  margin: 0 auto 1.5rem;
  position: relative;
}

.team-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid var(--color-primary);
  object-fit: cover;
  transition: all 0.3s ease;
}

.team-card:hover .team-avatar img {
  border-color: var(--color-primary-hover);
  box-shadow: 0 0 20px rgba(183, 28, 28, 0.4);
}

.team-info h3 {
  font-size: 1.3rem;
  color: var(--color-primary-hover);
  margin: 0 0 0.5rem 0;
  font-weight: 700;
  line-height: 1.3;
}

.team-role {
  display: inline-block;
  background: var(--color-primary);
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.team-info p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #bbb;
  margin: 1rem 0 0 0;
}

.team-footer {
  padding: 1rem 2.5rem 2rem;
  text-align: center;
  border-top: 1px solid var(--color-border);
}

.team-footer p {
  font-size: 1rem;
  line-height: 1.6;
  color: #aaa;
  margin: 0;
}

.team-footer strong {
  color: var(--color-primary);
  font-weight: 700;
}

/* Responsividad */
@media (max-width: 768px) {
  .team-modal-content {
    width: 95%;
    margin: 1rem;
  }

  .team-modal-header {
    padding: 1.5rem 2rem 1rem;
  }

  .team-modal-header h2 {
    font-size: 2rem;
  }

  .team-intro,
  .team-grid,
  .team-footer {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .team-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .team-card {
    padding: 1.5rem;
  }

  .team-avatar {
    width: 100px;
    height: 100px;
  }

  .team-info h3 {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .team-modal-header {
    padding: 1rem 1.5rem 0.5rem;
  }

  .team-modal-header h2 {
    font-size: 1.6rem;
  }

  .team-intro,
  .team-grid, 
  .team-footer {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .team-card {
    padding: 1.2rem;
  }

  .team-avatar {
    width: 80px;
    height: 80px;
    margin-bottom: 1rem;
  }

  .team-info h3 {
    font-size: 1rem;
    line-height: 1.2;
  }

  .team-role {
    font-size: 0.8rem;
    padding: 0.3rem 0.8rem;
  }

  .team-info p {
    font-size: 0.9rem;
  }
}
</style>
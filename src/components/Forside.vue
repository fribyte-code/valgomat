<script setup lang="ts">
import type { Statement } from "@/types";
import { ref } from "vue";
import Valgomat from "./Valgomat.vue";

defineProps<{
  statements: Statement[];
}>();

const hasStarted = ref(false);

function restart() {
  hasStarted.value = false;
}
</script>

<template>
  <section id="valgomat" v-if="!hasStarted">
    <h1 class="heading">Valgomat</h1>
    <p class="explainer-text">
      Lurer du på hva du skal stemme? Fortvil ikke! Vi har nemlig laget en
      valgomat som hjelper deg med å finne ut hva du skal stemme!
    </p>
    <button class="start-button" @click="hasStarted = true">Start</button>
  </section>
  <section id="valgomat" v-if="hasStarted">
    <Valgomat :statements="statements" :restart="restart" />
  </section>
</template>

<style scoped>
#valgomat {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: 900px;
  margin: auto;
  background-color: white;

  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.35);
}

.heading {
  margin-bottom: 2rem;
  font-weight: bold;
  font-size: 1.5rem;
}

.explainer-text {
  margin-bottom: 3rem;
  text-align: center;
  max-width: 30rem;
  font-size: 1.3rem;
}

.start-button {
  font-size: 1.3rem;
  padding: 0.5rem 1.2rem;
  background-color: white;
  border: solid 2px var(--color-background);
  border-radius: 1rem;
  color: #1c2833;
  font-weight: 300;
  /* box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.2); */
}
.start-button:hover {
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
  transition: all 100ms ease-in 0s;
  transform: scale(1);
}
</style>

<script setup lang="ts">
import type { Statement } from "@/types";
import { ref } from "vue";
import Valgomat from "./Valgomat.vue";

import studvestLogoSrc from "../assets/logos/studvestlogo.svg";
import friByteSrc from "../assets/logos/friByte.svg";
import spuibWhiteSrc from "../assets/logos/SPUIB_LOGO_MARK_WHITE.svg";

defineProps<{
  statements: Statement[];
}>();

const hasStarted = ref(false);

function restart() {
  hasStarted.value = false;
}
</script>

<template>
  <div class="wrapper">
    <section id="valgomat" v-if="!hasStarted">
      <h1 class="heading">Valgomat</h1>
      <p class="explainer-text">
        Lurer du på hva du skal stemme? Fortvil ikke! Vi har nemlig laget en
        valgomat som hjelper deg med å finne ut hva du skal stemme!
      </p>
      <button class="button" @click="hasStarted = true">Start</button>
    </section>
    <section id="valgomat" v-if="hasStarted">
      <Valgomat :statements="statements" @restart="restart" />
    </section>

    <footer class="footer">
      <p>Laget med kjærlighet av:</p>
      <p class="logos">
        <a href="https://studvest.no" target="_blank"
          ><img class="logo" :src="studvestLogoSrc" alt="Studvest"
        /></a>
        <a href="https://fribyte.no" target="_blank"
          ><img class="logo" :src="friByteSrc" alt="fribyte"
        /></a>
        <a href="https://www.spuib.no/" target="_blank"
          ><img class="logo" :src="spuibWhiteSrc" alt="Studentparlamentet"
        /></a>
      </p>
    </footer>
  </div>
</template>

<style scoped>
.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}
#valgomat {
  flex: 0;
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

.footer {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logos {
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.logo {
  height: 45px;
}
</style>

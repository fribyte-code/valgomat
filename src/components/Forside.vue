<script setup lang="ts">
import type { ValgomatData } from "@/types";
import { ref } from "vue";
import Valgomat from "./Valgomat.vue";

import studvestLogoSrc from "../assets/logos/studvestlogo.svg";
import friByteSrc from "../assets/logos/friByte.svg";
import spuibWhiteSrc from "../assets/logos/SPUIB_LOGO_MARK_WHITE.svg";
import spuibOrangeSrc from "../assets/logos/SPUIB_LOGO_MARK_ORANGE.svg";

defineProps<{
  valgomatData: ValgomatData;
  theme?: "studvest" | "oslomet" | string;
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
        Er du i tvil om hva du skal stemme? Test ut årets valgomat! Valgomaten
        er kun ment som en veileder. Det er ingen fasit på hva du bør stemme.
      </p>
      <br />
      <button class="button" @click="hasStarted = true">Start</button>
      <br />
      <p class="explainer-text p16" v-html="valgomatData.introTextHtml" />
    </section>
    <section v-if="hasStarted">
      <Valgomat :valgomatData="valgomatData" @restart="restart" />
    </section>

    <footer class="footer">
      <p>Laget av:</p>
      <p class="logos">
        <a href="https://studvest.no" target="_blank"
          ><img class="logo" :src="studvestLogoSrc" alt="Studvest"
        /></a>
        <a href="https://fribyte.no" target="_blank"
          ><img class="logo" :src="friByteSrc" alt="fribyte"
        /></a>
        <a href="https://www.spuib.no/" target="_blank"
          ><img
            class="logo"
            :src="theme == 'studvest' ? spuibOrangeSrc : spuibWhiteSrc"
            alt="Studentparlamentet"
        /></a>
      </p>
    </footer>
  </div>
</template>

<style scoped>
.wrapper {
  max-width: 1280px;
  margin: auto;
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

  padding: 10px;
  border-radius: 24px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.35);
}

.heading {
  margin-bottom: 32px;
  font-weight: bold;
  font-size: 24px;
}

.explainer-text {
  text-align: center;
  max-width: 99%;
  font-size: 18px;
}

.footer {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-text-secondary);
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

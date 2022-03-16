<script setup lang="ts">
import { ref } from "vue";
import StatementForm from "./StatementForm.vue";
import Resultat from "./Resultat.vue";
import type { Statement, StatementValue } from "@/types";
import studvestLogoSrc from "../assets/logos/studvestlogo.svg";
import friByteSrc from "../assets/logos/friByte.svg";
import spuibWhiteSrc from "../assets/logos/SPUIB_LOGO_MARK_WHITE.svg";

defineProps<{
  statements: Statement[];
}>();

const currentStatement = ref(0);
const userPositions = ref<{
  [statement: string]: { value: StatementValue };
}>({});

function handleStatementSubmit(
  statement: Statement,
  userPosition: StatementValue
) {
  userPositions.value[statement.statement] = { value: userPosition };
  currentStatement.value++;
}
</script>

<template>
  <section id="valgomat">
    <h1>Valgomat ({{ currentStatement + 1 }} / {{ statements.length }})</h1>
    <br />
    <StatementForm
      v-if="currentStatement < statements.length"
      :statement="statements[currentStatement]"
      @submit="handleStatementSubmit"
    />
    <Resultat
      v-if="currentStatement >= statements.length"
      :userPositions="userPositions"
      :statements="statements"
    />
    <br />
    <button @click="currentStatement = 0">Restart</button>
    <br />
    <p>Laget med kjærlighet av:</p>
    <p class="logos">
      <a href="https://studvest.no"
        ><img class="logo" :src="studvestLogoSrc" alt="Studvest"
      /></a>
      <a href="https://fribyte.no"
        ><img class="logo" :src="friByteSrc" alt="fribyte"
      /></a>
      <a href="https://www.spuib.no/"
        ><img class="logo" :src="spuibWhiteSrc" alt="Studentparlamentet"
      /></a>
    </p>
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
}
.logos {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.logo {
  height: 45px;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import StatementForm from "./StatementForm.vue";
import Resultat from "./Resultat.vue";
import type { Statement, StatementValue } from "@/types";

defineProps<{
  statements: Statement[];
  restart: () => void;
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
  <h1>Valgomat ({{ currentStatement + 1 }} / {{ statements.length }})</h1>
  <br />
  <StatementForm
    v-if="currentStatement < statements.length"
    :statement="statements[currentStatement]"
    @submit="handleStatementSubmit"
  />
  <Resultat :userPositions="userPositions" :statements="statements" />
  <br />
  <button
    @click="
      currentStatement = 0;
      restart();
    "
  >
    Restart
  </button>
  <br />
  <p>Laget med kjærlighet av <a href="https://fribyte.no">friByte.</a></p>
</template>

<style scoped></style>

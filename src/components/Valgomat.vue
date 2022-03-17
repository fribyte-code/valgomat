<script setup lang="ts">
import { ref } from "vue";
import StatementForm from "./StatementForm.vue";
import Resultat from "./Resultat.vue";
import type { Statement, StatementValue } from "@/types";

defineProps<{
  statements: Statement[];
}>();

defineEmits<{
  restart(): void;
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
  <h1 v-if="currentStatement < statements.length">
    Valgomat ({{ currentStatement + 1 }} / {{ statements.length }})
  </h1>
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
  <button
    class="restart-button button"
    @click="
      currentStatement = 0;
      $emit('restart');
    "
  >
    Restart
  </button>
  <br />
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
.restart-button {
  margin-top: 3rem;
  border: solid 1px rgb(53, 53, 53);
  font-weight: normal;
  font-size: 1rem;
}
.restart-button:hover,
.restart-button:active,
.restart-button:target {
  background-color: white;
  color: white;
  background-color: rgb(53, 53, 53);
}
</style>

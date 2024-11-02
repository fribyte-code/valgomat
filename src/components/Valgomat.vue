<script setup lang="ts">
import { ref } from "vue";
import StatementForm from "./StatementForm.vue";
import Resultat from "./Resultat.vue";
import type { Statement, StatementValue, ValgomatData } from "@/types";

defineProps<{
  valgomatData: ValgomatData;
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
  <div id="valgomat">
    <h1 v-if="currentStatement < valgomatData.statements.length">
      Valgomat ({{ currentStatement + 1 }} /
      {{ valgomatData.statements.length }})
    </h1>
    <br />
    <StatementForm
      v-if="currentStatement < valgomatData.statements.length"
      :statement="valgomatData.statements[currentStatement]"
      @submit="handleStatementSubmit"
    />
    <Resultat
      v-if="currentStatement >= valgomatData.statements.length"
      :userPositions="userPositions"
      :valgomatData="valgomatData"
    />
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
  </div>
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
  margin-top: 45px;
  border: solid 1px rgb(53, 53, 53);
  font-weight: normal;
  font-size: 16px;
}
.restart-button:hover,
.restart-button:active,
.restart-button:target {
  background-color: white;
  color: white;
  background-color: rgb(53, 53, 53);
}
</style>

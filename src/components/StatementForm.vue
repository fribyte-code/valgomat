<script setup lang="ts">
import { ref } from "vue";
import type { Statement, StatementValue } from "@/types";

defineProps<{
  statement: Statement;
}>();

defineEmits<{
  (e: "submit", statement: Statement, userPosition: StatementValue): void;
}>();

const userValue = ref<StatementValue>(0);
let options = {
  "Helt uenig": -2,
  "Litt Uenig": -1,
  "Litt enig": 1,
  "Helt Enig": 2,
};
</script>

<template>
  <form
    class="statement-form"
    @submit.prevent="$emit('submit', statement, userValue)"
  >
    <fieldset class="statement-options">
      <legend>{{ statement.statement }}</legend>
      <span class="radio-option" v-for="(val, option) in options" :key="option">
        <input
          type="radio"
          :value="val"
          :id="'alternative-' + val.toString()"
          v-model.number="userValue"
          name="agreement"
        />
        <label for="'alternative-' + val.toString()">{{ option }}</label>
      </span>
    </fieldset>
    <br />
    <button class="submit-btn" type="submit">Neste -></button>
  </form>
</template>

<style scoped>
.statement-form {
  display: flex;
  align-items: center;
  flex-direction: column;
}
p {
  font-size: 1rem;
  font-weight: bold;
}

.statement-options {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-width: 350px;
  padding: 2rem 0.8rem;
}
.statement-options legend {
  font-size: 1.5rem;
  font-weight: 500;
}

.radio-option {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.radio-option label {
  text-transform: uppercase;
  font-size: 1.1rem;
  text-align: center;
}
.radio-option input:checked + label {
  color: var(--color-heading);
}

.submit-btn {
  padding: 1rem 0.75rem;
  border-radius: 9999px;
  font-weight: bold;
  width: 10rem;
  font-size: 1.3rem;
}

input[type="radio"] {
  /* Add if not using autoprefixer */
  -webkit-appearance: none;
  /* Remove most all native input styles */
  appearance: none;
  /* For iOS < 15 */
  background-color: var(--color-background-mute);
  /* Not removed via appearance */
  margin: 0;

  font: inherit;
  color: currentColor;
  width: 1.9em;
  height: 1.9em;
  border: 0.15em solid currentColor;
  border-radius: 50%;
  transform: translateY(-0.075em);

  display: grid;
  place-content: center;
}

input[type="radio"]::before {
  content: "";
  width: 1em;
  height: 1em;
  border-radius: 50%;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1.25em 1.25em var(--color-heading);
  /* Windows High Contrast Mode */
  background-color: CanvasText;
}

input[type="radio"]:checked::before {
  transform: scale(1);
}

input[type="radio"]:focus {
  outline: max(2px, 0.15em) solid currentColor;
  outline-offset: max(2px, 0.15em);
}
</style>

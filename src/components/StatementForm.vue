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
const options = {
  "Helt uenig": -2,
  "Litt Uenig": -1,
  "Litt enig": 1,
  "Helt Enig": 2,
};
</script>

<template>
  <form
    class="statement-form"
    @submit.prevent="
      $emit('submit', statement, userValue);
      userValue = 0;
    "
  >
    <div class="statement-group">
      <legend class="statement-question">{{ statement.statement }}</legend>
      <span class="options">
        <span
          class="radio-option"
          v-for="(val, option) in options"
          :key="option"
        >
          <input
            type="radio"
            :value="val"
            :id="'alternative-' + val.toString()"
            v-model.number="userValue"
            name="agreement"
            required
          />
          <label :for="'alternative-' + val.toString()">{{ option }}</label>
        </span>
      </span>
    </div>
    <button class="submit-btn button" type="submit">Neste</button>
    <br />
    <p v-if="statement.description">
      <strong>Her er saken:</strong><br />
      {{ statement.description }}
    </p>
  </form>
</template>

<style scoped>
.statement-form {
  display: flex;
  align-items: center;
  flex-direction: column;
}

p {
  font-size: 19px;
  font-weight: 400;
  padding-left: 16px;
  padding-right: 16px;
}
p strong {
  font-weight: 900;
}

.statement-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-width: 350px;
  padding: 10px 8px;
}
.statement-group legend {
  float: left;
  font-size: 24px;
  font-weight: 500;
}
.statement-group .options {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 16px;
}
.statement-question {
  text-align: center;
}

.radio-option {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.radio-option label {
  text-transform: uppercase;
  font-size: 18px;
  text-align: center;
}
.radio-option input:checked + label {
  color: var(--color-heading);
}

.submit-btn {
  margin-top: 19px;
  padding: 12px 14px;
  border-radius: 9999px;
  font-weight: bold;
  width: 160px;
  font-size: 21px;
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
  border-radius: 24px;
  transform: translateY(-0.075em);

  display: grid;
  place-content: center;
}

input[type="radio"]::before {
  content: "";
  width: 1em;
  height: 1em;
  border-radius: 24px;
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

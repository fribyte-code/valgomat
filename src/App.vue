<script setup lang="ts">
import Valgomat from "./components/Valgomat.vue";
import statements2022 from "./data/2022-statements.json";
</script>

<template>
  <Valgomat :statements="statements2022" />
</template>

<style>
@import "./assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}
</style>

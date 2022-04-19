<script setup lang="ts">
import type { StatementValue, Statement } from "@/types";
import { distanceMap } from "@nrk/valg-valgomat-algoritme";
import { computed } from "vue";

export type Positions = {
  [party: string]: { value: StatementValue };
};

const props = defineProps<{
  statements: Statement[];
  userPositions: {
    [statement: string]: { value: StatementValue };
  };
}>();

const partyPositions = computed<{ [party: string]: Positions }>(() => {
  const out: { [party: string]: Positions } = {};
  for (const statement of props.statements) {
    for (const party in statement.parties) {
      if (!out[party]) {
        out[party] = {};
      }
      out[party][statement.statement] = {
        value: statement.parties[party],
      };
    }
  }
  return out;
});

const distances = computed<{ [party: string]: number }>(() => {
  return distanceMap(props.userPositions, partyPositions.value);
});

const orderedDistances = computed(() => {
  return Object.entries(distances.value).sort((a, b) => b[1] - a[1]);
});

const agreeMostWithParty = computed(() => orderedDistances.value[0][0]);
</script>

<template>
  <section id="valgomat-resultat">
    <h2>Resultat</h2>
    <p>
      Du er mest enig med <strong>{{ agreeMostWithParty }}</strong
      >. Les mer om dem og andre lister
      <a href="https://www.studvalg.no/" target="_blank">her.</a>
      <br />
      Husk at valgomaten bare er veiledende, og ikke en fasit for hva du burde
      stemme på.
    </p>
    <div v-for="[party, dist] of orderedDistances" :key="party">
      <span class="result-text">
        <p>
          <span class="result-label">{{ party }}</span>
          <span>{{ Math.round(dist * 100) }}%</span>
        </p>
      </span>
      <div class="aggreement-bar">
        <div class="percentage-bar" :style="{ width: dist * 100 + '%' }"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#valgomat-resultat {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  font-size: 20px;
}

.result-text p {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 20px;
}
.result-label {
  font-weight: 600;
}
.aggreement-bar {
  border-radius: 8px;
  width: 100%;
  height: 8px;
  background-color: rgba(209, 213, 219, 0.7);
  overflow: hidden;
}
.aggreement-bar .percentage-bar {
  height: 100%;
  background-color: #ff8c4b;
}
</style>

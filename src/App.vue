<template>
  <div id="app">
    <div>
      <MainInfoCard :repository="repo" />
    </div>
    <div class="repositories">
      <InfoCard
        v-for="repository in repositoriesData"
        :repository="repository"
        :key="repository.id"
        @updateRepoSelected="updateRepoSelected"
      />
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Emit, Vue } from 'vue-property-decorator';

import InfoCard from './components/InfoCard.vue';
import MainInfoCard from './components/MainInfoCard.vue';
import { IRepositoryType } from './prop-types/index';

@Component({
  components: {
    MainInfoCard,
    InfoCard,
  },
})
export default class App extends Vue {
  private repositoriesList: string[] = [
    'vuejs/vue',
    'facebook/react',
    'sveltejs/svelte',
    'angular/angular.js',
  ];
  private repositoriesData: IRepositoryType[] = [];
  private repo: IRepositoryType | object = {};

  private created(): void {
    this.getInfoRepos();
  }

  private getInfoRepos(): void {
    const promises = this.repositoriesList.map(async (repository) => (
      await axios.get(`https://api.github.com/repos/${repository}`)
    ));
    Promise.all(promises)
           .then((values) => {
             this.repositoriesData = values.map((p) => p.data);
             this.repo = this.repositoriesData[0];
           })
           .catch(() => []);

  }

  private updateRepoSelected(rep: IRepositoryType): void {
    this.repo = rep;
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div class="info-card">
    <div
      class="info-card__no-data"
      v-if="loading"
    >
      Loading data...
    </div>
    <div
      class="info-card__container"
      @click="updateRepoSelected"
      v-else-if="objectKeys > 0"
    >
      <div class="info-card__media">
        <img
          :src="repo.owner.avatar_url"
          :alt="repo.owner.login"
          class="info-card__image"
        />
      </div>
      <div class="info-card__information">
        <h3 class="info-card__title">
          {{repo.name}}
        </h3>
        <div class="info-card__details">
          <span class="info-card__starts">
            <i class="fa fa-star"></i>
            {{repo.stargazers_count}}
          </span>
          <span class="info-card__website">
            <i class="fa fa-mouse-pointer"></i>
            {{repo.homepage}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

import { IRepositoryType } from '../prop-types/index';

@Component
export default class InfoCard extends Vue {
  @Prop({default: {}}) private repository!: IRepositoryType;

  private repo: IRepositoryType | object = this.repository;
  private objectKeys: number = 0;
  private loading: boolean = true;

  private mounted(): void {
    this.objectKeys = Object.keys(this.repo).length;
    if (this.objectKeys > 0) {
      this.loading = false;
    }
  }

  @Emit('updateRepoSelected')
  private updateRepoSelected(): IRepositoryType | object {
    return this.repo;
  }
}
</script>

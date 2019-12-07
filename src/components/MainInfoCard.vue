<template>
  <div class="main-info-card">
    <div
      class="main-info-card__no-data"
      v-if="loading"
    >
      Loading data...
    </div>
    <div class="main-info-card__container" v-else-if="objectKeys > 0">
      <div class="main-info-card__media">
        <img
          :src="repo.owner.avatar_url"
          :alt="repo.owner.login"
          class="main-info-card__image"
        />
      </div>
      <div class="main-info-card__information">
        <h3 class="main-info-card__title">
          {{repo.name}}
        </h3>
        <span class="main-info-card__description">
          {{repo.description}}
        </span>
        <div class="main-info-card__details">
          <span class="main-info-card__starts">
            <i class="fa fa-star"></i>
            {{repo.stargazers_count}}
          </span>
          <span class="main-info-card__forks">
            <i class="fa fa-share-alt-square"></i>
            {{repo.forks}}
          </span>
          <span class="main-info-card__website">
            <i class="fa fa-mouse-pointer"></i>
            {{repo.homepage}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import { IRepositoryType } from '../prop-types/index';

@Component
export default class MainInfoCard extends Vue {
  @Prop({default: {}}) private repository!: IRepositoryType;

  private repo: IRepositoryType|object = this.repository;
  private objectKeys: number = 0;
  private loading: boolean = true;

  @Watch('repository')
  private updateRepository(): void {
    this.objectKeys = Object.keys(this.repository).length;
    this.repo = this.repository;
    this.loading = false;
  }
}
</script>

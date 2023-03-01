<template>
    <v-tabs v-model="tabStore.selectedTab" bg-color="secondary" show-arrows>
      <v-tab
        :class="getTabClass()"
        @click="setUrl(tabStore.persisentTab)"
        >{{ tabStore.persisentTab.title }}</v-tab
      >
      <v-tab
        :value="t.id"
        :class="getTabClass(t)"
        v-for="t in tabStore.openUrlTabs"
        :key="t.url"
        @click="setUrl(t)"
        >{{ t.title }}
        <v-btn
          v-on:click.stop
          icon="mdiClose"
          variant="plain"
          @click="tabStore.removeOrderTab(t.id)"
        ></v-btn
      ></v-tab>
    </v-tabs>
    <v-window v-model="tabStore.selectedTab">
      <v-window-item v-for="t in tabsToShow" :key="t.url">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive> </router-view
      ></v-window-item>
    </v-window>
  </template>
  <script setup lang="ts">
  import router from "@/router";
  import { computed } from "vue";
import { useUrlTabStore, type UrlTab } from "./tab-store";
  
  const tabStore = useUrlTabStore();
  
  const setUrl = (urlTab: UrlTab) => {
    router.push({
      name: urlTab.url,
      params: urlTab.params,
    });
  };
  
  const tabsToShow = computed(() => {
    const combined = [...tabStore.openUrlTabs];
    combined.unshift(tabStore.persisentTab);
    return combined;
  });
  
  const getTabClass = (t?: UrlTab) => {
    if (!t && tabStore.selectedTab == 0) {
      return "activeTab";
    }
    if (t) {
      const foundTabIdx = tabStore.openUrlTabs.findIndex(
        (tab) => tab.id == t?.id
      );
      if (foundTabIdx === tabStore.selectedTab - 1) {
        return "pr-0 mr-0 activeTab";
      }
      return "pr-0 mr-0";
    }
    return "";
  };
  </script>
  <style scoped >
  .activeTab {
    background-color: rgb(var(--v-theme-secondary-light-800));
  }
  </style>
  
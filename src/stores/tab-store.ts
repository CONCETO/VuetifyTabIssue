import router from "@/router/index";
import _ from "lodash";
import { defineStore } from "pinia";
import type { RouteParamsRaw } from "vue-router";
export interface UrlTab {
  url: string;
  title: string;
  params?: RouteParamsRaw;
  id: number;
}

export const useUrlTabStore = defineStore({
  id: "urlTabStore",
  state: () => ({
    persisentTab: {
      url: "home",
      title: "Home",
    } as UrlTab,
    openUrlTabs: [] as UrlTab[],
    selectedTab: 0 as number,
  }),
  actions: {
    changePersistentTab(newTab: UrlTab) {
      const isAlreadyTab = this.persisentTab.url === newTab.url;
      if (!isAlreadyTab) {
        this.persisentTab = newTab;
      }
      this.selectedTab = 0;
    },
    async addOrderTab(newTabId: number) {
      const newUrlTab: UrlTab = {
        url: "detail",
        title: String(Math.random() * 1000),
        params: { id: newTabId },
        id: newTabId,
      };

      const foundTabIndex = this.openUrlTabs.findIndex(
        (t) => t.url == newUrlTab.url && _.isEqual(t.params, newUrlTab.params)
      );
      if (foundTabIndex != -1) {
        this.selectedTab = foundTabIndex + 1;
      } else {
        this.openUrlTabs.push(newUrlTab);
        this.selectedTab = this.openUrlTabs.length;
      }
    },
    setSelectedTab(newIndex: number) {
      this.selectedTab = newIndex;
    },
    removeOrderTab(tabId: number | undefined) {
      //Check === undefined bc otherwise 0 will also cause a return
      if (tabId === undefined) {
        return;
      }
      const deletedTabIndex = this.openUrlTabs.findIndex(
        (t) => t.id == tabId
      );

      const selectedTabAsArrayIndex = this.selectedTab - 1;

      this.openUrlTabs = this.openUrlTabs.filter(
        (t) =>
          !(t.url == "detail" && t.id == tabId)
      );

      let tabToOpen = this.persisentTab;

      if (selectedTabAsArrayIndex < deletedTabIndex) {
        return;
      }
      if (selectedTabAsArrayIndex == deletedTabIndex) {
        if (deletedTabIndex == 0) {
          tabToOpen = this.persisentTab;
        } else {
          tabToOpen = this.openUrlTabs[deletedTabIndex - 1];
        }
      } else if (selectedTabAsArrayIndex > deletedTabIndex) {
        tabToOpen = this.openUrlTabs[selectedTabAsArrayIndex - 1];
        this.selectedTab = this.selectedTab - 1;
      }
      router.push({
        name: tabToOpen.url,
        params: tabToOpen.params,
      });
    },
  },
});

<template>
    <detail-component />
  </template>

<script setup lang="ts">
import router from "@/router/index";
import { onMounted } from "vue";
import DetailComponent from "../components/DetailComponent.vue"

onMounted(() => 
{
    console.log("Mounting Detail Component " + router.currentRoute.value.params.id)
})
</script>
  
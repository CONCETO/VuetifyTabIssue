<template>
  <v-btn @click="goToDetailView(1)">GO DETAIL VIEW 1</v-btn>
  <br/>
  <v-btn @click="goToDetailView(2)">GO DETAIL VIEW 2</v-btn>
</template>

<script setup lang='ts'>
import router from "@/router/index";
import { onMounted } from "vue";

onMounted(() => {
  console.log("Mounting Home View")
})

 const goToDetailView= (id:number) =>
 {
  router.push({
    name: "detail",
    params: {id: id}
  })
 }
</script>

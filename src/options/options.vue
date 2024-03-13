<template>
  <div class="main_app bg-indigo-500">
    <h1>Hello from options</h1>
    <input type="text" v-model="name" />
    <button @click="saveName">Save Name</button>
  </div>
</template>

<script setup>
  import { onMounted, ref } from "vue";

  const name = ref();
  const saveName = () => {
    chrome.storage.sync.set({
      name: name.value,
    });
  };
  onMounted(() => {
    chrome.storage.sync.get(["name"], (res) => {
      name.value = res.name ?? "Guest";
    });
  });
</script>

<style></style>

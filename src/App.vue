<template>
  <cargando v-if="loading" />
  <div v-else>
    <navbar />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Cargando from "./components/Cargando.vue";
import { firebase } from "./firebase";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
export default {
  components: {
    Navbar,
    Cargando,
  },

  setup() {
    const loading = ref(false);

    onMounted(async () => {
      loading.value = true;
      await firebase.getCurrentUser();
      loading.value = false;
    });

    {
      return { loading };
    }
  },
};
</script>

<style></style>

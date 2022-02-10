<template>
<div v-if="isAuthenticated">
  <h1>Perfil</h1>
  <h2>{{ user.displayName }}</h2>
  <img :src="user.photoURL" alt="" />
  <pre>{{ user }}</pre>
</div>
<div v-else>
  <p>Usuario no autenticado.</p>
</div>
</template>

<script>
import { useAuth } from "@vueuse/firebase";
export default {
  name: "Perfil.vue",

  setup() {
    const { user, isAuthenticated } = useAuth();

    return { user, isAuthenticated };
  },
};
</script>

<style scoped></style>

<template>
  <div v-if="isAuthenticated">
    <h1>Crud</h1>
    <Cargando v-if="cargando" />
    <div v-else>
      <pre>{{ todos }}</pre>
    </div>
  </div>
</template>

<script>
import { useAuth } from "@vueuse/firebase";
import { useDB } from "../../composables/useDB";
import Cargando from "../components/Cargando.vue";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
export default {
  name: "Crud.vue",

  components: {
    Cargando,
  },

  setup() {
    const { isAuthenticated } = useAuth();
    const { getTodos, cargando } = useDB();
    const todos = ref([]);

    onMounted(async () => {
      todos.value = await getTodos();
      if (todos.value.res) {
        console.log(todos.value.error);
      }
    });

    return { isAuthenticated, todos, cargando };
  },
};
</script>

<style scoped></style>

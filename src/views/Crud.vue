<template>
  <div v-if="isAuthenticated">
    <h1>Crud</h1>
    <Cargando v-if="cargando"/>
    <div v-else>
      <Error v-if="pintarError"/>
      <todo-form/>
      <todo v-for="todo in todos" :key="todo.id" :todo="todo"/>
        <p v-if="todos.length === 0">
            Sin todos
        </p>
    </div>
  </div>
</template>

<script>
import {useAuth} from "@vueuse/firebase";
import {useDB} from "../composables/useDB";
import {ref, provide, computed, onMounted} from "vue";
import Cargando from "../components/Cargando.vue";
import Error from "../components/Error";
import todoForm from "../components/TodoForm";
import todo from "@/components/Todo";

export default {
  name: "Crud.vue",

  components: {
    Cargando, Error, todoForm, todo
  },

  setup() {
    const {isAuthenticated} = useAuth();
    const {getTodos, cargando} = useDB();
    const todos = ref([]);
    const error = ref(null)

    provide('error', error)
    provide('todos', todos)

    const pintarError = computed(() => {
      return error.value ? true : false;
    })

    onMounted(async () => {
      todos.value = await getTodos();
      if (todos.value.res) {
        error.value = todos.value.error;
      }
    });

    return {isAuthenticated, todos, cargando, pintarError};
  },
};
</script>

<style scoped></style>

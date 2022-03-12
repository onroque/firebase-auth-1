<template>
  <form @submit.prevent="procesarFormulario">
    <input
        v-model.trim="texto"
        class="form-control my-3"
        placeholder="Enter para agregar todo"
        type="text"
    >
  </form>
</template>

<script>

import {useDB} from "../composables/useDB";
import {inject, ref} from "vue";

export default {
  name: "TodoForm.vue",

  setup() {
    const {agregarTodo} = useDB();

    const texto = ref('');

    const todos = inject('todos');

    const error = inject('error');

    const procesarFormulario = async () => {
      if (!texto.value.trim()) {
        return;
      }

      const todo = await agregarTodo(texto.value);

      if (todo.res) {
        error.value = todo.error;
        texto.value = '';
        return;
      }

      todos.value = [...todos.value, todo];

      texto.value = '';


    };

    return {texto, procesarFormulario};
  }
};
</script>

<style scoped>

</style>
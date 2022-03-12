<template>
  <div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>Ocurrió un error:</strong> {{ error }}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
            @click="error = null"
    ></button>
  </div>
</template>

<script>
import {inject} from "vue";

export default {
  name: "Error.vue",

  setup() {
    const error = inject('error');

    return {error}
  }
}
</script>

<style scoped>

</style>
<template>
    <div class="card shadow-sm mb-2">
        <div class="card-body d-flex justify-content-between align-items-center">
            <p
                :class="{'text-decoration-line-through' : todo.estado}"
                class="m-0"
            >{{ todo.texto }}</p>
            <div class="mt-2 d-flex align-items-center">
                <button
                    :class="todo.estado ? 'btn-success' : 'btn-warning'"
                    :disabled="bloquear"
                    class="btn me-1"
                    @click="modificarTarea(todo)"
                >{{ todo.estado ? 'Pendiente' : 'Finalizar' }}
                </button>
                <button
                    :disabled="bloquear"
                    class="btn btn-danger"
                    @click="eliminarTarea(todo.id)"
                >Eliminar
                </button>
            </div>
        </div>
    </div>
</template>

<script>

import {useDB} from "../composables/useDB";
import {inject, ref} from "vue";

export default {
    name: "Todo",

    props: {todo: Object},

    setup() {

        const {eliminarTodo, modificarTodo} = useDB();
        const error = inject('error');
        const todos = inject('todos');
        const bloquear = ref(false);

        const eliminarTarea = async (id) => {
            bloquear.value = true;
            const respuesta = await eliminarTodo(id);

            if (respuesta.res) {
                error.value = respuesta.error;
                bloquear.value = false;
                return;
            }

            todos.value = todos.value.filter(item => item.id !== id);
            bloquear.value = false;

        };

        const modificarTarea = async (todo) => {
            bloquear.value = true;
            const respuesta = await modificarTodo(todo);

            if (respuesta.res) {
                error.value = respuesta.error;
                bloquear.value = false;
                return;
            }

            todos.value = todos.value.map((item) => (
                item.id === todo.id ? {...item, estado: !todo.estado} : item
            ));
            bloquear.value = false;
        };


        return {eliminarTarea, modificarTarea, bloquear};
    }
};
</script>

<style scoped>

</style>
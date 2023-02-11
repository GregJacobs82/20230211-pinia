<script setup>
import { useTaskStore } from '@/stores/TaskStore';
const taskStore = useTaskStore();





import { ref } from 'vue';
const newTask = ref('');
const handleSubmit = () => {
    if (newTask.value.length > 0) {
        taskStore.addTask({
            title: newTask.value,
            isFav: false,
            id: taskStore.totalCount + 1,
        });
        newTask.value = '';
    }
}


</script>

<template>
    <div>
        <h1>Home</h1>
        <div>Name: {{ taskStore.name }}</div>
        <hr style="margin-top:30px;margin-bottom:30px;">
        <div>
            <h2>{{ taskStore.totalCount }} Tasks</h2>
            <div>
                <ul>
                    <li v-for="task in taskStore.tasks" :key="task.id">
                        <button @click="taskStore.toggleFav(task.id)">fav</button> |
                        <button @click="taskStore.deleteTask(task.id)">del</button> -
                        {{ task.title }}
                    </li>
                </ul>
            </div>
        </div>
        <hr style="margin-top:30px;margin-bottom:30px;">
        <div>
            <h2>{{ taskStore.favCount }} Favorite Tasks</h2>
            <div>
                <ul>
                    <li v-for="fav in taskStore.favs" :key="fav.id">
                        {{fav.id}}. {{ fav.title }}
                    </li>
                </ul>
            </div>
        </div>
        <hr style="margin-top:30px;margin-bottom:30px;">
        <div>
            <h2>Add a Task</h2>
            <form @submit.prevent="handleSubmit">
                <input v-model="newTask" type="text" placeholder="New Task...">
                <button>Add</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>

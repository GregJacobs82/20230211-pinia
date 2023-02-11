import {defineStore} from 'pinia';
const taskApi = 'http://localhost:3002/tasks';

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        loading: false,
        tasks: [],
        name: 'Greg Jacobs',
    }),

    getters: {
        favs() {
            return this.tasks.filter(t => t.isFav);
        },

        favCount() {
            return this.tasks.reduce( (p,c) => {
                return c.isFav ? p+1 : p;
            }, 0);
        },

        totalCount: (state) => {
            return state.tasks.length;
        }
    },

    actions: {
        async fetchTaskData() {
            this.loading = true;

            const res = await fetch(taskApi);
            this.tasks = await res.json();

            // todo: remove timeout if you don't want to simulate loading data
            setTimeout(() => {
                this.loading = false;
            }, 1000);
        },

        async addTask(task) {
            this.tasks.push(task);

            const res = await fetch(taskApi, {
                method: 'POST',
                body: JSON.stringify(task),
                headers: {'Content-Type': 'application/json'}
            });

            if (res.error) {
                console.error(res.error);
            }
        },
        deleteTask(id) {
            this.tasks = this.tasks.filter(t => {
                return t.id !== id;
            });
        },
        toggleFav(id) {
            const task = this.tasks.find(t => t.id === id);
            task.isFav = !task.isFav;
        },
    },
});

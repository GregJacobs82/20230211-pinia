import {defineStore} from 'pinia';

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

            const res = await fetch('http://localhost:3002/tasks');
            this.tasks = await res.json();

            // todo: remove timeout if you don't want to simulate loading data
            setTimeout(() => {
                this.loading = false;
            }, 2000);
        },

        addTask(task) {
            this.tasks.push(task);
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

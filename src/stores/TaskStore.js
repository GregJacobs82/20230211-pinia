import { defineStore } from 'pinia';

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [
            { id: 1, title: 'buy some milk', isFav: false },
            { id: 2, title: 'play gloomhaven', isFav: true },
            { id: 3, title: 'go to costco', isFav: false },
            { id: 4, title: 'buy some roses for valentines day', isFav: true },
        ],

        name: 'Yoshi',
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
        addTask(task) {
            this.tasks.push(task);
        },
    },
});

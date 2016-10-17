Vue.component('todo', {
	data: function() {
		return {
			isHidden: false
		}
	},
	props: ['todo','index','witch'],
	template: '<div :class="{done: todo.done, hide: this.isHidden}"><div class="done-icon" @click="toggleDone">✔</div><div class="todo-content" @dblclick="showChangeInput">{{todo.content}}</div><div class="del" @click="delTodos">x</div><div class="change-input-area"><input type="text" class="change-input" v-model="todo.content" @blur="hideChangeInput" @keydown.enter="hideChangeInput"/></div></div>',
	methods: {
		toggleDone () {
			this.todo.done = !this.todo.done;
			this.$emit('save');
		},
		delTodos (index) {
			this.$emit('del', this.index);
		},
		showChangeInput (e) {
			var input = this.$el.querySelector('.change-input-area');
			input.style.visibility = 'visible';
			input.querySelector('input').focus();
		},
		hideChangeInput (e) {
			e.currentTarget.parentNode.style.visibility = 'hidden';
			if (this.todo.content.trim() === '') {
				this.$emit('del', this.index);
				return;
			}		
			this.$emit('save');
		},
		toShow (e,r) {
			console.log(e + r)
		}
	},
	watch: {
		witch: function() {
			if (this.witch === 'all') {
				this.isHidden = false;
			} else if (this.witch === 'active' && this.todo.done === false) {
				this.isHidden = false;
			} else if (this.witch === 'done' && this.todo.done === true) {
				this.isHidden = false;
			} else {
				this.isHidden = true;
			}
		}
	}
})



var app = new Vue({
	el: '#app',
	data: function() {
		return {
			todos: localStorage.todos ? JSON.parse(localStorage.todos) : [],
			witch: 'all',
			all: true,
			active: false,
			done: false,
			hideAll: false
		}
	},
	computed: {
		left: function() {
			let n = 0;
			this.todos.forEach(function(item, index){
				if (item.done === false) {
					n++;
				}
			})
			return n;
		}
	},
	methods: {
		saveTodos () {
			localStorage.todos = JSON.stringify(this.todos);
		},
		addTodos (e) {
			if (e.currentTarget.value.trim() !== '') {
				this.todos.push({
					content: e.currentTarget.value.trim(),
					done: false
				})
				e.currentTarget.value = '';
				this.saveTodos();
			}
		},
		hideTodos () {
			this.hideAll = !this.hideAll;
		},
		delTodos (index) {
			this.todos.splice(index,1);
			this.saveTodos();
		},
		setStatusFalse () {
			this.active = false;
			this.done = false;
			this.all = false;
		},
		showAll () {
			this.witch = 'all';
			this.setStatusFalse();
			this.all = true;
		},
		showActive () {
			this.witch = 'active';
			this.setStatusFalse();
			this.active = true;
		},
		showDone () {
			this.witch = 'done';
			this.setStatusFalse();
			this.done = true;
		}
	}
})
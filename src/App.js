import './App.css';
import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import TodoList from "./components/TodoList.js";
import Todo from "./components/Todo.js";
import Theme from "./components/Theme.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: "",

    };

  }

  handleInputChange = (event) => {
    this.setState({ newTodo: event.target.value });
  };

  addTodo = (event) => {
    event.preventDefault();
    const { newTodo, todos } = this.state;
    if (newTodo.trim()) {
      this.setState({
        todos: [...todos, { id: Date.now(), text: newTodo, done: false }],
        newTodo: "",
      });
    }
  };

  toggleTodo = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      ),
    });
  };

  toggleAllTodo = () => {
    const allCompletedTodos = this.state.todos.every((todo) => todo.done);
    if (allCompletedTodos) {
      this.setState({
        todos: this.state.todos.map((todo) => ({ ...todo, done: false })),
      });
    } else {
      this.setState({
        todos: this.state.todos.map((todo) => ({ ...todo, done: true })),
      });
    }
  };

  removeTodo = (id) => {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id),
    });
  };

  removeCompletedTodos = () => {
    this.setState({
      todos: this.state.todos.filter((todo) => !todo.done),
    });
  };

  countIncompleteTodos = () => {
    return this.state.todos.filter((todo) => !todo.done).length;
  };


  handleFilterChange = (filter) => {
    this.setState({ selectedFilter: filter });
  };


  render() {
    return (
      <div className="app-content">

        <Header />
        <section className="section-container">
          <Todo
            newTodo={this.state.newTodo}
            handleInputChange={this.handleInputChange}
            addTodo={this.addTodo}
            toggleAllTodo={this.toggleAllTodo}
          />
          <TodoList
            todos={this.state.todos}
            toggleTodo={this.toggleTodo}
            removeTodo={this.removeTodo}
            selectedFilter={this.state.selectedFilter}
          />
          <Footer
            count={this.countIncompleteTodos()}
            removeCompletedTodos={this.removeCompletedTodos}
            selectedFilter={this.state.selectedFilter}
          />
          <Theme
            toggleTheme={this.toggleTheme}
          />
        </section>
      </div>

    );
  }
}

export default App;



import './App.css';
import React, { Component, createRef } from "react";
import { ThemeContext } from "./ThemeContext.js";
import { FILTER } from "./constant/constant";
import "./App.css";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import TodoList from "./components/TodoList.js";
import Todo from "./components/Todo.js";
import Theme from "./components/Theme.js";
import Pagination from "./components/Pagination.js";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      selectedFilter: FILTER.ALL,
      isEditInput: false,
      idEdit: null,
      currentPage: 1,
      todosPerPage: 5,
    };
    this.inputRef = createRef();
  }

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

  handleInputChange = (event) => {
    this.setState({ newTodo: event.target.value });
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

  updateTodo = (id, newText) => {
    this.setState({
      todos: this.state.todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      ),
    });
  };

  handleFilterChange = (filter) => {
    this.setState({ selectedFilter: filter });
  };

  updateInput = (todo) => {
    this.setState({ isEditInput: true, idEdit: todo.id });
    this.inputRef.current.value = todo.text;
  };

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  render() {
    const {
      todos,
      selectedFilter,
      isEditInput,
      idEdit,
      todosPerPage,
      currentPage,
    } = this.state;

    const { theme } = this.context;

    const lastTodoIndex = currentPage * todosPerPage;
    const firstTodoIndex = lastTodoIndex - todosPerPage;
    const currentTodos = todos.slice(firstTodoIndex, lastTodoIndex);
    return (
      <div className={`app-context ${theme}`}>
        <Theme />
        <Header />
        <section className="section-container">
          <Todo
            todos={todos}
            inputRef={this.inputRef}
            handleInputChange={this.handleInputChange}
            addTodo={this.addTodo}
            toggleAllTodo={this.toggleAllTodo}
            isEditInput={isEditInput}
            idEdit={idEdit}
            updateTodo={this.updateTodo}
          />
          <TodoList
            todos={currentTodos}
            toggleTodo={this.toggleTodo}
            removeTodo={this.removeTodo}
            updateTodo={this.updateTodo}
            selectedFilter={selectedFilter}
            updateInput={this.updateInput}

          />
          <Pagination
            todos={todos}
            todosPerPage={todosPerPage}
            currentPage={currentPage}
            handlePageChange={this.handlePageChange}
          />
          <Footer
            count={this.countIncompleteTodos()}
            removeCompletedTodos={this.removeCompletedTodos}
            selectedFilter={selectedFilter}
            handleFilterChange={this.handleFilterChange}
          />

        </section>
      </div>

    );
  }
}

App.contextTypes = ThemeContext;

export default App;



import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  tasks: { text: string; editing: boolean }[] = [];
  newTask = '';

  addTask() {
    const text = this.newTask.trim();
    if (!text) return;
    this.tasks.push({ text, editing: false });
    this.newTask = '';
  }

  deleteTask(i: number) {
    this.tasks.splice(i, 1);
  }

  editTask(i: number) {
    this.tasks[i].editing = true;
  }

  saveTask(i: number) {
    this.tasks[i].editing = false;
  }
}

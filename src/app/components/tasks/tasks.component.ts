import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task} from 'src/app/models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  searchText= '';
  showForm=false;
  editForm = false;
  myTask: Task = {
    label: '',
    completed: false
  }

  task : Task[] = [];
  resulttask : Task[] = [];
  constructor(private taskService : TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(){
    this.taskService.findAll()
    .subscribe(tasks => 
     this.resulttask= this.task = tasks)
 
  }
  deleteTask(id: any){
this.taskService.delete(id)
.subscribe(()=>{
  this.task=this.task.filter(task=>task.id!=id)
})
}

persistTask(){
  this.taskService.persist(this.myTask).subscribe(
    (task) => {
      this.task = [task , ...this.task];
      this.resetTask();
      this.showForm=false;

  })
}
resetTask(){
  this.myTask={
    label : '',
    completed: false
  }
}
toggleCompleted(task: any){
  this.taskService.completed(task.id, task.completed).subscribe(
    ()=>{
      task.completed= !task.completed
    })
}
editTask(task: Task){
  this.myTask =task;
  this.editForm=true;

}
updateTask(){
  this.taskService.update(this.myTask).subscribe(
    (task) =>{
      this.resetTask();
      this.editForm=false;
    })
}
searchTasks(){
  this.resulttask =this.task.filter((task)=>task.label.toLowerCase().includes(this.searchText.toLowerCase()))
}
}

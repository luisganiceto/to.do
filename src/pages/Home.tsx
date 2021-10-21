import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

interface NewTask {
  id : number;
  title : string;
  done : boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<NewTask[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    if (tasks.find(task => task.title === newTaskTitle) !== undefined) {
      Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome'
      )
    } else {
      setTasks(oldState => [...oldState, data] );
    }
    console.log(tasks);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));
        
    updatedTasks.filter(
      x => {
        if (x.id === id) {
          x.done ? x.done = false : x.done = true;
          return x;
        }
      }
    );
    
    setTasks(updatedTasks);

    console.log(tasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover Item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: "Não",
          style: "cancel"
        },
        { 
          text: "Sim",
          onPress: () => setTasks(oldState => oldState.filter(task => task.id !== id)) 
        }
      ]
    )
    console.log(tasks);
  }

  function handleEditTaks(taskId : number, taskNewTitle: string){
    const updatedTasks = tasks.map(task => ({ ...task }));
      
    updatedTasks.filter(
      x => {
        if (x.id === taskId) {
          x.title = taskNewTitle;
          return x;
        }
      }
    );
    
    setTasks(updatedTasks);
    console.log(tasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTaks} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})
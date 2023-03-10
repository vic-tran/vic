import useSWR from 'swr';
import './App.css'
import { Box, List, ThemeIcon } from '@mantine/core'
import AddTodo from './components/AddTodo'
import { CheckCircleFillIcon } from '@primer/octicons-react';

export interface Todo {
  id: number;
  title: string;
  body: string;
  done: boolean;

}

export const ENDPOINT = 'http://localhost:4000'

const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`)
    .then((r) => {
      if (!r.ok) {
        throw new Error(`Failed to fetch ${url}: ${r.statusText}`);
      }
      return r.json();
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
    
function App () {
  const { data, mutate } = useSWR<Todo[]>("api/todos", fetcher);

  async function markTodoAsDone(id: number){
    const updated = await fetch (`${ENDPOINT}/api/todos/${id}/done`, {
      method: "PATCH",
    }).then((r) => r.json());

    mutate(updated);
  }

  return (
   <Box
    sx= {(theme) => ({
      padding: "2rem",
      width: "100%",
      maxWidth: "40rem",
      margin: "0 auto",
    })}
   >

    <List spacing = "xs" size ="sm" mb={12} center>
      {data?.map((todo) => {
        return ( 
        <List.Item 
        onClick={() => markTodoAsDone(todo.id)}
        key={`todo_list__${todo.id}`}
        icon = {
          todo.done ? (
          <ThemeIcon color = "teal" size={24} radius="xl">
            <CheckCircleFillIcon size={20}/>
          </ThemeIcon>
          ) : (
            <ThemeIcon color = "gray" size={24} radius="xl">
            <CheckCircleFillIcon size={20}/>
          </ThemeIcon> 
          )
         }
        >
          {todo.title}
          </List.Item>
          );
      })}
    </List>
      <AddTodo mutate={mutate}/>
   </Box>
  )
}

export default App;

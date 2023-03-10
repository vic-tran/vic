import useSWR from 'swr';
import './App.css'
import { Box } from '@mantine/core'

export const ENDPOINT = 'http://localhost:4000'

const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

function App () {

  return (
   <Box>
      Hello World
   </Box>
  )
}

export default App

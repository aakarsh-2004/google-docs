import { 
  BrowserRouter, 
  Route, 
  Routes, 
  Navigate 
} from 'react-router-dom'
import './App.css'
import TextEditor from './components/TextEditor'
import { v4 as uuidV4 } from 'uuid'


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to={`/documents/${uuidV4()}`} />} />
          <Route path='/documents/:id' element={<TextEditor />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

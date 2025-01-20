import Form from "./Components/Form"
import Admin from "./Components/Admin"
import Dashboard from "./Components/Dashboard"
import { BrowserRouter as Router , Routes , Route } from "react-router-dom"
import {ToastContainer} from 'react-toastify'
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Form/>}/>
          <Route path="/Admin" element={<Admin/>}/>
          <Route path="/Dashboard" element={<Dashboard/>}/>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
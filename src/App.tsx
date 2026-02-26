import { ReactFlowProvider } from 'reactflow'
import FlowBuilder from './components/FlowBuilder'
import 'reactflow/dist/style.css'
import './index.css'

function App() {
  return (
    <div className="App">
      <ReactFlowProvider>
        <FlowBuilder />
      </ReactFlowProvider>
    </div>
  )
}

export default App

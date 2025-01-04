import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import  Submit  from './submit';
import { useStore } from './store';

function App() {
  const nodes = useStore((state)=>state.nodes);
  const edges = useStore((state)=>state.edges);
  return (
    <div style={{backgroundColor:'rgb(136, 0, 255)', height:'100vh'}}>
      <PipelineToolbar />
      <PipelineUI />
      <Submit nodes={nodes} edges={edges} />
    </div>
  );
}

export default App;

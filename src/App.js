import './App.css';
import {
  RecoilRoot
} from 'recoil';
import Workspace from './Components/Workspace/Workspace';

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <Workspace />
      </div>
    </RecoilRoot>
  );
}

export default App;

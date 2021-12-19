import {MegaState} from './undo/MegaState';
import {UndoContext} from "./undo/UndoContext";

function App() {
  return (
    <UndoContext>
      <MegaState/>
    </UndoContext>
  );
}

export default App;

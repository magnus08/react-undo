# React Undo

Simple react app with infinite undo/redo.

Implemented as a context UndoContext.

Check file "undo/Megastate.js" for an example on how this 
can be used in a useReducer container component to queue up do/undo
operations. The actual undo/redo calls are done in "undo/ActivityContainer.js".

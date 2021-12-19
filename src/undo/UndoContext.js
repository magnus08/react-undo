import React, {useState} from 'react';

export const UndoCtx = React.createContext({});

/**
 * This context implements undo/redo queue.
 *
 * Use the
 *
 */
export const UndoContext = ({children}) => {
  const [undoQueue, setUndoQueue] = useState([]);
  const [redoQueue, setRedoQueue] = useState([]);
  const value = {

    /**
     * Execute the ".do()" function and add ops as an undoable operation.
     * @param ops with do and undo functions.
     */
    execute: (ops) => {
      console.log("Do!");
      ops.do();
      setUndoQueue([ops, ...undoQueue]);
    },

    /**
     * Pick next operation from the undo queue, call the .undo() function and move the operation to redo queue.
     */
    undo: () => {
      const ops = undoQueue[0];
      ops.undo();
      console.log("Undo! Ops = ", ops);

      setRedoQueue([ops, ...redoQueue])
      setUndoQueue(undoQueue.slice(1));
    },

    /**
     * Pick next operation from the redo queue, call the .do() function and move the operation to undo queue.
     */
    redo: () => {
      console.log("Redo!");
      const ops = redoQueue[0];
      ops.do();
      setUndoQueue([ops, ...undoQueue])
      setRedoQueue(redoQueue.slice(1));
    },

    /**
     * Clear undo/redo queue. Use when underlying data changes.
     */
    clear: () => {
      setUndoQueue([]);
      setRedoQueue([]);
    },
    /**
     * Is there anything that can be undone?
     */

    isUndoable: undoQueue.length,

    /**
     * Is there anything that can be redone?
     */
    isRedoable: redoQueue.length,

    /**
     * Not implemented yet: Allow multiple operations to be done/undone as one block.
     */
    open: () => console.log("Open undo"),

    /**
     * Not implemented yet: Allow multiple operations to be done/undone as one block.
     */
    close: () => console.log("Close undo"),
  };
  return <UndoCtx.Provider value={value}>{children}</UndoCtx.Provider>;
};

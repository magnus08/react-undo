import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

export const UndoCtx = React.createContext({});

/**
 * This context implements undo/redo queue.
 *
 */
export const UndoContext = ({children}) => {
  const [undoQueue, setUndoQueue] = useState([]);
  const [redoQueue, setRedoQueue] = useState([]);
  let multi = null;
  const navigate = useNavigate();

  function nav(ops) {
    if (ops.path) {
      navigate(ops.path);
    }
  }

  const value = {

    /**
     * Execute the ".do()" function and add ops as an undoable operation.
     * @param ops with do and undo functions.
     */
    execute: (ops) => {
      ops.do();
      if(multi) {
        multi.unshift(ops)
        // setUndoQueue([ops, ...undoQueue[0]], undoQueue.splice(1))
      } else {
        setUndoQueue([[ops], ...undoQueue]);
      }
      setRedoQueue([])
    },

    /**
     * Pick next operation from the undo queue, call the .undo() function and move the operation to redo queue.
     */
    undo: () => {
      const opss = undoQueue[0];
      opss.forEach(ops => {ops.undo(); nav(ops)});

      setRedoQueue([opss, ...redoQueue])
      setUndoQueue(undoQueue.slice(1));
    },

    /**
     * Pick next operation from the redo queue, call the .do() function and move the operation to undo queue.
     */
    redo: () => {
      const opss = redoQueue[0];
      opss.reverse().forEach(ops => {ops.do(); nav(ops)});
      setUndoQueue([opss, ...undoQueue])
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
     * Opens a grouping of a number of operations into one undo.
     *
     * Warning: Calling consecutive operations must not be done asynchronously or this will break
     */
    openMulti: () => {
      multi = [];
    },

    /**
     * Closes the grouping.
     */
    closeMulti: () => {
      setUndoQueue([multi, ...undoQueue]);
      multi = null;
    },
  };
  return <UndoCtx.Provider value={value}>{children}</UndoCtx.Provider>;
};

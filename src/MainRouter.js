import React from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import {MegaState} from "./undo/MegaState";
import {UndoContext} from "./undo/UndoContext";

export function MainRouter() {
  return (
      <BrowserRouter>
        <UndoContext>
        <Routes>
          <Route path="/activity/*" element={<MegaState/>} />
          <Route
            path="*"
            element={<Navigate to="/activity" />}
          />
        </Routes>
        </UndoContext>
      </BrowserRouter>
  );
}

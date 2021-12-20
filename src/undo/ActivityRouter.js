import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {App} from '../App';
import {ActivityContainer} from "./ActivityContainer";

export function ActivityRouter({activities, participants, assignParticipant}) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/activity/:activityId/:segmentId" element={<ActivityContainer activities={activities} participants={participants} assignParticipant={assignParticipant}/>} />
        <Route path="/activity/:activityId" element={<ActivityContainer activities={activities} participants={participants} assignParticipant={assignParticipant}/>} />
        <Route path="/activity" element={<ActivityContainer activities={activities} participants={participants} assignParticipant={assignParticipant}/>} />
      </Routes>
      }
    </BrowserRouter>
  );
}

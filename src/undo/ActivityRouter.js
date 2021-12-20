import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {App} from '../App';
import {ActivityContainer} from "./ActivityContainer";

export function ActivityRouter({activities, participants, assignParticipant}) {
  return (
    <Routes>
      <Route path=":activityId/:segmentId" element={<ActivityContainer activities={activities} participants={participants} assignParticipant={assignParticipant}/>} />
      <Route path=":activityId" element={<ActivityContainer activities={activities} participants={participants} assignParticipant={assignParticipant}/>} />
      <Route path="" element={<ActivityContainer activities={activities} participants={participants} assignParticipant={assignParticipant}/>} />
    </Routes>
  );
}

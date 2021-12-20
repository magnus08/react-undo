import React, {useContext, useReducer} from 'react';
import {UndoCtx} from "./UndoContext";
import {ActivityRouter} from "./ActivityRouter";
import {useLocation} from "react-router-dom";

export const MegaState = () => {
  const [state, dispatch] = useReducer(reducer, {
    participants: [
      {"name": "p1", id: 1, segments: ["s1:1", "s2:1", "s3:1"]},
      {"name": "p2", id: 2, segments: []},
      {"name": "p3", id: 3, segments: ["s1:2", "s2:2", "s3:2"]},
      {"name": "p4", id: 4, segments: ["s1:1", "s3:1"]},
      {"name": "p5", id: 5, segments: ["s3:3"]},

    ],
    activities: [
      {
        title: "A1", id: "a1", segments: [
          {id: "s1:1", name: "Segment1 in A1"},
          {id: "s1:2", name: "Segment 2 in A1"},
          {id: "s1:3", name: "Segment 3 in A1"}
        ]
      },
      {
        title: "A2", id: "a2", segments: [
          {id: "s2:1", name: "Segment 1 in A2"},
          {id: "s2:2", name: "Segment 2 in A2"},
        ]
      },
      {
        title: "A3", id: "a3", segments: [
          {id: "s3:1", name: "Segment 1 in A3"},
          {id: "s3:2", name: "Segment 2 in A3"},
          {id: "s3:3", name: "Segment 3 in A3"}
        ]
      },
    ]
  });

  const {execute} = useContext(UndoCtx);
  const location = useLocation();
  console.log("Location = ", location);
  function assignParticipant(participants, participantId, fromSegmentId, toSegmentId) {
    console.log("+++ init: ", participantId, fromSegmentId, toSegmentId);

    function assignInSegment(segments) {
      if(toSegmentId) {
        const res = [
          toSegmentId,
          ...segments.filter(segmentId => fromSegmentId !== segmentId) // Double-copy, is there a better way?
        ];
        return res;

      } else {
        return segments.filter(segmentId => !fromSegmentId || fromSegmentId !== segmentId);
      }

    }

    return participants.map(p =>
      p.id === participantId
        ?
        ({
          ...p,
          segments: assignInSegment(p.segments),
        })
        :
        p);
  }

  function reducer(state, action) {
    let newState;
    switch (action.type) {
      case 'ASSIGN_PARTICIPANT': {
        const {participantId, fromSegmentId, toSegmentId} = action;
        newState = {...state, participants: assignParticipant(state.participants, participantId, fromSegmentId, toSegmentId)}
        break;
      }
      default:
        throw new Error();
    }
    return newState;
  }

  return (
    <ActivityRouter
      activities={state.activities}
      participants={state.participants}
      assignParticipant={({participantId, fromSegmentId, toSegmentId}) =>
        execute({
            do: () => {
              dispatch({
                  type: 'ASSIGN_PARTICIPANT',
                  participantId,
                  fromSegmentId,
                  toSegmentId,
                },
              )
            },
            undo: () => {
              dispatch({
                type: 'ASSIGN_PARTICIPANT',
                participantId,
                fromSegmentId: toSegmentId,
                toSegmentId: fromSegmentId,
              })
            },
            path: location.pathname,
          }

        )}
    />
  );
}
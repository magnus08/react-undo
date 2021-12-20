import React, {useContext, useState} from "react";
import {Button, Icon, List, Menu} from "semantic-ui-react";
import {UndoCtx} from "./UndoContext";
import { useParams, useNavigate } from "react-router-dom";

export const ActivityContainer = ({activities, participants, assignParticipant}) => {
  const navigate = useNavigate();

  // const [selectedActivity, setSelectedActivity] = useState(activities[0]);
  // const [selectedSegment, setSelectedSegment] = useState(activities[0].segments[0]);
  const {undo, redo, isUndoable, isRedoable, openMulti, closeMulti} = useContext(UndoCtx);
  const {activityId, segmentId} = useParams();
  const selectedActivity = activityId ? activities.find(a => a.id === activityId): activities[0];
  const selectedSegment = segmentId ? selectedActivity.segments.find(s => s.id === segmentId): selectedActivity.segments[0];

  const segMap = new Map();
  participants.forEach(participant =>
    participant.segments.forEach(segment =>
      segMap.has(segment) ? segMap.get(segment).add(participant) : segMap.set(segment, new Set().add(participant))));

  return (
    <div>
      <List horizontal>
        <List.Item><Button disabled={!isUndoable} onClick={() => undo()}>Undo</Button></List.Item>
        <List.Item><Button disabled={!isRedoable} onClick={() => redo()}>Redo</Button></List.Item>

      </List>
      <Menu attached='top' tabular>
        {activities.map((a) =>
          <Menu.Item key={a.id} onClick={() => {
            // setSelectedActivity(a);
            navigate(`/activity/${a.id}`);

            // setSelectedSegment(a.segments[0]);

          }} active={a.id === selectedActivity.id}>
            {a.title}
          </Menu.Item>
        )
        }
      </Menu>

      <List celled>
        {selectedActivity.segments.map(s =>
          <List.Item key={s.id}>
            <List.Header>
              <span onClick={() => navigate(`/activity/${selectedActivity.id}/${s.id}`)}>{s.name}<Icon name="target" disabled={selectedSegment.id !== s.id}/></span>
              {segMap.has(s.id) &&
              <Button onClick={() => {
                openMulti();
                Array.from(segMap.get(s.id)).forEach(participant => {
                    assignParticipant({participantId: participant.id, fromSegmentId: s.id, toSegmentId: selectedSegment.id});
                  }
                );
                closeMulti();

              }} disabled={selectedSegment.id === s.id}>Move all</Button>
              }
            </List.Header>
            <List>
              {segMap.has(s.id)
                ?
                Array.from(segMap.get(s.id)).map(participant =>
                  <List.Item onClick={() => assignParticipant({participantId: participant.id, fromSegmentId: s.id, toSegmentId: selectedSegment.id})}>
                    {participant.name}
                  </List.Item>)
                :
                "Empty"
              }
            </List>
          </List.Item>
        )
        }
      </List>
    </div>
  );
}



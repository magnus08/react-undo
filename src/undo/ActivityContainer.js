import React, {useContext, useState} from "react";
import {Button, Icon, List, Menu} from "semantic-ui-react";
import {UndoCtx} from "./UndoContext";

export const ActivityContainer = ({activities, participants, assignParticipant}) => {

  const [selectedActivity, setSelectedActivity] = useState(activities[0]);
  const [selectedSegment, setSelectedSegment] = useState(activities[0].segments[0]);
  const {undo, redo, isUndoable, isRedoable} = useContext(UndoCtx);

  const segMap = new Map();
  participants.forEach(participant =>
    participant.segments.forEach(segment =>
      segMap.has(segment) ? segMap.get(segment).add(participant) : segMap.set(segment, new Set().add(participant))));

  console.log("Segmap = ", segMap);
  return (
    <div>
      <List horizontal>
        <List.Item><Button disabled={!isUndoable} onClick={() => undo()}>Undo</Button></List.Item>
        <List.Item><Button disabled={!isRedoable} onClick={() => redo()}>Redo</Button></List.Item>

      </List>
      <Menu attached='top' tabular>
        {activities.map((a) =>
          <Menu.Item key={a.id} onClick={() => {
            setSelectedActivity(a);
            setSelectedSegment(a.segments[0]);
          }} active={a.id === selectedActivity.id}>
            {a.title}
          </Menu.Item>
        )
        }
      </Menu>

      <List celled>
        {selectedActivity.segments.map(s =>
          <List.Item key={s.id}>
            <List.Header onClick={() => setSelectedSegment(s)}>{s.name}<Icon name="target" disabled={selectedSegment.id !== s.id}/></List.Header>
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



import React, { useState } from 'react';
import produce from 'immer';
import { loadLists } from '../../services/api';

import BoardContext from './context';
import List from '../List';
import { Container } from './styles';

const data = loadLists();

export default function Board() {
  const [lists, setLists] = useState(data);

  function move(fromList, toList, from, to = 0){
    setLists(produce(lists, draft => {
      const dragged = draft[fromList].cards[from];

      draft[fromList].cards.splice(from, 1);
      if(draft[toList].cards.length > 0){
        draft[toList].cards.splice(to, 0, dragged);
      }
      else {
        draft[toList].cards.push(dragged);
      }
    }))
  }

  return (
    <BoardContext.Provider value={{ lists, move }}>
      <Container>
        {lists.map((list, index) => <List key={list.title} index={index} data={list} />)}
      </Container>
    </BoardContext.Provider>
  );
}

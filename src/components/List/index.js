import React, { useContext, useRef } from 'react';
import { MdAdd } from 'react-icons/md';
import { useDrop } from 'react-dnd';

import BoardContext from '../Board/context';
import { Container } from './styles';
import Card from '../Card';

export default function List({ data, index: listIndex }) {
  const ref = useRef();
  const { move } = useContext(BoardContext);

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor) {

      if(data.cards.length === 0){
        const draggedListIndex = item.listIndex;
        const targetListIndex = listIndex

        const draggedIndex = item.index;

        move(draggedListIndex, targetListIndex, draggedIndex);
      }
    }
  })
  dropRef(ref);
  return (
    <Container done={data.done} ref={ref}>
      <header>
        <h2>{data.title}</h2>
        {data.creatable && (
          <button type='button'>
            <MdAdd size={24} color='#fff' />
          </button>
        )}
      </header>
      <ul>
        {data.cards.map((card, index) => (
          <Card 
            key={card.id} 
            listIndex={listIndex}
            index={index} 
            data={card} 
          />
        ))}
      </ul>
    </Container>
  );
}

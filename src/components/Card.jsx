import { Draggable } from '@hello-pangea/dnd'

export default function Card({ card, index }) {
  return (
    <Draggable draggableId={card.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
            bg-[#22272B] p-2 rounded shadow-sm text-sm text-white break-words mb-2
            hover:ring-2 hover:ring-blue-500 cursor-pointer
            ${snapshot.isDragging ? 'bg-[#2C333A] shadow-xl rotate-2' : ''}
          `}
          style={{ ...provided.draggableProps.style }} 
        >
          {card.title}
        </div>
      )}
    </Draggable>
  )
}
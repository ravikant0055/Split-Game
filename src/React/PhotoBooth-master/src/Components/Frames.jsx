import React, { useEffect, useRef, useState } from 'react';
import { DndContext, useDraggable, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { useDispatch } from 'react-redux';
import { updateStickerPosition, removeSticker } from '../store/stickersSlice';

// DraggableSticker Component
const DraggableSticker = ({ sticker }) => {
  const dispatch = useDispatch();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: sticker.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    position: 'absolute',
    top: sticker.y,
    left: sticker.x,
    cursor: 'move',
    width: `${sticker.width}px`,
    height: `${sticker.height}px`,
  };

  const handleDoubleClick = () => {
    dispatch(removeSticker(sticker.id));
  };

  // const handleResize = (e) => {
    
  // };

  return (
    <img
      ref={setNodeRef}
      src={sticker.src}
      alt="sticker"
      style={style}
      {...listeners}
      {...attributes}
      onDoubleClick={handleDoubleClick}
      // Implement resizing handles if needed
    />
  );
};

// Frame 1: 1 image per row, 3 images total
const Frame1 = ({ photos, bgimage, stickers }) => {
  const dispatch = useDispatch();
  const frameRef = useRef(null);
  const [frameSize, setFrameSize] = useState({ width: 0, height: 0 });

  const sensors = useSensors(
    useSensor(PointerSensor, {})
  );

  useEffect(() => {
    if (frameRef.current) {
      const { offsetWidth, offsetHeight } = frameRef.current;
      setFrameSize({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  const handleDragEnd = (event) => {
    const { active, delta } = event;
    dispatch(updateStickerPosition({
      id: active.id,
      x: Math.max(0, Math.min(stickers.find(s => s.id === active.id)?.x + delta.x, frameSize.width - (stickers.find(s => s.id === active.id)?.width || 70))),
      y: Math.max(0, Math.min(stickers.find(s => s.id === active.id)?.y + delta.y, frameSize.height - (stickers.find(s => s.id === active.id)?.height || 70))),
    }));
  };

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToParentElement]}
    >
      <div
        ref={frameRef} 
        style={{
          position: 'relative',
          display: 'grid',
          width:'192px',
          height:'576px',
          gridTemplateColumns: '1fr',
          gridTemplateRows: 'repeat(4, 1fr)',
          gap: '25px', 
          justifyItems: 'center',
          paddingTop:'25px',
          // border: '2px solid black',
          // backgroundImage: `url(${bgimage})`,
          overflow: 'hidden',
        }}
        className="bg-cover bg-white"
      >
      {
      bgimage &&
        <img src={bgimage} alt='frame' className='w-full absolute'/>
      }
        {Array(3)
          .fill(0)
          .map((_, idx) => (
            <div
              key={idx}
              style={{
                width: '147px',
                height: '147px',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              className="bg-[#d4cbcb]"
            >
              {photos[idx] && (
                <img
                  src={photos[idx]}
                  alt={`myphoto ${idx + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              )}
            </div>
          ))}

        {/* Render Stickers */}
        {stickers?.map((sticker) => (
          <DraggableSticker key={sticker.id} sticker={sticker} />
        ))}
      </div>
    </DndContext>
  );
};

// Frame 2: 2 images per row, 6 images total
const Frame2 = ({ photos, bgimage, stickers }) => {
  const dispatch = useDispatch();
  const frameRef = useRef(null);
  const [frameSize, setFrameSize] = useState({ width: 0, height: 0 });

  const sensors = useSensors(
    useSensor(PointerSensor, {})
  );

  useEffect(() => {
    if (frameRef.current) {
      const { offsetWidth, offsetHeight } = frameRef.current;
      setFrameSize({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  const handleDragEnd = (event) => {
    const { active, delta } = event;
    dispatch(updateStickerPosition({
      id: active.id,
      x: Math.max(0, Math.min(stickers.find(s => s.id === active.id)?.x + delta.x, frameSize.width - (stickers.find(s => s.id === active.id)?.width || 70))),
      y: Math.max(0, Math.min(stickers.find(s => s.id === active.id)?.y + delta.y, frameSize.height - (stickers.find(s => s.id === active.id)?.height || 70))),
    }));
  };
  return(
  <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToParentElement]}
  >
    <div
      ref={frameRef}
      style={{
        position:'relative',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        padding: '20px 20px 70px 20px',
        border: '2px solid black',
        overflow:'hidden',
        backgroundImage: `url(${bgimage})`,
      }}
      className="bg-cover bg-white"
    >
      {Array(6)
        .fill(0)
        .map((_, idx) => (
          <div
            key={idx}
            style={{
              width: '180px',
              height: '150px',
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            className="bg-[#d4cbcb]"
          >
            {photos[idx] && (
              <img
                src={photos[idx]}
                alt={`myphoto ${idx + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            )}
          </div>
        ))}
        {/* Render Stickers */}
        {stickers?.map((sticker) => (
            <DraggableSticker key={sticker.id} sticker={sticker} />
        ))}
    </div>
  </DndContext>
  )
};

// Frame 3: 1 images per row, 1 images total
const Frame3 = ({ photos, bgimage, stickers }) => {
  const dispatch = useDispatch();
  const frameRef = useRef(null);
  const [frameSize, setFrameSize] = useState({ width: 0, height: 0 });

  const sensors = useSensors(
    useSensor(PointerSensor, {})
  );

  useEffect(() => {
    if (frameRef.current) {
      const { offsetWidth, offsetHeight } = frameRef.current;
      setFrameSize({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  const handleDragEnd = (event) => {
    const { active, delta } = event;
    dispatch(updateStickerPosition({
      id: active.id,
      x: Math.max(0, Math.min(stickers.find(s => s.id === active.id)?.x + delta.x, frameSize.width - (stickers.find(s => s.id === active.id)?.width || 70))),
      y: Math.max(0, Math.min(stickers.find(s => s.id === active.id)?.y + delta.y, frameSize.height - (stickers.find(s => s.id === active.id)?.height || 70))),
    }));
  };
  return(
    <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToParentElement]}
    >
      <div
        ref={frameRef}
        style={{
          position: 'relative',
          display: 'grid',
          width:'384px',
          height:'576px',
          gridTemplateColumns: '1fr',
          gridTemplateRows: 'repeat(1, 1fr)',
          justifyItems: 'center',
          paddingTop:'28.7px',
          backgroundColor: 'white',
         // backgroundImage: `url(${bgimage})`,  // myframe cover
          overflow: 'hidden',
        }}
        className="bg-cover bg-white"
      >
      {
      bgimage &&
        <img src={bgimage} alt='frame' className='w-full absolute'/>
      }

      {Array(1)
          .fill(0)
          .map((_, idx) => (
            <div                  // my photo div
              key={idx}
              style={{
                width: '328px',
                height: '464.2px',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              className="bg-[#d4cbcb]"
            >
              {photos[idx] && (    
                <img
                  src={photos[idx]}
                  alt={`myphoto ${idx + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              )}
            </div>
          ))}

          {/* Render Stickers */}
          {stickers?.map((sticker) => (
            <DraggableSticker key={sticker.id} sticker={sticker} />
          ))}
      </div>
    </DndContext>
  )
};

// Frame 4: 2 images per row, 4 images total
const Frame4 = ({ photos, bgimage, stickers }) => {
  const dispatch = useDispatch();
  const frameRef = useRef(null);
  const [frameSize, setFrameSize] = useState({ width: 0, height: 0 });

  const sensors = useSensors(
    useSensor(PointerSensor, {})
  );

  useEffect(() => {
    if (frameRef.current) {
      const { offsetWidth, offsetHeight } = frameRef.current;
      setFrameSize({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  const handleDragEnd = (event) => {
    const { active, delta } = event;
    dispatch(updateStickerPosition({
      id: active.id,
      x: Math.max(0, Math.min(stickers.find(s => s.id === active.id)?.x + delta.x, frameSize.width - (stickers.find(s => s.id === active.id)?.width || 70))),
      y: Math.max(0, Math.min(stickers.find(s => s.id === active.id)?.y + delta.y, frameSize.height - (stickers.find(s => s.id === active.id)?.height || 70))),
    }));
  };
  return(
  <DndContext
    sensors={sensors}
    onDragEnd={handleDragEnd}
    modifiers={[restrictToParentElement]}
  >
    <div
      ref={frameRef}
      style={{
        position: 'relative',
        display: 'grid',
        width:'393px',
        height:'574px',
        justifyItems: 'center', 
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'repeat(2, 1fr)',
        padding:'30px 0px 70px 0px',
        overflow: 'hidden',
        backgroundImage: `url(${bgimage})`,
      }}
      className="bg-cover bg-white"
    >
      {Array(2)
        .fill(0)
        .map((_, idx) => (
          <div
            key={idx}
            style={{
              width: '340px',
              height: '225px',
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            className="bg-[#d4cbcb]"
          >
            {photos[idx] && (
              <img
                src={photos[idx]}
                alt={`myphoto ${idx + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            )}
          </div>
        ))}
        {/* Render Stickers */}
        {stickers?.map((sticker) => (
            <DraggableSticker key={sticker.id} sticker={sticker} />
        ))}
    </div>
  </DndContext>  
  )
};

// Frame 4: 2 images per row, 4 images total
const Frame5 = ({ photos, bgimage, stickers }) => {
  const dispatch = useDispatch();
  const frameRef = useRef(null);
  const [frameSize, setFrameSize] = useState({ width: 0, height: 0 });

  const sensors = useSensors(
    useSensor(PointerSensor, {})
  );

  useEffect(() => {
    if (frameRef.current) {
      const { offsetWidth, offsetHeight } = frameRef.current;
      setFrameSize({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  const handleDragEnd = (event) => {
    const { active, delta } = event;
    dispatch(updateStickerPosition({
      id: active.id,
      x: Math.max(0, Math.min(stickers.find(s => s.id === active.id)?.x + delta.x, frameSize.width - (stickers.find(s => s.id === active.id)?.width || 70))),
      y: Math.max(0, Math.min(stickers.find(s => s.id === active.id)?.y + delta.y, frameSize.height - (stickers.find(s => s.id === active.id)?.height || 70))),
    }));
  };
  return(
  <DndContext
    sensors={sensors}
    onDragEnd={handleDragEnd}
    modifiers={[restrictToParentElement]}
  >
    <div
      ref={frameRef}
      style={{
        position: 'relative',
        display: 'grid',
        width:'393px',
        height:'574px',
        justifyItems: 'center', 
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        
        paddingTop:'30px',
        padding:'25px',
        paddingBottom:'80px',
        overflow: 'hidden',
        backgroundImage: `url(${bgimage})`,
      }}
      className="bg-cover bg-white"
    >
      {Array(4)
        .fill(0)
        .map((_, idx) => (
          <div
            key={idx}
            style={{
              width: '162px',
              height: '225px',
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            className="bg-[#d4cbcb]"
          >
            {photos[idx] && (
              <img
                src={photos[idx]}
                alt={`myphoto ${idx + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            )}
          </div>
        ))}
        {/* Render Stickers */}
        {stickers?.map((sticker) => (
            <DraggableSticker key={sticker.id} sticker={sticker} />
        ))}
    </div>
  </DndContext>  
  )
};

// Export all frames
export { Frame1, Frame2, Frame3, Frame4, Frame5 };

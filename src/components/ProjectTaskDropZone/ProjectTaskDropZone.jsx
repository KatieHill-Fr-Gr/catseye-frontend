import React, { useEffect, useRef } from 'react'
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

const DropZone = ({ onDrop, children }) => {
    const ref = useRef(null)


  useEffect(() => {
    const el = ref.current
    if (!el) {
      throw new Error('ref not set correctly')
    }

    return dropTargetForElements({
      element: el,
      onDrop: ({ source: task }) => {
        onDrop(task.data)
      }
    });
  }, [onDrop])

   return (
    <div ref={ref} style={{ minHeight: '100px', border: '2px dashed #ccc', padding: '1rem' }}>
      { children }
    </div>
   )


}

export default DropZone
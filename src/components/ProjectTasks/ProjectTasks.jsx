import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { useRef, useEffect } from 'react'

const DraggableTask = ({ task }) => {
    const ref = useRef(null)

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        return draggable({
            element,
            getInitialData: () => ({ 
                taskId: task.id, 
                taskData: task 
            }),
        });
    }, [task]);

    return (
        <div ref={ref} style={{ cursor: 'grab', padding: '1rem' }}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
        </div>
    );
}

export default DraggableTask
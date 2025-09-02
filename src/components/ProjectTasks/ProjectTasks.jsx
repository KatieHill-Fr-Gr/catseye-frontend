import './ProjectTasks.css'

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
        <div ref={ref} className='project-task'>
            <h4>{task.title}</h4>
        </div>
    );
}

export default DraggableTask
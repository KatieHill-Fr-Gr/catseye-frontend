import './ProjectTasks.css'

import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { useRef, useEffect, useState } from 'react'

import { LuCircleChevronRight } from "react-icons/lu";

const DraggableTask = ({ task, onClick }) => {
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
    }, [task])

    return (
        <div ref={ref} className='project-task'>
            <h4>{task.title}</h4>
                     <button onClick={() => {
                console.log('Button clicked, task.id:', task.id)
                onClick && onClick(task.id)
            }} className="profile-button">
                <LuCircleChevronRight />
            </button>
        </div>
    )
}

export default DraggableTask
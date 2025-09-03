import './ProjectTasks.css'

import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { useRef, useEffect, useState } from 'react'

import { LuCirclePlus, LuCircleChevronRight } from "react-icons/lu";


import Sidebar from '../Sidebar/Sidebar'
import TaskDetails from '../TaskDetails/TaskDetails'

const DraggableTask = ({ task }) => {
    const ref = useRef(null)
    const [taskDetailsOpen, setTaskDetailsOpen] = useState(false)


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
            <button onClick={() => setTaskDetailsOpen(true)} className="profile-button">
                <LuCircleChevronRight />
            </button>
            <Sidebar
                isOpen={taskDetailsOpen}
                onClose={() => setTaskDetailsOpen(false)}
                title="Task details"
            >
                <TaskDetails task={task}/>
            </Sidebar>
        </div>
    );
}

export default DraggableTask
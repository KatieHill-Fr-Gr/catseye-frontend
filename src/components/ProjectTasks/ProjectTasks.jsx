import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { useRef } from 'react'
import { useParams } from 'react-router-dom'

import { getProjectTasks } from '../services/projects'

const DraggableTask = ({ task }) => {
    const ref = useRef(null)

    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)

    const { projectId } = useParams()


    useEffect(() => {
        const getTasks = async () => {
            try {
                setLoading(true)
            const response = await getProjectTasks(projectId);
            setTasks(response.data)
        } catch (error) {
                console.error('Error:', error)
                setTasks([])
            } finally {
                setLoading(false)
            }
        }

        getTasks();
    }, [projectId]);

    return (
        <div ref={ref} style={{ cursor: 'grab', padding: '8px', border: '1px solid #ccc' }}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
        </div>
    );
}

export default DraggableTask
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

const SlateEditor = ({ value, onChange, placeholder = "Enter text..." }) => {
    return (
        <Slate value={value} onChange={onChange}>
            <Editable placeholder={placeholder} />
        </Slate>
    )
}

export default SlateEditor
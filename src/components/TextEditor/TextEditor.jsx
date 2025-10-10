import { useState, useEffect } from 'react'
import { $getRoot, $getSelection } from 'lexical'

import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'

function EditabilityPlugin({ editable }) {
    const [editor] = useLexicalComposerContext()

    useEffect(() => {
        editor.setEditable(editable)
    }, [editor, editable])

    return null
}

const TextEditor = ({ value, onChange, placeholder = "Enter some text...", editable = true }) => {
    const [wordCount, setWordCount] = useState(0)

    const getInitialEditorState = () => {
        if (value && value !== '') {
            try {
                const parsedState = JSON.parse(value)
                return JSON.stringify(parsedState)
            } catch (error) {
                console.error('Error parsing initial editor state:', error)
                return null
            }
        }
        return null
    }

    const initialConfig = {
        editable: editable,
        namespace: 'MyEditor',
        editorState: getInitialEditorState(),
        onError(error) {
            console.error(error)
        },
    }

    const handleChange = (editorState) => {
        const jsonString = JSON.stringify(editorState.toJSON())
        onChange(jsonString)

        editorState.read(() => {
            const root = $getRoot()
            const textContent = root.getTextContent()
            const words = textContent.trim() === '' ? 0 : textContent.trim().split(/\s+/).length
            setWordCount(words)
        })
    }

    return (
        <div className="editor-container">
            <LexicalComposer initialConfig={initialConfig}>
                <div className="editor-inner">
                    <PlainTextPlugin
                        contentEditable={<ContentEditable className="editor-input" />}
                        placeholder={<div className="editor-placeholder">{placeholder}</div>}
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    <OnChangePlugin onChange={handleChange} />
                    {editable && <HistoryPlugin />}
                    <EditabilityPlugin editable={editable} />
                </div>
                {editable && (
                <span>Words: {wordCount}</span>
                 )}
                {!editable && (
                        <span>Read-only</span>
                )}
            </LexicalComposer>
        </div>
    )
}

export default TextEditor
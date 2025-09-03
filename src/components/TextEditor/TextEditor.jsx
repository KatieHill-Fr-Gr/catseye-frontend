import { useEffect } from 'react'
import { $getRoot, $getSelection } from 'lexical'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'

// Theme for styling
const theme = {
  // You can add custom CSS classes here later
  paragraph: 'editor-paragraph',
  text: {
    bold: 'editor-text-bold',
    italic: 'editor-text-italic',
    underline: 'editor-text-underline',
  },
}

// Initial editor state
function prepopulatedRichText() {
  const root = $getRoot()
  if (root.getFirstChild() === null) {
    root.append(
      $createParagraphNode().append($createTextNode(''))
    )
  }
}

// Plugin to handle initial state
function MyOnChangePlugin({ onChange }) {
  const [editor] = useLexicalComposerContext()
  
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState)
    })
  }, [editor, onChange])
  
  return null
}

const TextEditor = ({ value, onChange, placeholder = "Enter some text..." }) => {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError(error) {
      console.error(error)
    },
  }

  const handleChange = (editorState) => {
    // Convert to JSON string for your API
    const jsonString = JSON.stringify(editorState.toJSON())
    onChange(jsonString)
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
          <HistoryPlugin />
        </div>
      </LexicalComposer>
    </div>
  )
}

export default TextEditor
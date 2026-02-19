# Catseye - A CAT tool & project management app in one
by Katie Hill 

<img width="1449" height="923" alt="Catseye_homepage" src="https://github.com/user-attachments/assets/925fc96b-7342-40cf-9f63-9f309cd1f751" />

*Screenshot of homepage*


## Tech stack

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg"
  alt=“React” width="40" height="40" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original-wordmark.svg"
  alt=“Python” width="40" height="40" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg"
  alt=“Django” width="40" height="40" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/djangorest/djangorest-original-wordmark.svg"
  alt=“DjangoRESTFramework” width="40" height="40" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-plain-wordmark.svg"
alt=“PostgreSQL” width="40" height="40" />

## Timeframe

- **Duration** 7 days
- **Team** This was a solo project
- **Skills** React frontend development with component-based architecture, full CRUD functionality, third-party package & service integration (Lexical text editor, Pragmatic Kanban board, Cloudinary for image uploads), and UI/UX design

## About

Catseye is a translation and project management app intended for business users who create and manage multilingual content. In my previous roles as a translator and copywriter, I used many CAT (Computer Assisted Translation) and workflow management tools that had clunky and outdated UIs. I wanted to design and build an agile and streamlined app that combined these functionalities in a simple and intuitive way, while also fostering collaboration between teams.

This was my final project on the General Assembly Software Engineering Bootcamp. Our brief was to develop a full-stack application with a React frontend that consumes a Django API. With so many interactive features to integrate, building the UI was particularly challenging and I ran into multiple issues throughout the week. I managed to resolve most of these by the project deadline and have since continued to develop the app with additional features (including AI integration). 

You can view the live app here: https://catseye-ai.netlify.app/

## Installation


For the frontend, clone this repository and install the following packages: 


```bash
npm install react
npm install react-dom
npm install react-router
npm install react-router-dom
npm install react-icons
npm install lucide-react
```

**Text Editor**

```bash
npm install @lexical/react @lexical/plain-text @lexical/rich-text @lexical/utils
```

**Kanban Board**

```bash
npm install @atlaskit/pragmatic-drag-and-drop
```

**HTTP Requests**

```bash
npm install axios
```


## Planning 

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" 
     alt="Figma" width="40" height="40"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/trello/trello-plain-wordmark.svg" 
	alt="Trello" width="80" height="60" />

I created the UI/UX design in Figma using a template and designed a component-based architecture with a clear separation of concerns. I then planned the build using a Trello board, focusing on a different feature each day.

#### 1) UI/UX design (Figma)


<img width="1392" height="772" alt="Catseye_UI" src="https://github.com/user-attachments/assets/455c5194-cd42-47b4-b7f1-a47159e839b6" />

<img width="860" height="399" alt="Catseye_UI_2" src="https://github.com/user-attachments/assets/540871e4-fd39-47db-bd94-d66ad0a19d04" />


#### 2) Component-Based Architecture

```
src
│   ├── App.jsx
│   ├── assets
│   │   ├── MyProjects.jpeg
│   │   ├── TextandTranslationView.png
│   │   ├── eyeIcon.png
│   │   └── react.svg
│   ├── components
│   │   ├── 404NotFound
│   │   │   ├── 404NotFound.css
│   │   │   └── 404NotFound.jsx
│   │   ├── CreateProject
│   │   │   └── CreateProject.jsx
│   │   ├── CreateSourceForm
│   │   │   ├── CreateSourceForm.css
│   │   │   └── CreateSourceForm.jsx
│   │   ├── CreateSourcePage
│   │   │   └── CreateSourcePage.jsx
│   │   ├── CreateTask
│   │   │   └── CreateTask.jsx
│   │   ├── CreateTranslationForm
│   │   │   ├── CreateTranslationForm.css
│   │   │   └── CreateTranslationForm.jsx
│   │   ├── CreateTranslationPage
│   │   │   ├── CreateTranslationPage.css
│   │   │   └── CreateTranslationPage.jsx
│   │   ├── EditSourceForm
│   │   │   ├── EditSourceForm.css
│   │   │   └── EditSourceForm.jsx
│   │   ├── EditSourcePage
│   │   │   ├── EditSourcePage.css
│   │   │   └── EditSourcePage.jsx
│   │   ├── EditTask
│   │   │   └── EditTask.jsx
│   │   ├── EditTranslationForm
│   │   │   └── EditTranslationForm.jsx
│   │   ├── EditTranslationPage
│   │   │   ├── EditTranslationPage.css
│   │   │   └── EditTranslationPage.jsx
│   │   ├── Footer
│   │   │   ├── Footer.css
│   │   │   └── Footer.jsx
│   │   ├── FooterBar
│   │   │   ├── FooterBar.css
│   │   │   └── FooterBar.jsx
│   │   ├── FormModal
│   │   │   ├── FormModal.css
│   │   │   └── FormModal.jsx
│   │   ├── HomePage
│   │   │   ├── HomePage.css
│   │   │   └── HomePage.jsx
│   │   ├── ImageUpload
│   │   │   ├── ImageUpload.css
│   │   │   └── ImageUpload.jsx
│   │   ├── MyProjects
│   │   │   ├── MyProjects.css
│   │   │   └── MyProjects.jsx
│   │   ├── NavBar
│   │   │   ├── NavBar.css
│   │   │   └── NavBar.jsx
│   │   ├── ProfileDetails
│   │   │   ├── ProfileDetails.css
│   │   │   └── ProfileDetails.jsx
│   │   ├── ProjectDetails
│   │   │   ├── ProjectDetails.css
│   │   │   └── ProjectDetails.jsx
│   │   ├── ProjectPage
│   │   │   ├── ProjectPage.css
│   │   │   └── ProjectPage.jsx
│   │   ├── ProjectTaskDropZone
│   │   │   └── ProjectTaskDropZone.jsx
│   │   ├── ProjectTasks
│   │   │   ├── ProjectTasks.css
│   │   │   └── ProjectTasks.jsx
│   │   ├── Sidebar
│   │   │   ├── Sidebar.css
│   │   │   └── Sidebar.jsx
│   │   ├── SignInForm
│   │   │   ├── SignInForm.css
│   │   │   └── SignInForm.jsx
│   │   ├── SignInPage
│   │   │   ├── SignInPage.css
│   │   │   └── SignInPage.jsx
│   │   ├── SignUpForm
│   │   │   ├── SignUpForm.css
│   │   │   └── SignUpForm.jsx
│   │   ├── SignUpPage
│   │   │   ├── SignUpPage.css
│   │   │   └── SignUpPage.jsx
│   │   ├── SourceDetails
│   │   │   ├── SourceDetails.css
│   │   │   └── SourceDetails.jsx
│   │   ├── TaskDetails
│   │   │   ├── TaskDetails.css
│   │   │   └── TaskDetails.jsx
│   │   └── TextEditor
│   │       └── TextEditor.jsx
│   ├── contexts
│   │   └── UserContext.jsx
│   ├── main.jsx
│   ├── services
│   │   ├── cloudinaryImgs.js
│   │   ├── projects.js
│   │   ├── team.js
│   │   ├── texts.js
│   │   ├── translations.js
│   │   └── users.js
│   ├── styles
│   │   ├── forms.css
│   │   ├── index.css
│   │   └── layout.css
│   └── utils
│       ├── auth.js
│       └── cases.js
```


## Build

To speed up development, I used Vite to provide basic scaffolding for the app and also reused an Image Upload component I developed for a previous project (Re-Lux).


#### 1) Core Layout & Navigation

I began by setting up a responsive layout based on the Figma UI/UX design with consistent styling: 

- Homepage
- Navigation bar
- Footer bar
- Custom 404 “Not Found” page

#### 2) User Authentication 

Next, I implemented user authentication using a centralised context to manage user state and developed sign in, sign up and profile components: 

- User Context
- Sign up/sign in form & page components
- Show Profile Modal
- Edit Profile Modal


#### 3) Projects & Tasks (full CRUD)

I developed components to manage projects and tasks, with full CRUD operations for the tasks and separate form components for each resource: 

- Index “My Projects” (list view showing only projects associated with the user’s team)
- Show “Project Details” (detail view in a sidebar overlay)
- Show “Task Details” (modal with edit and delete functionality)
- Create (form modals for new projects and tasks)
- Update (form modal to edit tasks and form & page component to edit projects)


#### 4) Project Kanban Board

In addition to the Project Details component, I also wanted a Kanban-style project board where users can drag and drop tasks in order to track their progress. To create the layout, I integrated Atlassian’s Pragmatic Drag and Drop and developed separate Draggable Task and Task Drop Zone components for the columns:


```
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { useRef, useEffect } from 'react'

import { LuCircleChevronRight } from "react-icons/lu"

const DraggableTask = ({ task, onClick }) => {
    const ref = useRef(null)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        return draggable({
            element,
            getInitialData: () => ({
                taskId: task.id,
                taskData: task
            }),
        })
    }, [task])

    return (
        <div ref={ref} className='project-task'>
            <p>{task.title}</p>
            {task.assigned_to ? (
                <div className="assigned-img-container">
                <img
                    src={task.assigned_to.profile_img}
                    alt={task.assigned_to.username}
                    className="assigned-img"
                />
                </div>
            ) : (
                <span></span>
            )}
            <button onClick={() => {
                console.log('Button clicked, task.id:', task.id)
                onClick && onClick(task.id)
            }} className="profile-button">
                <LuCircleChevronRight />
            </button>
        </div>
    )
}
```



#### 5) Reusable Image Upload

I took this component from my previous project on the GA Software Engineering Bootcamp and refactored it to make it more flexible and reusable: 

- The `multiple` prop allows the same component to handle either single or multiple uploads
- The upload logic checks if the field should accept multiple files and updates the form state (storing a single URL string or appending new URLs to an array)
- Conditional rendering to change how image previews are displayed for single and multiple uploads
- The `accept=“image/*` attribute allows better input validation


#### 6) Source Texts & Translations

To keep the UI organised and easy to use, the source texts (and related translations) are accessed via the tasks. When creating a new task, the user can select an existing resource or “Create new”/“None” depending. The source text and/or translation can then be accessed via the link in the task details: 

The Edit Translation page component then displays the source text and translation side-by-side:  

```
    return (
        <main className="page-content">
            <div className="content-wrapper">
                {translation && translation.sourceText &&
                    <section className='form'>
                        <SourceDetails sourceId={translation.sourceText} />
                    </section>
                }
                <section className='form'>
                    <EditTranslationForm
                    translationId={translationId} 
                    formData={formData} 
                    setFormData={setFormData} 
                    lexicalValue={lexicalValue} 
                    setLexicalValue={setLexicalValue} />
                </section>
            </div>
        </main>
    )
```
 #### 5) Text Editor & File Upload

I integrated a rich-text editor to enable the user to write and edit source texts and translations directly in the UI. I initially experimented with Slate React but ran into compatibility issues with React 19 so I switched to Lexical, which offered better performance and support. 

To manage the editor state, I created a custom plugin and integrated this into both the create and edit forms: 

```
function EditabilityPlugin({ editable }) {
    const [editor] = useLexicalComposerContext()

    useEffect(() => {
        editor.setEditable(editable)
    }, [editor, editable])

    return null
}
```

```
const TextEditor = ({ value, onChange, placeholder = "Enter some text...", editable = true }) => {
    const [wordCount, setWordCount] = useState(0)

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
```
For a more flexible and user-friendly experience, I also added a feature that allows users to upload an existing text file (.txt). The text from the file is saved as a string in the database and then be retrieved, parsed, and loaded into the Lexical text editor for editing: 

```
const handleSubmit = async (e) => {
        e.preventDefault()

        let payload
    
        if (upload === 'file' && sourceFile) {
            const filePayload = {
                title: formData.title,
                sourceLanguage: formData.sourceLanguage,
                sourceFile: sourceFile
            }

            const convertedPayload = toSnakeCase(filePayload)

            payload = new FormData()
            Object.keys(convertedPayload).forEach(key => {
                payload.append(key, convertedPayload[key])
            })
        } else {
            payload = toSnakeCase({
                ...formData,
                body: lexicalValue
            })
        }
```

### Challenges


#### 1) Prop Drilling & Passing Relationships

The modal components were tricky to implement because they relied on contextual information (e.g. the task object and project ID). If the prop wasn’t passed correctly through intermediary components, this caused errors and made it difficult to achieve the intended functionality.   

I tried to avoid tight coupling between modals and the component structure wherever possible. However, when developing the Kanban board, I had to pass several props (`task`, `taskId`, `onTaskUpdated`, `onTaskDeleted`) through the component tree due to the interactions between modals: 


```
── ProjectPage (Kanban board)
	  └── ProjectTaskDropZone
		└── ProjectTask (draggable task)
			└── TaskDetails (modal)
				└── EditTask (nested modal)
```


This solution works well for the Minimum Viable Product (MVP). For future scalability, a better approach might be to use React Context to manage modal state and shared contextual data (e.g. `task` and `projectId`).



#### 2) State Management & Persistence

In addition to managing the state locally, the Kanban board also needed to synchronise task statuses with the backend. When the tasks are dragged to a different column (e.g. from “Review” to “Done”), the new status had to be saved in the database.  

I added a separate helper function `taskUpdateStatus` and modified the handleTaskDrop function in the component to optimistically update the UI while simultaneously sending a request to the backend to persist the change:

```
    const handleTaskDrop = async (droppedTask, droppedStatus) => {
        try {
            await taskUpdateStatus(projectId, droppedTask.taskId, droppedStatus)

            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === droppedTask.taskId ? { ...task, status: droppedStatus } : task
                )
            )

            setDroppedStatus(prev => ({
                ...prev,
                [droppedTask.id]: droppedStatus
            }))

        } catch (error) {
            console.error("Error updating task status:", error)
        }
    }
```

#### 3) Text Editor (converting to JSON)

The Lexical rich-text editor stores its state in a JSON object so I had to convert this into a string before sending it to the Django API for database storage. I then had to use JSON.parse() when retrieving the text from the API to restore the editor’s internal state (and preserve the text formatting):

```
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
```

## Fixes

Since delivering the project in September 2025, I have made a number of improvements to fix bugs and enhance the UX: 


#### 1) Edit Profile Form

The user’s team was not displayed correctly in the edit form so I updated the serializer on the backend (see catseye-backend ReadMe) and added the following line of code to correctly retrieve the associated team from the API:  

`team: user.team ? (typeof user.team === 'object' ? String(user.team.id) : String(user.team)) : ‘’,`

The form also opened as a modal over the sidebar, which was visually confusing and made the UI feel heavy and difficult to use. I refactored the Profile Details component to support inline editing inside the sidebar:

```
            {isEditing ? (
                <form onSubmit={e => e.preventDefault()}>

                    <div className="form-row">
                        <ImageUpload
                            labelText="Upload photo"
                            fieldName="profileImg"
                            setFormData={setFormData}
                            imageURLs={formData.profileImg}
                            setImageUploading={setImageUploading}
                            multiple={false}
                        />
                    </div>
```

Although this solution combines the Show and Update operations in a single component, the code is still readable and the UI is now much cleaner and more user-friendly.


#### 2) Hamburger Menu

The navigation menu was not displaying properly on smaller screens. Although this app is mostly likely to be used on desktop, I implemented a hamburger menu for mobile devices: 

```
.hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
}

.mobile-user-controls {
  display: none;
}

@media (max-width: 768px) {

  .center-section,
  .right-section,
  .nav-button {
    display: none;
  }

  .hamburger {
    display: block;
  }

  .mobile-user-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    position: absolute;
    right: 1rem;
  }

  .mobile-menu {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    background: var(--dark-primary);
    padding: 1rem 2rem;
    gap: 1rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }

  .mobile-links {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .mobile-link {
    font-size: 1.1rem;
    color: var(--dark-fonts);
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
  }

  .mobile-link:hover {
    color: var(--dark-teal);
  }

  .mobile-menu.hidden {
    display: none;
  }

}
```

There was a state conflict between `setMenuOpen()` and `setProfileOpen()` when the profile link was placed inside the mobile menu. I therefore kept the profile link as an icon in the navigation bar next to the hamburger icon.

I also added a listener to automatically close the mobile menu if the window was resized: 

```
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setMenuOpen(false)
            }
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])
```

#### 3)  Source Texts & Translations

I had to rethink how to connect the source texts and translations to the tasks (and to each other) in the frontend. I refactored the Task Details component to add conditional rendering for the texts and translations. If a translation is added when creating a task, only the translation link will appear in the Task Details. I also fixed the Create Translation and Edit Translation components to ensure that the associated source text was displayed. 

As the result, the workflow is now much smoother and more intuitive for users. 

#### 4) AI Translation

Finally, I’m currently integrating an AI translation API into the backend for this project. The Django REST backend will serve as a proxy for translation requests to ensure that the API key is secure. 

The frontend will enable users to automatically generate translations in the Create Translation form. A `handleTranslate` function will send the source text to the backend via an Axios call. The backend will then retrieve the AI-generated translation from the API and return it to the frontend. The `handleSubmit` function will then send the finalised translation to the backend for storage.


## Wins

- State Management: balanced the tradeoffs of prop drilling versus using context to ensure a clean data flow and code readability
- Successful Third-Party Integration: extended the app’s functionality to deliver a polished, professional-looking product within a short time-frame
- Robust User Authentication:  implemented user authentication and protected routes to ensure a smooth user experience across the app


## Key Learnings

During the development, I became much more comfortable with refactoring code to improve functionality and ensure maintainbility. I identified areas for improvement and changed the code or even the architecture both to integrate new features and improve existing ones. 

Handling multiple interactive features that relied on contextual data tested my skills in state management, prop drilling, and context usage. It also highlighted the importance of separating concerns for cleaner and more modular code that is easier to debug and scale. 

I also learned the key differences between integrating third-party services like Cloudinary – which supports unsigned uploads without providing access to your account – and integrating a translation API which uses account-level authentication and requires all calls to be made from the backend. 


## Bugs

##### Sign up

The JWT includes the full user object which is not ideal. If a user uploads a profile image and the image URL is too long, this causes the JWT to exceed its size limits and breaks the encoding/decoding. The user is then unable to sign in and access the app. 

A solution is currently being implemented on the backend to store only the user ID in the JWT and retrieve user data from the API instead. 


## Future Improvements

#### 1) File formats

Users are able to upload a file instead of typing out the source text in the text editor. However, the current setup only allows .txt files to be uploaded. Accepting the most common file formats would improve the user experience. 


#### 2) Archive Feature

It is currently possible for users to create and edit their profiles but not to delete their accounts. This is because the projects they have created and tasks assigned to them would then have to be transferred to another user. A fix is currently underway to allow for this and to archive users. 


#### 3) Text Analysis

A word count for both the source texts and translations is already included in the text editor. However, it would be useful to add text analysis features for the purposes of SEO and quality assurance. 


#### 4) Termbases

I plan to implement the termbases (which are already set up on the backend) so that this resource is available to search and edit (by adding new terms) in the Create and Edit Translation components.   


#### 5) Feedback

A Feedback field was also included on the data models for source texts and translations. This will function like a comments feature, allowing reviewers to leave feedback for the copywriter or translator. 









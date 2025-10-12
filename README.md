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


<img width="632" height="284" alt="Catseye_ComponentArchitecture" src="https://github.com/user-attachments/assets/5de6cf44-d2c2-44d9-82f5-57a94fe35358" />


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


<img width="1041" height="389" alt="Catseye_DraggableTask" src="https://github.com/user-attachments/assets/03e525a7-1751-4037-abd3-39dd1a8a9e21" />



#### 5) Reusable Image Upload

I took this component from my previous project on the GA Software Engineering Bootcamp and refactored it to make it more flexible and reusable: 

- The `multiple` prop allows the same component to handle either single or multiple uploads
- The upload logic checks if the field should accept multiple files and updates the form state (storing a single URL string or appending new URLs to an array)
- Conditional rendering to change how image previews are displayed for single and multiple uploads
- The `accept=“image/*` attribute allows better input validation


#### 6) Source Texts & Translations

To keep the UI organised and easy to use, the source texts (and related translations) are accessed via the tasks. When creating a new task, the user can select an existing resource or “Create new”/“None” depending. The source text and/or translation can then be accessed via the link in the task details: 

The Edit Translation page component then displays the source text and translation side-by-side:  

<img width="1040" height="407" alt="Catseye_EditTranslation" src="https://github.com/user-attachments/assets/a2396bd5-168c-41a0-8689-47f7232e0f2a" />


 #### 5) Text Editor & File Upload

I integrated a rich-text editor to enable the user to write and edit source texts and translations directly in the UI. I initially experimented with Slate React but ran into compatibility issues with React 19 so I switched to Lexical, which offered better performance and support. 

To manage the editor state, I created a custom plugin and integrated this into both the create and edit forms: 


<img width="1036" height="459" alt="Catseye_TextEditor" src="https://github.com/user-attachments/assets/724a8f5e-5cf0-41b4-aae3-2d0cc7b608d4" />



For a more flexible and user-friendly experience, I also added a feature that allows users to upload an existing text file (.txt). The text from the file is saved as a string in the database and then be retrieved, parsed, and loaded into the Lexical text editor for editing: 

<img width="1044" height="499" alt="Catseye_FileUpload" src="https://github.com/user-attachments/assets/ed7993b7-a1c0-4cd7-92bc-6f153a928dc7" />


### Challenges


#### 1) Prop Drilling & Passing Relationships

The modal components were tricky to implement because they relied on contextual information (e.g. the task object and project ID). If the prop wasn’t passed correctly through intermediary components, this caused errors and made it difficult to achieve the intended functionality.   

I tried to avoid tight coupling between modals and the component structure wherever possible. However, when developing the Kanban board, I had to pass several props (`task`, `taskId`, `onTaskUpdated`, `onTaskDeleted`) through the component tree due to the interactions between modals: 

<img width="1040" height="151" alt="Catseye_TasksComponentTree" src="https://github.com/user-attachments/assets/03bfe0fa-7bc8-46a2-b578-e1a6dcfeeb7d" />


This solution works well for the Minimum Viable Product (MVP). For future scalability, a better approach might be to use React Context to manage modal state and shared contextual data (e.g. `task` and `projectId`).



#### 2) State Management & Persistence

In addition to managing the state locally, the Kanban board also needed to synchronise task statuses with the backend. When the tasks are dragged to a different column (e.g. from “Review” to “Done”), the new status had to be saved in the database.  

I added a separate helper function `taskUpdateStatus` and modified the handleTaskDrop function in the component to optimistically update the UI while simultaneously sending a request to the backend to persist the change:

<img width="1031" height="514" alt="Catseye_handleTaskDrop" src="https://github.com/user-attachments/assets/021f32f2-6bb9-422a-9b40-58b9776f7489" />


#### 3) Text Editor (converting to JSON)

The Lexical rich-text editor stores its state in a JSON object so I had to convert this into a string before sending it to the Django API for database storage. I then had to use JSON.parse() when retrieving the text from the API to restore the editor’s internal state (and preserve the text formatting):

<img width="1043" height="520" alt="Catseye_EditabilityPlugin" src="https://github.com/user-attachments/assets/e6475ae5-4b4f-4eff-8d39-e6f2e1446297" />


## Fixes

Since delivering the project in September 2025, I have made a number of improvements to fix bugs and enhance the UX: 


#### 1) Edit Profile Form

The user’s team was not displayed correctly in the edit form so I updated the serializer on the backend (see catseye-backend ReadMe) and added the following line of code to correctly retrieve the associated team from the API:  

`team: user.team ? (typeof user.team === 'object' ? String(user.team.id) : String(user.team)) : ‘’,`

The form also opened as a modal over the sidebar, which was visually confusing and made the UI feel heavy and difficult to use. I refactored the Profile Details component to support inline editing inside the sidebar:

<img width="1035" height="295" alt="Catseye_EditProfileDetails" src="https://github.com/user-attachments/assets/f948b231-d7e5-447d-b034-1d0ecb8c3d23" />

Although this solution combines the Show and Update operations in a single component, the code is still readable and the UI is now much cleaner and more user-friendly.


#### 2) Hamburger Menu

The navigation menu was not displaying properly on smaller screens. Although this app is mostly likely to be used on desktop, I implemented a hamburger menu for mobile devices: 

<img width="1038" height="616" alt="Catseye_HamburgerCSS" src="https://github.com/user-attachments/assets/2dcfdcec-ca9d-40ed-9deb-e25d3f3c2f84" />


There was a state conflict between `setMenuOpen()` and `setProfileOpen()` when the profile link was placed inside the mobile menu. I therefore kept the profile link as an icon in the navigation bar next to the hamburger icon.

I also added a listener to automatically close the mobile menu if the window was resized: 

<img width="1041" height="225" alt="Catseye_HamburgerWindowResize" src="https://github.com/user-attachments/assets/bb75d71d-a4cb-465c-be40-c4bafb44121d" />


#### 3)  Source Texts & Translations

I had to rethink how to connect the source texts and translations to the tasks (and to each other) in the frontend. I refactored the Task Details component to add conditional rendering for the texts and translations. If a translation is added when creating a task, only the translation link will appear in the Task Details. I also fixed the Create Translation and Edit Translation components to ensure that the associated source text was displayed. 

As the result, the workflow is now much smoother and more intuitive for users. 

#### 4) AI Translation

Finally, I’m currently integrating an AI translation API into the backend for this project. The Django REST backend will serve as a proxy for translation requests to ensure that the API key is secure. 

The frontend will enable users to automatically generate translations in the Create Translation form. A `handleTranslate` function will send the source text to the backend via an Axios call. The backend will then retrieve the AI-generated translation from the API and return it to the frontend. The `handleSubmit` function will then send the finalised translation to the backend for storage.


## Wins

- State Management: balanced the tradeoffs of prop drilling versus using context to ensure a clean data flow and code readability
- Successful Third-Party Integration: extended the app’s functionality to deliver a polished, professional-looking product within a short-time frame
- Robust User Authentication:  implemented user authentication and protected routes to ensure a smooth user experience across the app


## Key Learnings

During the development, I became much more comfortable with refactoring code to improve functionality and ensure maintainbility. I identified areas for improvement and changed the code or even the architecture both to integrate new features and improve existing ones. 

Handling multiple interactive features that relied on contextual data tested my skills in state management, prop drilling, and context usage. It also highlighted the importance of separating concerns for cleaner and more modular code that is easier to debug and scale. 

I also learned the key differences between integrating third-party services like Cloudinary – which supports unsigned uploads without providing access to your account – and integrating a translation API which uses account-level authentication and requires all calls to be made from the backend. 


## Bugs

There are no bugs associated with the current features and the app is working as expected. 


## Future Improvements

#### 1) Archive Feature

It is currently possible for users to create and edit their profiles but not to delete their accounts. This is because the projects they have created and tasks assigned to them would then have to be transferred to another user. A fix is currently underway to allow for this and to archive users. 


#### 2) Text Analysis

A word count for both the source texts and translations is already included in the text editor. However, it would be useful to add text analysis features for the purposes of SEO and quality assurance. 


#### 3) Desktop Version

A desktop version of the app so that users can download if they prefer not to work directly in their browser.






# Catseye - A CAT tool & project management app in one
by Katie Hill 


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


<img width="630" height="295" alt="Catseye_frontendarchitecture" src="https://github.com/user-attachments/assets/c6c08c43-dcac-4a97-85fc-057d92492423" />


## Build







### Challenges


#### 1) Refresh Token 

When generating a fresh token, the specific settings included in the serializer were ignored and a standard token was generated instead (without the user information). 

The solution was to manually generate the token with `TokenSerializer.get_token(serialized_user.instance)` to include the user in the payload:


<img width="629" height="305" alt="Catseye_RefreshTokenFix" src="https://github.com/user-attachments/assets/ed3769a7-88fd-4edc-9052-1bee9c877141" />


#### 2) User Profile Update

The user’s team was not returned correctly in the update profile response so I changed the OwnerSerializer and TokenSerializer to include the full team object (including the id and name): 


<img width="629" height="499" alt="Catseye_EditUserProfileFix" src="https://github.com/user-attachments/assets/2166fbf7-c442-46d6-801d-56ba758dbd79" />


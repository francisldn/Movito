# Frontend Mentor - Movie web app

***Note: Sign in using a randomly created account or you may use the login account below:***
<br />
*Email Address: user1@gmail.com
Password: 123456*

<img src="/public/login.png" alt="login page">

<img src="/public/movie-app.png" alt="movie-app">

Frontend hosted on [Vercel](https://movie-app-chi-nine.vercel.app/)
## Welcome! 👋

## The challenge
User requirements:
- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Navigate between Home, Movies, TV Series, and Bookmarked Shows pages
- Add/Remove bookmarks from all movies and TV series
- Search for relevant shows on all pages
- **Bonus**: Build this project as a full-stack application --> this requirement has been included with Firebase serving as the backend for user authentication and database
- **Bonus**: If you're building a full-stack app, we provide authentication screen (sign-up/login) designs if you'd like to create an auth flow --> this requirement has been included in this app, so user can create an account and add movies to their favourite list

Data for the movie information is contained in the `data.json` file under public folder. The data has been uploaded to Firestore which serves as the backend of the app.
### Expected Behaviour
- General
  - The navigation menu should be fixed to the left for larger screens. Use the "Desktop - Home" page in the design as a visual reference.
- Home
  - The trending section should scroll sideways to reveal other trending shows
  - Any search input should search through all shows (i.e. all movies and TV series)
- Movies
  - This page should only display shows with the "Movie" category
  - Any search input should search through all movies
- TV Series
  - This page should only display shows with the "TV Series" category
  - Any search input should search through all TV series
- Bookmarked Shows
  - This page should display all bookmarked shows from both categories
  - Any search input should search through all bookmarked shows

### Challenges Faced and My Learnings
***Firebase/Firestore for Auth and Storage***
* Learning how to use Firebase/Firestore to do user authentication and CRUD operations is certainly a major learning point for me. 
  * For initial data bulk upload to Firestore, while it is possible to write a NodeJS script to do this, to save time, I have used Refi App (https://refiapp.io/) to do the job. This app provides a really easy interface for bulk uploading data to Firestore and it is sync-ed to Firestore seamlessly. 
  * Querying, adding and updating data in Firestore is relatively easy with clear documentation provided
  * Setting up user authentication flow is another major learning point for me. This includes the logic of re-directing users who are not authenticated to the login page and using Firebase event listener to monitor the user auth state changes. 
  * After a user has signed up, the workflow includes adding the user to Firestore and using the user profile to store and update the bookmarks. Learning how to implement this has also been hugely beneficial for my learning journey
***NextJS API rendering***
* Learning how to deal with API data flows in NextJS is also major thing which I learnt. NextJS has a certain workflow which differs from the normal React API rendering workflow (ie. via ``useEffect`` hook). I have to use ``getServerSideProps`` and ``getStaticProps`` for getting data from API. And the API rendering components only interact with pages, not other components. 
***Learn to love TailwindCSS***
* Having used Tailwind CSS for the past 2 projects, I start to be more efficient in using this CSS utility tool which really saves me a lot of time. It is especially useful and convenient for creating responsive layout.  
***React-Hook-Form for User Authentication and Input Validation***
* Learnt how to use another great tool for creating form and validating user input - ``react-hook-form`` package. 

## How to use
Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example with-tailwindcss with-tailwindcss-app
# or
yarn create next-app --example with-tailwindcss with-tailwindcss-app
# or
pnpm create next-app --example with-tailwindcss with-tailwindcss-app
```

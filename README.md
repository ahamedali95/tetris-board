Tetris Board Application

First of all I want to thank the DRW team for allowing me to take this challenge. Definitely 
enjoyed every bit of it; initially got frustrated but after I break down the program, it is much easier.

Application Overview:

The is a single-page application built using React and other accompanying libraries surrounding
React. These tools are:

1. React - library to build UI components.
2. Material UI React - library consists of pre-built React components that offers fast and seamless development.
3. TypeScript - programming language the extends JS and offers a vast typed ecosystem
4. Webpack - module bundler that takes pieces of JS and its dependencies and bundles them in to a single deployable artifact, thus
 allowing us to build single page applications.
5. Jest - unit testing framework for modern JS applications.
6. React testing library - testing library that works with Jest to make it easier to test React components from the perspective of the user.
7. ESLint - static analysis tool for JS applications.
8. HTML Canvas - a html feature allowing us to use Canvas API to draw 2D graphics to the screen.

Note: Project follows typical unopinionated folder structure that grouped files based on types, rather than features.

Highlights of my work:

1. Notice! Project is not bootstrap using create-react-app. Rather I setup everything from scratch, including configurations for webpack
(flexibly handled for dev and prod environments), ESLint, Jest and ESLint and TypeScript. It allowed me to conquer and control the entire ecosystem! Yes! Yes! Yes!

2. Utilized React hooks to design my application completely. It made code easy to read and intuitive.

3. Followed React recommended patterns such as container vs. presentational and controller vs. uncontrolled to design my
React components. That allowed to design each component in such a manner that components have their its own responsibility
and allowed them to be reusable and easily testable.

4. Integrated a CI-CD platform with Github Workflow and Firebase Cloud Platform. It allowed me to perform iterative development.

Instructions to run the application locally:

1. Please use v14.18.2 of nodeJS or closer to run this application
2. Install dependencies using `npm ci`
3. Run the application using `npm start` This will start the application at http://localhost:3000
4. Only a single route is necessary which is the base path `/` to access the entire application
5. Run unit tests using `npm run test` A coverage report is generated
6. Perform static analysis using `npm run lint` and `npm run check:typings`
7. Checkout other scripts in package.json that allows you to perform other actions


Application is deployed to Firebase and it can be accessed using this url: https://sholy-frontend.web.app/
CI-CD visual workflow can be viewed here: https://github.com/ahamedali95/url-shortener-frontend/actions
For in-depth understanding of pipeline details, view: `<rootDir>/.github/workflows/deployment.yml`

Thank you for testing out my app!
- Ahamed
───────────▓▓▓▓─────────▓▓▓
──────────▓▓▓▓▓▓▓─────▓▓▓▓▓▓
───▓▓▓▓────▓▓▓▓▓▓▓───▓▓▓▓▓▓▓
─▓▓▓▓▓▓▓▓▓───▓▓▓▓▓──▓▓▓▓▓▓
──▓▓▓▓▓▓▓▓▓▓──▓▓▓▓─▓▓▓▓─────▓▓▓▓
──────────▓▓▓▓──▓▓─▓▓───▓▓▓▓▓▓▓▓▓▓
──▓▓▓▓▓▓▓─────────────▓▓▓▓▓▓▓▓▓▓▓▓
─▓▓▓▓▓▓▓▓▓▓───███████─────────▓▓▓
▓▓▓▓▓────────███▓▓▓███───▓▓▓▓
▓▓─────▓▓▓▓▓─███▓▓▓███──▓▓▓▓▓▓▓▓▓
────▓▓▓▓▓▓▓────█████────────▓▓▓▓▓▓
─▓▓▓▓▓▓▓▓───▓▓─────────▓▓▓▓───▓▓▓▓
▓▓▓▓▓▓▓───▓▓▓▓──▓▓─▓▓▓──▓▓▓▓▓──▓▓
▓▓▓▓▓▓──▓▓▓▓▓──▓▓▓──▓▓▓▓─▓▓▓▓▓
─▓▓▓───▓▓▓▓▓───▓▓▓──▓▓▓▓▓──▓▓▓▓
─────▓▓▓▓▓▓▓──▓▓▓▓▓─▓▓▓▓▓▓─▓▓▓▓▓
─────▓▓▓▓▓▓──▓▓▓▓▓▓──▓▓▓▓▓▓─▓▓▓▓
──────▓▓▓▓───▓▓▓▓▓▓──▓▓▓▓▓▓──▓▓▓
─────────────▓▓▓▓▓▓──▓▓▓▓▓▓
─────────────▓▓▓▓▓─██─▓▓▓▓
───────────────────██
──────▓▓───────────██
───────▓▓▓▓▓───────██
────────▓▓▓▓▓▓─────██
──────────▓▓▓▓▓────██───▓▓▓▓▓▓▓▓
───────────▓▓▓▓▓──██──▓▓▓▓▓▓▓▓
─────────────▓▓▓─██─▓▓▓▓▓▓▓▓
────────────────██─▓▓▓▓▓▓
───────────────██
──────────────██
─────────────██
────────────
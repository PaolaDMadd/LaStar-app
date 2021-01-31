# LaStar

![](client/LaStarDemo.mov)

This project aims to create a journal site where users can post their thoughts anonymously.

## How to start our blogging site
Fork and clone this repo `git clone` 

### Server side:
- Run `cd server` to go into the server folder.
- Run `npm install` to install all necessary dependencies.
- Run `npm start` to start the server.

### Client side 
to use Giphy Api you need a key you can create one on [Giphy DevelopersPage](https://developers.giphy.com/docs/api#quick-start-guide) once you have create your Giphy key 
- modify the `secret.example.js` file
- Run `npm install` to install all the dependencies.
- Run `npm run bundle` to start the client side.
- Then`open index.html` to see our site!


## Technologies used
Javascript, NodeJS,
Express, body-parser, CORS, fs
Figma, HTML, CSS
Mocha, Chai, SuperTest, NYC

## Process
1. Did some market research on layout and styling of other popular social media websites
2. Started by mapping out layout of site using Figma
3. Researched how to implement any required technologies for the project that we were unfamiliar with
4. Wrote some pseudo code to break down what was needed server side
5. Implemented features and functionalities
6. Test all features and functionalities and debug any issues
7. Implement styling to improve user experience

## Licence

## Wins
- Client side successfully sends data to server and can be accessed
- Server side can receive and send data back to client
- JSON file is external
- Use external GIPHY API to search and retrieve gifs
- Add animations to background

## Challenges
- Server can manipulate received data, for example adding a new unique id for each post as well as append like/dislike/love reaction count

## Bugs
- Some CSS styling issues when switch from dark mode to light mode

## Future Features
- create a secure log in
- Make reaction count visible to users
- Allow users to choose GIF from a grid of currently trending GIFs.
- Append GIFs to server
- Give replies the same functionality as posts e.g. give replies reaction functionality

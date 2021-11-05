# Tailwind-Editor
## HTML live editor with Tailwind CSS

##INSTRUCTIONS
- RUN button > use this when you have a custom value for tailwind classes.

## GOALS
- on each entry on code editor, it will make a request to the server, compile the new css of tailwind, and send the new html to the client iframe via ejs for easier injection of code.
- or just use ejs for all html.

- "open in new tab" function.

- communications with the server is only for saving uploaded images to image hosting site.

- add Unsplash api for easier image resource acquisition.

- login feature via replit,fb,google,password.

- each user can save their webpage on the server.

- buy me a coffee after login

##DEVELOPER NOTES
- ORIGINAL SOURCE: https://reactgo.com/build-your-own-html-editor/

- Loading css on iframe proved to be very difficult, I opted to use as a div wrapper for the simulated webpage.

- On npm scripts, I used npx, but since Tailwind is installed, it will not retrieve files anymore from npm and I can still compile the css via Tailwind CLI.

-[10/30/202] JIT functioning correctly but slow on the receiving of new classes.
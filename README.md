# Tailwind-Editor
## HTML live editor with Tailwind CSS

### HOW TO USE
- RUN button > use this when you have a custom value for tailwind classes.
- COMPILE AUTO/OFF > user preference if they want to auto compile or not.
- VIM Keys ON/OFF > use vim key bindings
- Open in New Tab > open in new tab the preview page
- SAVE > saves a file, if no name is given use the default name, auto delete the save file after a few days since this is free, as well as the css generated. 
- LOAD > loads a file.

### GOALS
- Free to use.
- Unsplash API.
- Buy me a coffee.
- Advertise that i am looking for a job.

### FEATURES TO ADD
- user can add custom classes using the @apply directive

### DEVELOPER NOTES
- ORIGINAL SOURCE FOR REFERENCE: https://reactgo.com/build-your-own-html-editor/

- On npm scripts, I used npx, but since Tailwind is installed, it will not retrieve files anymore from npm and I can still compile the css via Tailwind CLI.

- [10/30/2021] JIT functioning correctly but slow on the receiving of new classes in client side.
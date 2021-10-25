# Tailwind-Editor
## HTML live editor with Tailwind CSS

## GOALS
- the entire app is loaded on the client side on initial load. Regular res.sendFile
- must be able to use Tailwind JIT.
    - on each entry on code editor, it will make a request to the server, compile the new css of tailwind, and send the new html to the client iframe via ejs for easier injection of code.
    - or just use ejs for all html.
- "open in new tab" function.
- communications with the server is only for saving uploaded images to image hosting site.
- add Unsplash api for easier image resource acquisition.

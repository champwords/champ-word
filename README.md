# Word UNO starter

## Run the local prototype
Because `game.js` uses JavaScript modules, serve this folder through a local web server (not by opening `index.html` as a file). For example, use VS Code Live Server.

## Current status
This is a **local demo prototype**, not yet an online multiplayer release. The create/join buttons simulate a room in the current browser. The UI and basic card mechanics are provided so you can start testing the concept.

## Next steps for real online play
1. Create a Firebase project and register a Web app.
2. Enable Firebase Authentication (anonymous sign-in is suitable for an initial prototype).
3. Enable Cloud Firestore.
4. Implement callable Cloud Functions for room creation/joining, dealing, playing a card, drawing, penalty distribution, and round reset.
5. Make clients subscribe to public room state while keeping each player's hand private.
6. Replace the demo handlers in `game.js` with authenticated function calls and realtime listeners.
7. Deploy and test with multiple browser/device sessions.

The current +2/+4 demo effect gives every opponent 2/4 random cards. This local prototype is not secure and should not be exposed as a competitive public game until server-side validation and Firestore rules are completed.

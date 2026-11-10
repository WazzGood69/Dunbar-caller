# Dunbar Caller

Dunbar Caller is an early Android messaging prototype built with Capacitor and Firebase.

## Build an APK from your phone

The repository includes a GitHub Actions workflow at `.github/workflows/android.yml`.

1. Open the **Actions** tab in this repository.
2. Choose **Build Dunbar Caller APK**.
3. Open the latest run and wait for the build to finish.
4. Under **Artifacts**, download `dunbar-caller-debug-apk`.
5. Extract the downloaded ZIP on Android and install `app-debug.apk`. Android may ask you to allow installs from your browser or file manager.

Every push to `main` also starts a build automatically.

## Before online sign-in and messaging can work

The Android package can be compiled without Firebase credentials, but live accounts and messages require your own Firebase project:

1. Create a Firebase project at https://console.firebase.google.com/.
2. Add a Web App to that project and copy its Firebase config into `www/firebase-config.js`, replacing the `YOUR_...` placeholders.
3. In Firebase Authentication, enable **Phone** sign-in.
4. Create a Cloud Firestore database.
5. Deploy the included Firestore rules and Cloud Functions from a Firebase CLI environment:
   - `firebase deploy --only firestore:rules,functions`

The app uses verified phone sign-in, searchable usernames, server-side verified phone lookup, message requests, accepted contacts, and realtime text chat when Firebase is configured.

## Current limitations

- This is a development/debug APK, not a production release.
- Voice/video calling, push notifications, media sharing, and end-to-end encryption are not implemented.
- Do not use it for emergencies or sensitive communications.
- The repository currently contains no Firebase project credentials. Do not commit service-account keys, signing keys, passwords, or access tokens.

## Render signaling server (voice/video call connection setup)

The repository includes a Render Blueprint at `render.yaml` and a small PeerJS signaling server in `server/`.

1. Sign in to https://render.com/ on your phone and connect your GitHub account.
2. Choose **New** → **Blueprint** and select `WazzGood69/Dunbar-caller`.
3. Review the service named `dunbar-caller-signaling` and deploy it.
4. Wait until Render shows the service as **Live**. Its health endpoint should return JSON at `https://dunbar-caller-signaling.onrender.com/health`.
5. Install the next APK built by GitHub Actions. The approved interface has been configured to use this Render host for PeerJS signaling.

If Render says that service name is already taken, change the `name` in `render.yaml` and the `host` in `www/dunbar-caller-theme-baseline.html` to the exact `.onrender.com` hostname Render assigns, then commit the change so GitHub Actions rebuilds the APK.

### Calling limitations

Render hosts the PeerJS signaling service; it does **not** relay voice/video media. Calls use direct WebRTC connections and may fail on some mobile networks or restrictive routers until a TURN relay is configured. The current approved interface still stores profiles, contacts, and chat data locally and uses a temporary PeerJS directory; it is not yet connected to the Firebase accounts/messages backend. Treat this as an integration test, not a finished public calling service. Render's free service may sleep when idle, causing a delay on the first connection.

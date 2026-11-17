# Dunbar Caller

Dunbar Caller is a username-first internet hangout prototype for Android. It is not a carrier phone app.

## Identity and privacy

- No real phone numbers are requested, stored, or used.
- No SIM card, SMS code, phone verification, or carrier account is required.
- A person creates a local profile with a username (3–20 letters, numbers, or underscores), avatar, and color.
- The app generates a Dunbar Caller friend code for adding contacts.
- Voice/video controls use internet-based WebRTC, not cellular calling.

## Current prototype behavior

The current app uses a local profile and local browser storage. Contacts and messages are exchanged peer-to-peer through the PeerJS signaling service configured in the app. This is an experimental prototype, not a finished hosted social network: profiles are not yet backed by a central account database, and message history is not synced across devices. Do not treat it as private or end-to-end encrypted.

Voice/video calling may not connect on every network because the signaling service does not relay media and a TURN relay is not configured. Push notifications and reliable background delivery are not implemented.

## Build an APK

The repository includes a GitHub Actions workflow at `.github/workflows/android.yml`.

1. Open the **Actions** tab in this repository.
2. Choose **Build Dunbar Caller APK**.
3. Open the latest run and wait for the build to finish.
4. Under **Artifacts**, download the APK artifact.
5. Extract the ZIP on Android and install the APK. Android may ask you to allow installs from your browser or file manager.

Every push to `main` starts a build automatically.

## Signaling server

The repository includes a Render Blueprint at `render.yaml` and a PeerJS signaling server in `server/`.

1. Connect the repository to Render and deploy the Blueprint.
2. Confirm the service is live at its health endpoint: `/health`.
3. If Render assigns a different hostname, update the host in `www/dunbar-caller-theme-baseline.html` and commit the change.

The signaling server helps peers find each other; it does not store accounts or relay voice/video media.

## Safety and limitations

- This is a development/debug APK, not a production release.
- Do not use it for emergencies or sensitive communications.
- There is no phone-number authentication or phone-number lookup.
- Do not commit passwords, signing keys, service-account keys, or access tokens.

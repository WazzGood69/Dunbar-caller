# Dunbar Caller

Android app project for Dunbar Caller.

## Cloud APK build

The GitHub Actions workflow at `.github/workflows/android.yml` builds a **debug APK** on every push to `main`, or manually from the Actions tab.

1. Add the contents of the Dunbar Caller Android starter project to the repository root (the `package.json`, `capacitor.config.json`, `www/`, `functions/`, and Firebase files).
2. Open **Actions → Build Dunbar Caller APK → Run workflow**.
3. Wait for the run to finish, open the run, and download the `dunbar-caller-debug-apk` artifact.
4. On your Android phone, extract the downloaded ZIP and install the APK. Android may ask you to allow installs from your browser or file manager.

## Important

- A successful APK build does not configure Firebase. Set up a Firebase project and replace the placeholder values in `www/firebase-config.js` before signing in or messaging can work.
- The starter currently supports the app shell, Firebase phone authentication, username/phone lookup, message requests, and realtime text messaging when Firebase is configured.
- Voice/video calls, push notifications, media uploads, end-to-end encryption, and production abuse protections are not included yet.
- This is a development build, not a production-ready public messenger.
- Never commit Firebase service-account keys, signing keys, passwords, or access tokens.

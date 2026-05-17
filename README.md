# FormCoach AI Fitness System

FormCoach is an advanced, AI-powered fitness application built with React, Vite, and Zustand. It provides users with dynamic workout adjustments, form check analysis, and consistency tracking wrapped in a premium, silent high-performance "dark mode" aesthetic.

## Features

- **Dynamic Workouts:** Start, adjust, and track live sessions with an interactive interface.
- **AI Coach Integration:** Receive real-time telemetry on form and body insights.
- **Progress Tracking:** Deep insights into body composition, strength curves, and consistency streaks.
- **Exercise Library:** Browse and filter exercises by muscle group and equipment.

## Tech Stack

- **Framework:** React 19 + Vite
- **Language:** TypeScript
- **State Management:** Zustand
- **Styling:** Custom CSS (Silent High-Performance Dark Mode)
- **Icons:** Custom SVG and Feather icons

---

## Deployment Guide: Apple App Store & Google Play Store

We will deploy this web application as a native mobile app using **Capacitor**.

### Prerequisites

1. **Node.js** (v18+)
2. **Android Studio** (For Google Play Store deployment)
3. **Xcode** (For Apple App Store deployment - requires a Mac)
4. **Capacitor CLI** installed globally (`npm i -g @capacitor/cli`)

### Step 1: Install Capacitor

Inside the project directory, run:
```bash
npm install @capacitor/core @capacitor/ios @capacitor/android
npm install -D @capacitor/cli
```

### Step 2: Initialize Capacitor

```bash
npx cap init FormCoach com.formcoach.app
```
*Note: Make sure your `capacitor.config.ts` points the `webDir` to `dist`.*

### Step 3: Build the Web App

Compile the production bundle of the React app:
```bash
npm run build
```

### Step 4: Add Native Platforms

```bash
npx cap add ios
npx cap add android
```

### Step 5: Sync Web Code to Native Projects

Every time you run `npm run build` and update the web code, you must sync it to the iOS and Android folders:
```bash
npx cap sync
```

---

## Deploying to Apple App Store (iOS)

1. Open the project in Xcode:
   ```bash
   npx cap open ios
   ```
2. In Xcode, configure your **Signing & Capabilities**. Select your Apple Developer Team.
3. Update App Icons and Splash Screens in `Assets.xcassets`.
4. Select the target device as **Any iOS Device (arm64)**.
5. Go to **Product > Archive**.
6. Once archived, click **Distribute App** and follow the prompts to upload it to **App Store Connect** / TestFlight.

## Deploying to Google Play Store (Android)

1. Open the project in Android Studio:
   ```bash
   npx cap open android
   ```
2. Wait for Gradle to sync completely.
3. Update App Icons in `res/mipmap` and the `AndroidManifest.xml` if needed.
4. Go to **Build > Generate Signed Bundle / APK...**.
5. Choose **Android App Bundle (.aab)**.
6. Create a new Key Store or select an existing one. Enter passwords and alias details.
7. Click **Finish** to build the `.aab` file.
8. Upload this `.aab` file to the **Google Play Console** under your app release track.

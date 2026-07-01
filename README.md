# SETU — Peace Intelligence Platform

SETU (Bridge) is an AI-powered intelligence platform designed to safeguard communal harmony through five specialized pillars.

🔗 **Live Demo:** [https://nishupr.github.io/setu/](https://nishupr.github.io/setu/)

## 🚀 The Five Pillars

1. **KAVACH (Early Warning System)**: District-level dashboard for real-time sentiment analysis and tension detection.
2. **SACHCHI (Fact-Check Center)**: Multilingual misinformation verification and deepfake detection tool.
3. **SANGAM (Community Dialogue)**: AI-moderated anonymous spaces for cross-community conversations.
4. **DASTAAN (Memory Archive)**: A living digital museum of survivor narratives and interactive history.
5. **PANAH (Displaced Person Support)**: Digital ID management and family reunification hub.

## 📁 Project Structure

```
/html/
  index.html           SETU Home
  kavach.html          Early Warning Dashboard
  sachchi.html         Fact-Check Center
  sangam.html          Community Dialogue
  dastaan.html         Memory Archive
  panah.html           Displaced Person Support
/css/
  index.css           Page-specific styles for index.html
  kavach.css          Page-specific styles for kavach.html
  sachchi.css         Page-specific styles for sachchi.html
  sangam.css          Page-specific styles for sangam.html
  dastaan.css         Page-specific styles for dastaan.html
  panah.css           Page-specific styles for panah.html
/js/
  tailwind-config.js  Shared Tailwind theme config (colors, fonts, spacing) used by all pages
  kavach.js           Page-specific interactions for kavach.html
  sachchi.js          Page-specific interactions for sachchi.html
  dastaan.js          Page-specific interactions for dastaan.html
  panah.js            Page-specific interactions for panah.html
/README.md            This file
```

`index.html` and `sangam.html` have no page-specific JS, so they only load `js/tailwind-config.js`.

## 🛠️ Deployment

Deployed via **GitHub Pages** at [nishupr.github.io/setu](https://nishupr.github.io/setu/), served from the `main` branch. Any updates pushed to `main` go live at the same URL after GitHub Pages rebuilds (usually within a minute or two).

---
*Developed with Shanti Peace Intelligence Design System.*

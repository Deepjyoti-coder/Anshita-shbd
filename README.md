# A Little World for Anshita ❤️
### A Cinematic, Interactive Romantic Experience for Anshita's Birthday
**Created with love by Deep, for Anshita**

---

## 1. Project Overview

**"A Little World for Anshita"** is a bespoke, cinematic interactive romantic website designed and built specifically for Anshita by Deep to celebrate her **Birthday**.

The narrative centers on their real connection in **Raipur, Chhattisgarh**:
- **Deep's Location:** Amity University Raipur
- **Anshita's Location:** Pandri, Raipur
- **The Distance:** Approximately 33 kilometers

> *"Some people don't need to be far away to be missed. Sometimes, even 33 kilometers feel like a thousand when all you want is to be with them."*

The experience is crafted like an interactive romantic movie—featuring slow-twinkling midnight stars, drifting rose petals, interactive city connections, personal letters, glassmorphism cards, and an emotional music player.

---

## 2. Key Features

- **Prologue (Scene 0):** Dramatic starlight intro with natural typewriter text reveal.
- **Two Places, One Little World (Scene 1):** Stylized Raipur nighttime map with animated glowing route, traveling light particles, and interactive glass info cards for Deep and Anshita.
- **Made Just for You (Scene 2):** Moonlit garden card with floating aurora lights and warm dedication.
- **The Day I Got Lost (Scene: The Faculty Room):** A cinematic memory replayed in warm afternoon sunlight, capturing the moment Deep first saw Anshita and got completely lost in her eyes.
- **3 September — The First Hello (Scene: First Conversation):** An elegant calendar date reveal with an animated golden ring and heartfelt narration of their very first conversation.
- **That Beautiful Smile (Scene 3):** Reveal of Anshita's radiant photo inside a champagne-gold luxury floating frame with rose illumination.
- **Maybe 9 Has Always Been Our Number (Scene: Birthdays):** Two floating glass cards for Anshita (25 October) and Deep (3 November) bridged by the glowing number 9 representing the nine-day gap between their birthdays.
- **The Universe Has Some Explaining to Do (Scene: Cosmic Theory of 9):** Rotating glowing 9 with three symbolic connections:
  1. *Our Birthdays:* 25 October → 3 November (9 days apart).
  2. *Navratri:* 9 sacred glowing lamps honoring the nine forms of divine feminine energy.
  3. *The Planets:* Miniature Solar System featuring 8 recognized planets and Pluto as a distinct dwarf planet.
  4. *Cosmic Synthesis:* Bringing together the 9-day gap, 9 nights of Navratri, and 900 reasons to smile.
- **A Few Things I Probably Shouldn't Say Out Loud (Scene: Flirty Messages):** An interactive 10-card message stepper with "ONE MORE LINE" button, progress pills, and a playful completion reveal card.
- **Only 33 Kilometers (Scene 5):** Interactive message highway with floating thought bubbles between Amity University and Pandri.
- **The Little Things I Love About You (Scene 6):** 3D-flipping glass cards celebrating Anshita's kindness, patience, smile, and their bestie bond.
- **Our Little Timeline & Milestones Track (Scene 7):** Configurable relationship counter plus 4 confirmed milestone cards:
  1. *The Faculty Room:* Our First Look.
  2. *3 September:* Our First Conversation.
  3. *25 October:* Anshita's Birthday.
  4. *3 November:* Deep's Birthday.
- **A Letter from Deep (Scene 4):** Cinematic unfolding parchment letter naturally integrating the faculty room first look, 3 September conversation, and the number 9 theory.
- **A Little Heart, Just for You (Scene 8):** Interactive crystal heart that beats and grows warmer on every tap, culminating in a celebration with starlight confetti.
- **A Sweet Handmade Surprise (Scene: Handmade):** 3D interactive showcase of all 6 handcrafted chocolate gift cards made by Deep (KitKat, Happydent, Munch Max, Perk Plus, 5 Star 3D, Silk Oreo) with handwritten quotes and zoom lightbox view.
- **Our Cherished Memories (Scene 9):** Interactive luxury photo gallery featuring all 6 real photos with custom romantic stories, next/previous navigation, polaroid filmstrip selector, and a full-screen zoom lightbox modal.
- **Until the Next Time (Scene 10):** Symbolic silhouettes walking toward each other across Raipur against a warm sunrise sky, plus a real-life couple memory keepsake of Deep & Anshita side by side.
- **Grand Finale (Scene 11):** Constellation heart formation with Deep's final letter, replay option, memory keeper, and the climax quote: *"Maybe nine is just a number. But 3 September, that first look in the faculty room, and the way you make me smile? Those are the little things that make this story ours."*
- **Floating Music Player:** Non-intrusive bottom-right player featuring Chopin's romantic piano instrumental (*Nocturne in E-flat Major, Op. 9 No. 2*), equalizer animation, scrubber, and time display. Never autoplays.

---

## 3. Technology Stack

- **HTML5:** Semantic structure, accessible landmarks, and ARIA attributes.
- **CSS3:** Pure handcrafted Vanilla CSS, custom properties (CSS variables), glassmorphism, 3D card flips, responsive flexbox/grid.
- **JavaScript (ES6+):** Pure Vanilla JS for timeline calculation, HTML5 Canvas animation, SVG path manipulation, audio player controls, and micro-interactions.
- **Permitted CDN Libraries:**
  - GSAP & ScrollTrigger (for smooth scroll reveals)
  - Canvas Confetti (for restrained, celebratory moments)
  - Google Fonts: *Great Vibes* (headings/signatures), *Poppins* (body), and *Montserrat* (labels & buttons).

---

## 4. Project Structure

```text
anshita-special/
│
├── index.html                  # Main HTML5 semantic document (all 12 scenes)
├── style.css                   # Dark-romantic styling, animations & responsiveness
├── script.js                   # Interactive timeline, canvas stars, & audio player
├── README.md                   # Full documentation & beginner customization guide
│
└── assets/
    ├── images/
    │   ├── img_1.jpg           # Memory 1: Poise & Grace (Scene 3 & Gallery)
    │   ├── img_2.jpg           # Memory 2: Walking in Light
    │   ├── img_3.jpg           # Memory 3: Playful Candid
    │   ├── img_4.jpg           # Memory 4: Golden Hour Sunset
    │   ├── img_5.jpg           # Memory 5: Forever Special / Captivating Eyes
    │   ├── img_6.jpg           # Memory 6: Deep & Anshita Together (Scene 10 & Gallery)
    │   ├── handmade-1.jpg      # KitKat ("Never want to take a break from you")
    │   ├── handmade-2.jpg      # Happydent ("For the smile I always love to see")
    │   ├── handmade-3.jpg      # Munch Max ("Life is much better with you")
    │   ├── handmade-4.jpg      # Perk Plus ("Thanks for being the Perk in my life")
    │   ├── handmade-5.jpg      # 5 Star 3D ("5 Stars for always listening to me")
    │   └── handmade-6.jpg      # Silk Oreo ("Always melting my heart")
    │
    ├── music/
    │   └── romantic-piano.mp3  # Calming romantic piano track
    │
    └── icons/
        ├── heart.svg
        ├── location.svg
        ├── music.svg
        └── star.svg
```

---

## 5. How to Run Locally

### Option A: Direct Open (Simplest)
You can simply double-click `index.html` to open the website in any modern web browser (Chrome, Edge, Safari, Firefox).

### Option B: Using a Local Development Server (Recommended)
Running a local web server ensures seamless loading of audio files and assets without browser security restrictions:

**Using Python:**
```bash
# In the project root directory:
python -m http.server 8000
```
Then open your browser and navigate to: `http://localhost:8000`

**Using Node.js (npx):**
```bash
npx serve .
```

---

## 6. Beginner Customization Guide

### A. How to Replace Photo 1 (`assets/images/anshita-photo-1.jpg`)
1. Choose a clear, lovely photo of Anshita for **Scene 3** ("That Beautiful Smile").
2. Rename your photo file to `anshita-photo-1.jpg`.
3. Copy and paste it into the `assets/images/` folder, replacing the existing file.
4. Refresh your browser! The frame automatically fits your photo while preserving its natural aspect ratio.

### B. How to Replace Photo 2 (`assets/images/anshita-photo-2.jpg`)
1. Choose a second cherished photo of Anshita for **Scene 9** ("One More Little Memory").
2. Rename the image to `anshita-photo-2.jpg`.
3. Copy and paste it into the `assets/images/` folder.
4. Refresh your browser. This photo only reveals itself near the end of the journey!

### C. How to Change or Add Music (`assets/music/romantic-piano.mp3`)
1. The project already comes with a soothing public-domain piano instrumental: Chopin's *Nocturne in E-Flat Major, Op. 9 No. 2*.
2. If you would like to use a different instrumental or romantic piano song, save your `.mp3` file as `romantic-piano.mp3`.
3. Replace the file inside `assets/music/romantic-piano.mp3`.
4. *Note:* In adherence to browser standards, music will never autoplay; Anshita can start playing it whenever she is ready by tapping the Play button in the bottom-right corner.

### D. How to Customize the Relationship Start Date
Open `script.js` in any text editor (VS Code, Notepad, etc.) and locate the top lines:

```javascript
/* ----------------------------------------------------------------------------
   RELATIONSHIP TIMELINE CONFIGURATION
   ---------------------------------------------------------------------------- */
const RELATIONSHIP_START_DATE = "YYYY-MM-DD";
```

Change `"YYYY-MM-DD"` to your actual date (e.g. `"2024-03-15"`):
```javascript
const RELATIONSHIP_START_DATE = "2024-03-15";
```
Save the file. When loaded, Scene 7 will now automatically display a live counter showing the exact number of **Days, Hours, Minutes, and Seconds** you have been together!

### E. How to Edit the Distance and Location Labels
All location labels are clearly defined in `index.html`:
- Search for `Amity University Raipur` or `Pandri, Raipur` to adjust the naming if desired.
- Search for `33 KM` in `index.html` to adjust the distance display.

### F. How to Personalize the Messages
All romantic paragraphs, letter text, and reasons are plain English text in `index.html`:
- **Scene 4 (Deep's Letter):** Edit the `<div class="letter-paragraphs">` section in `index.html`.
- **Scene 6 (The Little Things):** Edit any of the 9 cards in `<div class="cards-grid">`.
- **Scene 11 (Final Letter):** Edit `<div class="finale-letter-body">`.

---

## 7. Deployment Instructions (GitHub Pages)

You can easily host this website for free so Anshita can open it directly from a link on her phone:

1. Create a free account on [GitHub.com](https://github.com).
2. Create a new public repository named `little-world-for-anshita`.
3. Upload all project files (`index.html`, `style.css`, `script.js`, `README.md`, and the `assets/` folder).
4. Go to **Settings** > **Pages** in your repository.
5. Under **Branch**, select `main` (or `master`), folder `/ (root)`, and click **Save**.
6. GitHub will generate a live link (e.g., `https://yourusername.github.io/little-world-for-anshita/`).
7. Send the link to Anshita with love! ❤️

---

## 8. Accessibility & Performance Notes

- **Reduced Motion:** If a visitor has `prefers-reduced-motion` enabled in their operating system, particle canvases and heavy transforms are automatically disabled, while maintaining full romantic text readability.
- **Keyboard Navigation:** Every button, location marker, and glass card can be navigated using `Tab` and activated with `Enter` or `Space`.
- **Mobile First:** Designed and tested to look stunning on iPhones, Android devices, tablets, and wide monitors.

---

*Made with love by Deep, for Anshita. Happy Birthday!*

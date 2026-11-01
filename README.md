# Anil Babu & Ardra Meletath — Kerala Wedding Invitation Website

A luxury, Kerala-inspired single-page wedding invitation website created for **Anil Babu & Ardra Meletath**.

## Visual Design & Aesthetics
- **Full-Screen Hero**:
  - Detailed green Kerala banana leaf background element.
  - "ANIL & ARDRA" artistically blended directly into the banana leaf composition with an ornamental gold frame.
  - Authentic bride and groom photograph of Anil Babu & Ardra Meletath in elegant temple arch framing with subtle ivory/gold backdrop.
  - Traditional Kerala temple-style hanging brass oil lamps (Thookkuvilakku) confined strictly to the **LEFT and RIGHT edges** of the hero, keeping the center clear.
  - Floating warm golden sacred temple embers and sparkles canvas animation.
- **Richer Kerala Color Palette**:
  - Emerald green, warm temple gold, ivory, soft cream, and deep forest tones.
- **Official Royal Couple Portrait**:
  - The authentic couple photograph is featured in the hero and highlighted in the Sacred Invitation Card.
  - Zero peacock motifs, feathers, or lotus floral elements.
- **Dedicated Location & Venue Showcase**:
  - Authentic venue photograph of the Grand Arena at Chakolas Pavilion Convention Centre in Thrissur.
  - Standard place pin map (no route/directions preview) and prominent button opening `https://maps.app.goo.gl/K7cWqppcJANAemw76?g_st=ac`.
  - Contextual reference for morning Thalikettu at Guruvayur Sree Krishna Temple.
- **Symmetrical Event Cards**:
  - Shared component structure with strictly equal dimensions, matching icon areas, aligned venue rows, and synchronized location buttons on desktop and mobile.

## Exact Invitation Content
```
Anil Babu
with
Ardra Meletath

Daughter of Mrs. Saritha Prasad & Mr. Prasad Meletath

Villa 17, Sobha Silver Estate, Attore, Thrissur

Sunday, 20th December 2026 (1202 Dhanu 6)

THALIKETTU
At Guruvayur Sree Krishna Temple

WEDDING CEREMONY
At Chakolas Pavilion Convention Centre
Anchery Chira, Kuttanellur, Thrissur

Ceremony Begins at 11:30 AM followed by lunch

Sharing the happiness: Balu, Sanam and Saanvi

Presents in blessings only

RSVP: +91 6238 433 871
```

## Opening Loading Screen & Performance
- **Sacred Ivory Invitation Loader**:
  - Full-screen loading screen on warm ivory background (`#FAF6EF`) with subtle emerald botanical details, sacred Kerala Nilavilakku lamp with glowing flame, gold progress bar, Sanskrit benediction (`|| शुभं भवतु ||`), and "ANIL & ARDRA".
  - Preloads critical above-the-fold couple photograph and fonts.
  - Strict 1.8s maximum safety timeout prevents visitors from ever being trapped on slow networks.
  - Next-gen WebP imagery and compressed JPEGs reduce total image transfer by ~80% (over 1.7 MB saved).

## Background Music
- **Source**: YouTube (`vPY_oohGR34` - Sayee Rakshith Violin)
- **Browser-Compliant Autoplay**:
  - Requests autoplay on load without asking the visitor to click Play first.
  - If audible autoplay is restricted by browser policy (common on mobile), automatically falls back to buffered muted playback with an unobtrusive navbar control.
  - Seamless 1-tap unmuting on any first touch or tap without blocking prompts or confirmation modals.
  - Persistent accessible toggle with live equalizer wave indicating confirmed audio playback.

## Blessings & RSVP (No Backend)
- WhatsApp blessing button opens conversation with `+91 6238 433 871` pre-filled with:
  `"Congratulations, Anil Babu and Ardra Meletath! Sending you both love and blessings."`
- "Copy a Blessing" button with toast notification.
- Dedicated Call and WhatsApp RSVP actions.

## Development & Build
```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

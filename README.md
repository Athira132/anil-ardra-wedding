# Anil & Ardra — Wedding Invitation Website

A luxury, Kerala-inspired single-page wedding invitation website created for **Anil & Ardra**.

## Visual Design & Aesthetics
- **Color Palette**: Botanical pastel green, sage green, off-white, warm cream, soft blush pink, very light peach, and subtle muted gold accents.
- **Kerala Botanical Motifs**:
  - Sacret Lotus flowers (transparent vector illustration with delicate pink petals and gold core)
  - Artistic hand-painted Kerala peacock perched gracefully
  - Kerala banana plant foliage framing the layout with smooth parallax scrolling (no fruit/bananas)
  - Floating lotus petals canvas particle animation
- **Typography**:
  - Royal serif: `Cinzel`
  - Body & quotes: `Cormorant Garamond`
  - Romantic script accents: `Pinyon Script`
  - Clean UI: `Plus Jakarta Sans`

## Page Sections
1. **Hero / Opening**: Couple names `ANIL & ARDRA`, botanical framing, editable date & venue badges, and animated scroll cue.
2. **Our Story**: Asymmetric editorial layout with organic arch frames, thin muted-gold borders, and couple portraits.
3. **Wedding Day**: Auspicious details cards for DATE, TIME, and VENUE with subtle hover lift and decorative lotus connectors + "Add to Calendar" `.ics` export.
4. **Ceremony (Join Us)**: Centered invitation card with auspicious Kerala motifs and typography.
5. **Photo Gallery**: Editorial masonry gallery with lightbox zoom, subtle rotational tilts, and captions.
6. **Where We Celebrate**: Venue location card with directions note and Google Maps link.
7. **Interactive Blessings**: Real-time guestbook where guests can send heartfelt blessings (saved to local storage).
8. **Closing**: Botanical closing composition with couple names and family sign-off.
9. **Minimal Floating Navigation**: Transparent pill navigation with smooth scroll spy and mobile menu drawer.
10. **Ambient Audio**: Web Audio API synthesized classical ragam arpeggiator & tanpura drone (user initiated, no autoplay).

## Easy Image & Content Replacement
All images are organized in `public/images/`:
- `couple-hero.jpg` — Hero couple photograph
- `couple-story-1.jpg` — Primary story couple photograph
- `couple-story-2.jpg` — Candid secondary couple photograph
- `gallery-1.jpg` to `gallery-6.jpg` — Photo gallery images
- `peacock-art.jpg` — Decorative Kerala peacock artwork
- `banana-leaf-art.jpg` — Kerala banana plant foliage
- `lotus-art.svg` — Sacred lotus blossom illustration

Editable placeholders for Date, Time, and Venue are clearly marked in `index.html` with class `.editable-field`.

## Development & Build
```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

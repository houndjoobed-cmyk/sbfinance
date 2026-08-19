---
name: Fiscal Precision
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#45464f'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#757680'
  outline-variant: '#c5c6d0'
  surface-tint: '#4d5d8a'
  primary: '#00123c'
  on-primary: '#ffffff'
  primary-container: '#172852'
  on-primary-container: '#8090c0'
  inverse-primary: '#b5c5f9'
  secondary: '#4852c1'
  on-secondary: '#ffffff'
  secondary-container: '#828bfe'
  on-secondary-container: '#0f1791'
  tertiary: '#2c0b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#4d1a00'
  on-tertiary-container: '#e27139'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae1ff'
  primary-fixed-dim: '#b5c5f9'
  on-primary-fixed: '#051943'
  on-primary-fixed-variant: '#354571'
  secondary-fixed: '#e0e0ff'
  secondary-fixed-dim: '#bec2ff'
  on-secondary-fixed: '#00036b'
  on-secondary-fixed-variant: '#2f38a8'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb595'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#7c2e00'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
  trust-navy: '#172852'
  accent-royal: '#3740B0'
  action-orange: '#F17D44'
  surface-muted: '#F5F5F5'
  text-charcoal: '#1A1A1A'
typography:
  display-hero:
    fontFamily: Montserrat
    fontSize: 56px
    fontWeight: '700'
    lineHeight: '1.1'
  display-hero-mobile:
    fontFamily: Montserrat
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Open Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Open Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Montserrat
    fontSize: 13px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  button-text:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.0'
spacing:
  container-max: 1200px
  gutter: 30px
  section-padding-vertical: 80px
  unit-base: 8px
---

## Brand & Style
The design system embodies an **Institutional & Corporate** personality, specifically tailored for high-stakes financial environments where trust and precision are paramount. It targets a professional audience that values clarity, stability, and proven results.

The visual style is **Corporate / Modern**, leaning heavily into "Flat 2.0" principles. It utilizes a structured grid, generous whitespace, and sharp edges to communicate architectural integrity. While the palette is traditional, the application of vibrant blue gradients and gold accents ensures the interface feels contemporary and high-performance rather than dated or bureaucratic.

## Colors
The palette is built on a foundation of "Trust Navy" to establish authority. "Accent Royal" is used for interactive elements and brand identifiers, while "Action Orange" provides a high-contrast signal for call-to-actions and critical alerts.

- **Primary (Trust Navy):** Used for navigation bars, primary headings, and footer backgrounds.
- **Secondary (Accent Royal):** Applied to active states, icons, and secondary buttons.
- **Tertiary (Action Orange):** Reserved for high-conversion buttons and status indicators.
- **Neutrals:** A range of grays from `#F5F5F5` for section backgrounds to `#1A1A1A` for maximum text legibility.

## Typography
The system uses **Montserrat** for headings and labels to project a geometric, modern confidence. **Open Sans** is selected for body copy to ensure maximum readability across long-form financial reports and service descriptions.

Hierarchy is maintained through dramatic scale shifts between "Display" and "Body" styles. Subtitles and meta-information should frequently use the `label-caps` style (all-caps with tracking) to distinguish them from standard prose.

## Layout & Spacing
This design system utilizes a **Fixed Grid** model for desktop, centered within a 1200px container. The layout follows an 8px rhythmic grid to ensure consistent vertical spacing between elements.

- **Desktop:** 12-column grid with 30px gutters. Major sections are separated by 80px to 100px of vertical padding to allow content to breathe.
- **Tablet:** 8-column grid with 20px gutters. Section padding reduces to 60px.
- **Mobile:** Single column layout with 16px side margins. Typography scales down specifically for the hero section to prevent awkward line breaks.

## Elevation & Depth
Depth is primarily conveyed through **Tonal Layers** and extremely subtle **Ambient Shadows**. 

- **Surfaces:** Most UI elements sit flat on the `neutral` background. Section transitions are indicated by alternating between White and `surface-muted` (#F5F5F5).
- **Shadows:** Use a low-opacity shadow (e.g., `rgba(0,0,0, 0.05)`) with a high blur radius for cards only on hover. This creates a "lift" effect that signifies interactivity without cluttering the interface.
- **Overlays:** Dark navy semi-transparent overlays (60-80% opacity) are used over hero images to ensure white text meets accessibility standards.

## Shapes
The shape language is **Sharp (0)**. To reflect the stability and tradition of the financial sector, rounded corners are avoided. 

All primary buttons, input fields, cards, and image containers must use 90-degree corners. This creates a rigid, grid-aligned aesthetic that feels architectural and secure. Circular shapes are reserved exclusively for icons and avatars to provide a slight visual break from the dominant rectangular forms.

## Components

### Buttons
- **Primary:** Solid `trust-navy` background with white text. Sharp corners.
- **Accent:** Solid `action-orange` background. Used for the most important conversion point on a page.
- **Ghost:** Transparent background with 2px `trust-navy` border.

### Cards
- White background with a 1px `surface-muted` border. No shadow by default; apply a soft ambient shadow only on hover. Content inside cards should have a minimum of 32px padding.

### Input Fields
- White background with 1px light gray borders. On focus, the border should change to `accent-royal`. Labels should use the `label-caps` style for clarity.

### Chips & Tags
- Used for categories. Small, sharp-edged rectangles with light gray backgrounds and dark gray text.

### Lists
- Use custom SVG icons (financial metaphors: charts, shields, coins) as bullet points. Icons should be sized to 24px and colored in `accent-royal`.
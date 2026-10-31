# dsh-custom-background

Custom wallpaper + frosted glass materials for the DSH Web GUI, with a settings row.

Live at `D:\DSHworkspace\dsh-custom-background` and registered in the profile as
`link:…` (edit files in place, then reload the page).

## What it does

**Wallpaper** (painted on the shell frame, never on `body` — a body-level layer sits
below the shell's own opaque background and is invisible):

| Mode | Notes |
|---|---|
| No wallpaper | `preset: ''` — the shell keeps its own background (the built-in gradients were removed) |
| Local picture | crop step (drag + zoom, frame = window aspect) → native pixels → lossless PNG ≤ 6 MP, else JPEG 0.95 |
| Picture link | `https://` URL, used as-is (no crop) |
| GIF / animated WebP | original file stored untouched, animation preserved (no crop) |
| Video (mp4/webm/mov) | real `<video>` layer at `z-index:-2`, muted/loop, paused while the window is hidden |

**Glass** — one material, shared by every surface, driven by `--cb-alpha` / `--cb-blur`:

- chat bubble `[class*="LOmM4q_bubble"]`
- composer card `[class*="GRgSLq_card"]` — filter on a pseudo-element (the card hosts
  fixed popovers; a filter on the element itself would make it their containing block)
- composer widgets `[class*="GRgSLq_dock"] [class*="_trigger"|"_pill"]`
- dialogs `[role="dialog"],[aria-modal="true"]`
- code block `.md-code-block` + `_bannerWrap_` + `_header_1pq26_` + `_content_7gxqk`
  (the inner `pre`/Shiki background must stay transparent)
- inline code `[class*="_markdown_"] :not(pre) > code`
- guide panel `p2k40q_guide`, panel body `_4EiRdG_root`, scroll view `bZwPEG_root`
- terminal screen `_70dcBq_screen`
- tool card `HOHHba_card` with a transparent header row, message card `_card_38jqx_`,
  context tooltip `_bubble_44yfq_`, file preview `K5rwea_file`, "load older" button
  `V4vHZW_older > button`
- modal backdrop `AnXs9G_mask` — deliberately the opposite of glass: fully transparent, no
  filter, so overlays float over the wallpaper without dimming it
- tabs `[class*="_tab_6nhg2_"]` — `keepOnHover` re-applies the fill on `:hover` /
  `:focus-visible`, otherwise the shell repaints a hovered tab as transparent

**Rule for nested containers**: exactly one element per region may carry the fill — the
outermost container. Its children stay transparent (shape only). Two stacked translucent
whites do not sum linearly (`1-(1-a)²`), so any second fill instantly reads "heavier"
than a bubble, and no single number makes both match.

**Guide entries (two special mechanisms, both in `client.js`)**

1. *Hover mirror* — on `pointerover` over `button[class*="-4GESq_main"]`, its resolved
   `background-color / background-image / box-shadow / border-color / transform` are read
   and written to `--cb-hover-*`; the entry containers' `:hover` rules then reference those
   variables, so the whole row reacts exactly like the button (even if it does nothing).
   Throttled to one read per 120 ms per element.
2. *Appearance clone* — the "new terminal" row is a UI-kit ghost button whose own fill is
   dark. A normal entry button's computed style (49 properties) is copied onto it inline,
   once per change (change is detected by hashing the reference style, coalesced with
   `requestAnimationFrame`). Handlers and layout are untouched.

**Sliders** (Settings → General → Background): transparency, frost, text readability
(readability adds a veil over the wallpaper — a real scrim element in video mode — and
does not touch the text).

## Storage

- `localStorage["dsh-custom-background.prefs"]` — preset id, image/video key, sliders
  (a few hundred bytes).
- IndexedDB `dsh-custom-background` / `images` — the picture or video blob itself, which
  is what allows full resolution (localStorage caps at ~5 MB).

## Implementation notes (learned the hard way)

1. **Hash class names change per build.** `_content_7gxqk_74` style suffixes are not
   stable; `HOHHba_` / `LOmM4q_` / `GRgSLq_` prefixes have been stable so far.
2. **`var(--cb-*)` does not resolve inside inline styles** on some shell components —
   write concrete values there (`rgba(255,255,255,0.54)`), not variables.
3. **Never put `backdrop-filter` on an ancestor of `position: fixed` content** (sidebar
   column, message body). It makes that element the containing block, which moves
   permission cards / popovers and shows up as the transcript jumping. Use a
   pseudo-element instead.
4. **Don't change paddings/margins of message containers** — the shell scrolls to
   elements, and any height change makes that scroll land somewhere else.
5. `background-image` cannot take `center / cover`; use the longhand
   `background-size` / `background-position` / `background-repeat`.
6. **Same fill does not mean same look.** A translucent white over the wallpaper
   (composer dock buttons) reads much lighter than the same value over the shell's
   near-opaque panel white (guide entries). The guide entries therefore *sample* a dock
   button's computed colour, blur and shadow, then scale the alpha by ~0.28. Comparing
   resolved values in the console proves the numbers match — the difference is the
   backdrop, not the declaration.
7. **Don't style a text link as a surface.** `p2k40q_moreAnchor` is an inline "more"
   link; giving it a fill, a shadow or even just a `backdrop-filter` paints a rectangle
   around the text (the element has no rounded box of its own). It is excluded on
   purpose.
8. **A dark band flashing on relayout = filters / shadows on repeated surfaces.** A
   `backdrop-filter` (or a dark `box-shadow`) on every message bubble makes the browser
   re-rasterise each one whenever the column is re-laid out (a sidebar opening or going
   full screen), which shows up as a black strip at the text's left edge for a couple of
   frames. Targets that repeat per message use `noShadow` (and large resizing containers
   such as `_4EiRdG_root` / `bZwPEG_root` use `noBlur` + `noShadow`).
9. **Never override `--dsw-scrollbar-width`.** It changes the scrollbar's footprint, so
   the transcript's text width jumps whenever a scrollbar appears (e.g. toggling the
   right sidebar).
10. **Theme switches do not reach imperatively painted elements.** The video scrim is a
    real element whose colour is written from JS, so an attribute observer on
    `<body data-ds-dark-theme>` / `<html data-theme>` recomputes it; the wallpaper
    stylesheet is regenerated at the same moment (and skipped when the text is unchanged).
11. **`position: relative` breaks absolutely positioned children.** Putting it on the
    panel containers re-anchored the sidebar's floating chrome and slid it sideways. Those
    containers therefore get fill only — no positioning, no filter.
12. **Inline writes are wiped by React.** Painting a React-rendered element with
    `element.style.setProperty` looks like it does nothing: the next render rewrites the
    `style` attribute. A stylesheet rule with `!important` beats inline styles (as long as
    those are not `!important` themselves) and survives re-renders — prefer it.
13. **A glass row needs its children cleared.** When only the rim of a row changes colour,
    the row itself is painted but its child spans each paint their own fill on top. Give the
    row the material and set `background: transparent` on `row *`, then the whole strip
    shows the glass. `HOHHba_header` in the code is exactly this case.
14. **Do not override the font tokens.** The shell's stack
    (`-apple-system, "Segoe UI", "PingFang SC", "Microsoft YaHei", …`) already resolves to
    the platform's own faces, and it defines several tokens (`--dsh-font-family-text`,
    `-text-default`, `-code`, `-terminal`). Overriding only some of them leaves the rest on
    the shell's family, so glyphs come from two families with different ascent/descent and
    the line looks like "some characters are taller than others". Any font the platform does
    not have (PingFang, SF, HarmonyOS Sans on Windows) silently falls through, which reads as
    "the setting does nothing". Install the font first, then change the shell's own setting.
15. **Substring selectors hit sibling components.** `[class*="K5rwea_file"]` also matched
    `K5rwea_fileBody`, so the middle of the card got a second glass layer and read one step
    deeper than its rim. Use `[class~="…"]` (exact token) for a single element, and treat
    "one region looks a step darker" as a stacked-layer symptom rather than a colour problem.
16. **One filled layer per region beats tuning.** Every time two glass layers were stacked,
    matching them to a single-layer neighbour by adjusting `boost` failed: the result also
    depends on what is behind. The durable fix is to make the inner row `transparent`
    (`mode: 'transparent'`) so the region really has one layer — used by the tool-card header
    and the code-block header.
17. **A nested `backdrop-filter` cannot blur the wallpaper.** The composer card already
    filters its backdrop, so anything inside it (the command-preview rows `F07MqG_row`) that
    also sets `backdrop-filter` samples the card's already-flattened output. The declaration
    is present in computed styles, yet the frost slider has no visible effect — the element
    only *looks* like glass. Either let the parent be the single filter for that region, or
    accept fill-only styling there. Never ship a filter that ignores the slider.

## Performance notes

- The only observer is an attribute-only `MutationObserver` on two nodes (theme switch);
  the listeners are `pointerover` (throttled to one read per 120 ms, and only when the
  pointer is over the guide button), `resize` (crop panel only) and `visibilitychange`
  (video wallpaper), all removed on unload.
- Sliders update two CSS variables, and only when their value actually changes; the
  wallpaper stylesheet is rewritten only when its resolved text differs.
- The guide entry appearance clone hashes the reference's computed style and skips the
  write when nothing changed; subscription callbacks are coalesced with
  `requestAnimationFrame` and debounced by 140 ms, so dragging a slider does not clone 49
  properties per frame.
- `pointerover` rejects unrelated targets with two class-name checks before it walks up with
  `closest()`, so the handler costs almost nothing on the rest of the page.
- Menus and dialogs derive their blur from the frost variable
  (`calc(var(--cb-blur) * 1.3)`) instead of a constant; a constant kept them blurred at
  frost 0 and also forced a second composited layer that ignored `data-cb-noblur`.
- Pictures and videos live in IndexedDB, so `localStorage` stays a few hundred bytes.

## Diagnostics

- **Alt + click** — copy an element's class chain (probe).
- **Alt + Shift + G** — toggle every stylesheet this plugin injects, to attribute a visual
  glitch to the plugin or to the shell.

## Probe

Hold **Alt** and click any element: a panel prints the class chain of the click target
and its three ancestors, text pre-selected for `Ctrl+C`. It only fires while Alt is held
and is removed on unload. Useful for re-targeting surfaces after a DSH update.

Press **Alt + Shift + H**, then hover the widget within 3 seconds: every node inserted in
that window is listed with its classes and text. This is the way to name an element that
disappears as soon as the pointer leaves it (hover tooltips, popovers).

Press **Alt + Shift + G** to disable every stylesheet this plugin injected, which tells a
plugin-caused glitch apart from one the shell itself produces.

## Uninstall

```text
plugin_manager remove_bundle @local/dsh-custom-background
```

then delete this directory.

# React BurgerBuilder 6

## New in this run

- Style-later approach with scss module
- No styled-component
  - Slower reloading for dev
  - Perf hit
  - Nested Component
  - Bloated Component File
  - Styling while developing interferes with workflow
  - Can use sass features (mixins, variables, functions)
- But for now, use both:
  - Because for now, the primary focus being learning stacks/ toolkit, it is better to keep using both to maintain the experience.
  - Use `Sass` for the components higher up in the tree.
    - styling is mostly for layouts
    - minimal dynamic styling based on state/props
    - no nested component for better debugging central logic
    - still usually nested inside Redux connect
  - Use `styled-components` for the UI components
    - usually at the lower side of the tree
    - need to add/remove classes based on user-generated events.
    - can use styled-component's theme provider
- Container + Component in one file
  - named export Component
  - default export Container
    - use utility function to update displayName
- [Redux Ducks snippet](https://gist.github.com/toypiano/5422dc229235b515e5b7f3763198fe5d)

## Components

### Modal

- Displays children in modal on top of a dark backdrop
- Closes when clicked on the backdrop

#### Props

- `show`: boolean - show backdrop when sliding in.
- `closeModal`: func - pass to backdrop. callback onClick.

#### Children

- Backdrop
  - takes separate `show` prop (positioned absolute)
- section element of props.children
  - translated out of screen when `show` is false

#### Animating Slide in/out

- Animating component should be there already (not conditionally rendered), but translated out of screen by default.
- Apply `.show` class conditionally with prop.

```css
.show {
  transform: translate(0);
}
```

### Spinner

Renders a spinner on top of a dark backdrop

Css spinner element is wrapped inside a positioning div

#### Props

- `show`

#### Can we have Spinner and Modal at the same time ?

No. If we do, then two Backdrops will overlap on top of each other making it twice as dark & opaque.

## Position fixed & absolute

Set top & left as well.

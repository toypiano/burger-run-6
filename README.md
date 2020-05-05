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
- Container + Component in one file
  - named export Component
  - default export Container
    - use utility function to update displayName

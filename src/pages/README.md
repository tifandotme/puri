## Folder Structure and File Naming
- Each folder corresponds to every route paths that are available (see `App.tsx`).
- The main component of its parent folder should have a file name that ends with "Page" suffix. This component is what `react-router` points to.
- Any other `.tsx` besides the main component should contain extra components that are used inside said **main component** and its children.

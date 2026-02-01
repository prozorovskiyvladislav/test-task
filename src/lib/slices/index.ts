/**
 * Redux slices barrel. Import slices and actions from here for store setup and re-exports.
 */
export { sidebarSlice, openSidebar, closeSidebar, toggleSidebar } from './sidebarSlice'
export {
  backgroundSlice,
  setDraftBackgroundId,
  applyDraftBackground,
  generateBackground,
} from './backgroundSlice'
export {
  backgroundIdeaSlice,
  setPresent,
  commitGenerate,
  undo,
  redo,
} from './backgroundIdeaSlice'

import { setupEventListeners } from './eventHandler.js'; 
import { renderItems, updateTitle } from './rendering.js';
import { setupSidebar } from '../common/sideBar.js';

setupSidebar();
renderItems('all'); 
updateTitle('전체');
setupEventListeners();
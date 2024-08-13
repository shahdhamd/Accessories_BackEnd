import { roles } from './../../services/roles.js';
export const endpoint = {
    addBasic: [roles.Admin],
    deletBasic: [roles.Admin],
    update: [roles.Admin],
    addSub: [roles.Admin],
    deletSub: [roles.Admin],
    updateSub: [roles.Admin]
}

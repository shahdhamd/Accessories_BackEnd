import { roles } from './../../services/roles.js';

export const endpoints = {
    add: [roles.Admin, roles.User],
    delet: [roles.Admin, roles.User],
    show: [roles.Admin, roles.User]
}

import userRoutes from "./modules/users/userRoutes.js";
import authRoutes from "./modules/auth/authRoutes.js";


export const routes = (app) => {
    app.use(userRoutes);
    app.use(authRoutes);
}
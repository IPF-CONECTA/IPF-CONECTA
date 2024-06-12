import userRoutes from "./modules/users/userRoutes.js";
import authRoutes from "./modules/auth/authRoutes.js";
import companyRoutes from "./modules/companies/companyRoutes.js";

export const routes = (app) => {
    app.use(userRoutes);
    app.use(authRoutes);
    app.use(companyRoutes);
}
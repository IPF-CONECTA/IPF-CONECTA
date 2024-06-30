import userRoutes from "./modules/users/userRoutes.js";
import authRoutes from "./modules/auth/authRoutes.js";
import companyRoutes from "./modules/recruiters/companies/companyRoutes.js";
import recruiterRoutes from "./modules/recruiters/recruiterRoutes.js";
import associationRoutes from "./modules/administration/admin/assosiations_reacruiter-company/associationRoutes.js";

export const routes = (app) => {
    app.use(userRoutes);
    app.use(authRoutes);
    app.use(companyRoutes);
    app.use(recruiterRoutes)
    app.use(associationRoutes)
}
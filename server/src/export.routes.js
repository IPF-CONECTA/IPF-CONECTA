import userRoutes from "./modules/users/userRoutes.js";
import authRoutes from "./modules/auth/authRoutes.js";
import companyRoutes from "./modules/recruiters/companies/companyRoutes.js";
import associationRoutes from "./modules/administration/admin/associations/associationRoutes.js";
import companyAdminRoutes from "./modules/administration/admin/companies/companyRoutes.js";
import jobRoutes from "./modules/recruiters/job/jobRoutes.js";
import ubicationRoutes from "./modules/ubications/ubicationRoutes.js";

export const routes = (app) => {
    app.use(userRoutes);
    app.use(authRoutes);
    app.use(companyRoutes);
    app.use(jobRoutes)
    app.use(associationRoutes)
    app.use('/admin', companyAdminRoutes)
    app.use(ubicationRoutes)
}
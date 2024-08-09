import userRoutes from "./modules/users/userRoutes.js";
import authRoutes from "./modules/auth/authRoutes.js";
import companyRoutes from "./modules/recruiters/companies/companyRoutes.js";
import associationAdminRoutes from "./modules/administration/admin/associations/associationRoutes.js";
import companyAdminRoutes from "./modules/administration/admin/companies/companyRoutes.js";
import jobRoutes from "./modules/recruiters/job/jobRoutes.js";
import ubicationRoutes from "./modules/ubications/ubicationRoutes.js";
import associationRoutes from "./modules/recruiters/associations/associationRoutes.js";
import companyIndustriesRoutes from "./modules/recruiters/companies/companyIndustry/companyIndustryRoutes.js";
import skillsRoutes from "./modules/skills/skillsRoutes.js";
import postRoutes from "./modules/posts/postRoutes.js";
import followerRoutes from "./modules/followers/followerRoutes.js";
export const routes = (app) => {
    app.use(userRoutes);
    app.use(authRoutes);
    app.use(companyRoutes);
    app.use(jobRoutes)
    app.use(associationRoutes)
    app.use('/admin', associationAdminRoutes)
    app.use('/admin', companyAdminRoutes)
    app.use(ubicationRoutes)
    app.use(companyIndustriesRoutes)
    app.use(skillsRoutes)
    app.use('/feed', postRoutes)
    app.use(followerRoutes)
}
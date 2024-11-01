import userRoutes from "./modules/users/userRoutes.js";
import authRoutes from "./modules/auth/authRoutes.js";
import companyRoutes from "./modules/recruiters/companies/companyRoutes.js";
import associationAdminRoutes from "./modules/administration/admin/associations/associationRoutes.js";
import companyAdminRoutes from "./modules/administration/admin/companies/companyRoutes.js";
import jobRoutes from "./modules/recruiters/job/jobRoutes.js";
import locationRoutes from "./modules/locations/locationRoutes.js";
import associationRoutes from "./modules/recruiters/associations/associationRoutes.js";
import companyIndustriesRoutes from "./modules/recruiters/companies/companyIndustry/companyIndustryRoutes.js";
import skillsRoutes from "./modules/skills/skillsRoutes.js";
import postRoutes from "./modules/posts/postRoutes.js";
import followerRoutes from "./modules/followers/followerRoutes.js";
import repostRoutes from "./modules/posts/reposts/repostRoutes.js";
import likeRoutes from "./modules/posts/likes/likeRoutes.js";
import contractTypeRoutes from "./modules/recruiters/job/contractTypes/contractTypesRoutes.js";
import modalityRoutes from "./modules/recruiters/job/jobModalities/modalityRoutes.js";
import companyLocationRoutes from "./modules/recruiters/companies/companyLocation/companyLocationRoutes.js";
import uploadRoutes from "./upload.routes.js";
import profileRoutes from "./modules/profile/profileRoutes.js";
import experienceRoutes from "./modules/profile/experiences/experienceRoutes.js"
import jobPostulationRoutes from "./modules/recruiters/job/jobPostulation/jobPostulationRoutes.js";
import aboutRoutes from "./modules/profile/about/aboutRoutes.js";
import projectRoutes from "./modules/profile/project/projectRoutes.js";
import ideaRoutes from "./modules/ideas/ideaRoutes.js";
import voteRoutes from "./modules/ideas/votes/voteRoutes.js";
import SkillProfileRoutes from "./modules/profile/skills_user/skillProfileRoutes.js";
import messageRoutes from "./modules/chat/message/messageRoutes.js";
import chatRoutes from "./modules/chat/chatRoutes.js";
import langRouter from "./modules/langs/lang.routes.js";
import langUserRouter from "./modules/profile/langs_user/langUserRoutes.js";

import profilePicRoutes from "./modules/profile/profilePic/profilePicRoutes.js";
import skillableRoutes from "./modules/skills/skillable/skillableRoutes.js";
import contactRoutes from "./modules/profile/contact/contactRoutes.js";
export const routes = (app) => {
  app.use(userRoutes);
  app.use(authRoutes);
  app.use(companyRoutes);
  app.use(jobRoutes);
  app.use(associationRoutes);
  app.use("/admin", associationAdminRoutes);
  app.use("/admin", companyAdminRoutes);
  app.use(locationRoutes);
  app.use(companyIndustriesRoutes);
  app.use(skillsRoutes);
  app.use("/feed", postRoutes);
  app.use(followerRoutes);
  app.use(repostRoutes);
  app.use(likeRoutes);
  app.use(contractTypeRoutes);
  app.use(modalityRoutes);
  app.use(companyLocationRoutes);
  app.use(profileRoutes);
  app.use(profilePicRoutes)
  app.use(experienceRoutes);
  app.use(uploadRoutes);
  app.use(jobPostulationRoutes);
  app.use(aboutRoutes);
  app.use(projectRoutes);
  app.use(ideaRoutes);
  app.use(voteRoutes);
  app.use(SkillProfileRoutes);
  app.use("/message", messageRoutes);
  app.use(chatRoutes);
  app.use(skillableRoutes)
  app.use(langRouter);
  app.use(langUserRouter);
  app.use(contactRoutes)
};

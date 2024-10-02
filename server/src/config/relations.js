import { Role } from "../modules/roles/roleModel.js";
import { User } from "../modules/users/userModel.js";
import { Post } from "../modules/posts/postModel.js";
import { Like } from "../modules/posts/likes/likeModel.js";
import { Report } from "../modules/reports/reportModel.js";
import { ReportReason } from "../modules/reports/reportReasonModel.js";
import { Follower } from "../modules/followers/followerModel.js";
import { Country } from "../modules/ubications/models/countryModel.js";
import { City } from "../modules/ubications/models/cityModel.js";
import { Skill } from "../modules/skills/skillsModel.js";
import { UserState } from "../modules/users/states/userStateModel.js";
import { LangLevel } from "../modules/langs/langLevelsModel.js";
import { Lang } from "../modules/langs/langModel.js";
import { State } from "../modules/ubications/models/stateModel.js";
import { CompanyIndustry } from "../modules/recruiters/companies/companyIndustry/companyIndustryModel.js";
import { Company } from "../modules/recruiters/companies/companyModel.js";
import { Association } from "../modules/recruiters/associations/associationModel.js";
import { LangsUser } from "../modules/users/langs_user/langsUserModel.js";
import { SkillsProfile } from "../modules/users/skills_user/skillProfileModel.js";
import { Job } from "../modules/recruiters/job/jobModel.js";
import { ContractType } from "../modules/recruiters/job/contractTypes/contractTypeModel.js";
import { JobSkills } from "../modules/recruiters/job/jobSkills/jobSkillsModel.js";
import { WorkExperience } from "../modules/users/workExperiences/experiencesModel.js";
import { ExperienceSkill } from "../modules/users/workExperiences/experienceSkillModel.js";
import { Attachment } from "../modules/posts/postAttachment/attachmentModel.js";
import { Modality } from "../modules/recruiters/job/jobModalities/modalityModel.js";
import { CompanyUbication } from "../modules/recruiters/companies/companyUbication/companyUbicationModel.js";
import { Repost } from "../modules/posts/reposts/repostModel.js";
import { Profile } from "../modules/profile/profileModel.js";
import { JobPostulation } from "../modules/recruiters/job/jobPostulation/jobPostulationModel.js";
import { Project } from "../modules/users/project/projectModel.js";
import { Vote } from "../modules/ideas/votes/voteModel.js";
import { Idea } from "../modules/ideas/ideaModel.js";
import { Chat } from "../modules/chat/chatModel.js";
import { Message } from "../modules/chat/message/messageModel.js";

export const createRelations = async () => {
  try {
    User.hasOne(Profile, {
      foreignKey: "userId",
    });
    Profile.belongsTo(User, {
      foreignKey: "userId",
    });
    CompanyUbication.belongsTo(Company, {
      foreignKey: "companyId",
    });
    CompanyUbication.belongsTo(Country, {
      foreignKey: "countryId",
    });
    CompanyUbication.belongsTo(State, {
      foreignKey: "stateId",
    });
    CompanyUbication.belongsTo(City, {
      foreignKey: "cityId",
    });
    Company.hasMany(CompanyUbication, {
      foreignKey: "companyId",
    });
    Country.hasMany(CompanyUbication, {
      foreignKey: "countryId",
    });
    State.hasMany(CompanyUbication, {
      foreignKey: "stateId",
    });
    CompanyUbication.hasMany(Job, {
      foreignKey: "companyUbicationId",
    });
    Job.belongsTo(CompanyUbication, {
      foreignKey: "companyUbicationId",
    });
    Role.hasMany(User, {
      foreignKey: "roleId",
    });
    User.belongsTo(Role, {
      foreignKey: "roleId",
    });
    Profile.hasMany(Post, {
      foreignKey: "profileId",
      as: "posts",
    });
    Profile.hasMany(LangsUser, {
      foreignKey: "profileId",
    });
    LangsUser.belongsTo(Lang, {
      foreignKey: "langId",
    });
    LangLevel.hasOne(LangsUser, {
      foreignKey: "langLevelId",
    });
    LangsUser.belongsTo(Profile, {
      foreignKey: "profileId",
    });

    //Projects
    Profile.hasMany(Project, {
      foreignKey: "profileId",
    });
    Project.belongsTo(Profile, {
      foreignKey: "profileId",
    });

    //Posts
    Post.belongsTo(Profile, {
      foreignKey: "profileId",
      as: "profile",
    });
    Post.belongsTo(Post, {
      as: "parentPost",
      foreignKey: "postId",
    });
    Post.hasMany(Repost, {
      foreignKey: "postId",
      as: "reposts",
    });

    Job.hasMany(JobPostulation, {
      foreignKey: "jobId",
      as: "postulate",
    });
    JobPostulation.belongsTo(Job, {
      foreignKey: "jobId",
    });

    Profile.hasMany(JobPostulation, {
      foreignKey: "profileId",
    });
    JobPostulation.belongsTo(Profile, {
      foreignKey: "profileId",
    });

    //Chat relations

    //----------

    Profile.hasMany(Chat, {
      foreignKey: "profile1Id",
      as: "chatsAsProfile1",
    });
    Profile.hasMany(Chat, {
      foreignKey: "profile1Id",
      as: "chatsAsProfile2",
    });
    Chat.belongsTo(Profile, {
      foreignKey: "profile1Id",
      as: "profile1",
    });
    Chat.belongsTo(Profile, {
      foreignKey: "profile2Id",
      as: "profile2",
    });
    Chat.hasMany(Message, {
      foreignKey: "chatId",
      as: "messages",
    });
    Message.belongsTo(Chat, {
      foreignKey: "chatId",
    });

    //----------

    Profile.hasMany(Repost, {
      foreignKey: "profileId",
    });
    Post.hasMany(Like, {
      foreignKey: "postId",
    });
    Like.belongsTo(Post, {
      foreignKey: "postId",
    });
    Profile.hasMany(Like, {
      foreignKey: "profileId",
      as: "likes",
    });
    Like.belongsTo(Profile, {
      foreignKey: "profileId",
    });
    Post.hasMany(Report, {
      foreignKey: "postId",
    });
    Post.hasMany(Attachment, {
      foreignKey: "postId",
      as: "attachments",
    });
    Post.hasMany(Post, {
      foreignKey: "postId",
      as: "comments",
    });

    Attachment.belongsTo(Post, {
      foreignKey: "postId",
      as: "post",
    });
    Report.belongsTo(Post, {
      foreignKey: "postId",
    });
    Profile.hasMany(Report, {
      foreignKey: "profileId",
    });
    Report.belongsTo(Profile, {
      foreignKey: "profileId",
    });
    ReportReason.hasMany(Report, {
      foreignKey: "reasonId",
    });
    Report.belongsTo(ReportReason, {
      foreignKey: "reasonId",
    });
    Profile.hasMany(Follower, {
      foreignKey: "followingId",
    });
    Profile.hasMany(Follower, {
      foreignKey: "followerId",
    });
    Company.belongsTo(Country, {
      foreignKey: "countryOriginId",
    });
    Country.hasMany(Company, {
      foreignKey: "countryOriginId",
    });
    State.belongsTo(Country, {
      foreignKey: "countryId",
    });
    City.belongsTo(State, {
      foreignKey: "stateId",
    });
    State.hasMany(City, {
      foreignKey: "stateId",
    });
    Country.hasMany(State, {
      foreignKey: "countryId",
    });
    UserState.hasMany(Profile, {
      foreignKey: "userStateId",
    });
    Profile.belongsTo(UserState, {
      foreignKey: "userStateId",
    });
    Profile.hasMany(SkillsProfile, {
      foreignKey: "profileId",
    });
    SkillsProfile.belongsTo(Skill, {
      foreignKey: "skillId",
    });
    Skill.hasMany(SkillsProfile, {
      foreignKey: "skillId",
    });
    CompanyIndustry.hasMany(Company, {
      foreignKey: "industryId",
    });
    Company.belongsTo(CompanyIndustry, {
      foreignKey: "industryId",
    });
    Company.hasMany(Association, {
      foreignKey: "companyId",
    });
    Profile.hasMany(Association, {
      foreignKey: "profileId",
      as: "profile",
    });
    Association.belongsTo(Profile, {
      foreignKey: "profileId",
      as: "profile",
    });
    Association.belongsTo(Company, {
      foreignKey: "companyId",
      as: "company",
    });
    Modality.hasMany(Job, {
      foreignKey: "modalityId",
      as: "modality",
    });
    Job.belongsTo(Modality, {
      foreignKey: "modalityId",
    });
    Profile.hasMany(Job, {
      foreignKey: "profileId",
    });
    Job.belongsTo(Profile, {
      foreignKey: "profileId",
    });

    Job.belongsTo(Company, {
      foreignKey: "companyId",
    });
    Company.hasMany(Job, {
      foreignKey: "companyId",
    });
    ContractType.hasMany(Job, {
      foreignKey: "contractTypeId",
    });
    Job.belongsTo(ContractType, {
      foreignKey: "contractTypeId",
    });
    JobSkills.belongsTo(Job, {
      foreignKey: "jobId",
    });
    Job.hasMany(JobSkills, {
      foreignKey: "jobId",
    });
    Skill.hasMany(JobSkills, {
      foreignKey: "skillId",
    });
    JobSkills.belongsTo(Skill, {
      foreignKey: "skillId",
    });
    WorkExperience.hasMany(ExperienceSkill, {
      foreignKey: "experienceId",
    });
    Skill.hasMany(ExperienceSkill, {
      foreignKey: "skillId",
    });
    Profile.hasMany(WorkExperience, {
      foreignKey: "profileId",
    });
    Idea.belongsTo(Profile, {
      foreignKey: "profileId",
    });
    Profile.hasMany(Idea, {
      foreignKey: "profileId",
    });
    Vote.belongsTo(Idea, {
      foreignKey: "ideaId",
    });
    Idea.hasMany(Vote, {
      foreignKey: "ideaId",
    });
    Vote.belongsTo(Profile, {
      foreignKey: "profileId",
    });
    Profile.hasMany(Vote, {
      foreignKey: "profileId",
    });
  } catch (error) {
    console.log(error);
  }
};

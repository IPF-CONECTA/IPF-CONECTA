import { Role } from "../modules/roles/roleModel.js";
import { User } from "../modules/users/userModel.js";
import { Post } from "../modules/posts/postModel.js";
import { Like } from "../modules/likes/likeModel.js";
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
import { SkillsUser } from "../modules/users/skills_user/skillsUserModel.js";
import { Job } from "../modules/recruiters/job/jobModel.js";
import { ContractType } from "../modules/typeJobs/contractTypeModel.js";
import { JobSkills } from "../modules/recruiters/job/jobSkills/jobSkillsModel.js";
import { WorkExperience } from "../modules/users/workExperiences/experiencesModel.js";
import { ExperienceSkill } from "../modules/users/workExperiences/experienceSkillModel.js";
import { Attachment } from "../modules/posts/postAttachment/attachmentModel.js";
import { Modality } from "../modules/recruiters/job/jobModalities/modalityModel.js";

export const createRelations = async () => {
    try {
        Role.hasMany(User, {
            foreignKey: 'roleId',
        });
        User.belongsTo(Role, {
            foreignKey: 'roleId'
        });
        User.hasMany(Post, {
            foreignKey: 'userId',
        });
        User.hasMany(LangsUser, {
            foreignKey: 'userId',
        });
        LangsUser.belongsTo(Lang, {
            foreignKey: 'langId'
        });
        LangLevel.hasOne(LangsUser, {
            foreignKey: 'langLevelId'
        });
        LangsUser.belongsTo(User, {
            foreignKey: 'userId'
        });
        Post.belongsTo(User, {
            foreignKey: 'userId'
        });
        Post.hasMany(Like, {
            foreignKey: 'postId'
        });
        Like.belongsTo(Post, {
            foreignKey: 'postId'
        });
        User.hasMany(Like, {
            foreignKey: 'userId'
        });
        Like.belongsTo(User, {
            foreignKey: 'userId'
        });
        Post.hasMany(Report, {
            foreignKey: 'postId'
        });
        Post.hasMany(Attachment, {
            foreignKey: 'postId',
            as: 'attachments'
        });
        Post.hasMany(Post, {
            foreignKey: 'postId',
            as: 'post'
        })
        Attachment.belongsTo(Post, {
            foreignKey: 'postId',
            as: 'post'
        });
        Report.belongsTo(Post, {
            foreignKey: 'postId'
        });
        User.hasMany(Report, {
            foreignKey: 'userId'
        });
        Report.belongsTo(User, {
            foreignKey: 'userId'
        });
        ReportReason.hasMany(Report, {
            foreignKey: 'reasonId'
        });
        Report.belongsTo(ReportReason, {
            foreignKey: 'reasonId'
        });
        User.hasMany(Follower, {
            foreignKey: 'followingId'
        });
        User.hasMany(Follower, {
            foreignKey: 'followerId'
        });
        State.belongsTo(Country, {
            foreignKey: 'countryId',
        });
        City.belongsTo(State, {
            foreignKey: 'stateId',
        });
        State.hasMany(City, {
            foreignKey: 'stateId',
        });
        Country.hasMany(State, {
            foreignKey: 'countryId',
        });
        UserState.hasMany(User, {
            foreignKey: 'userStateId',
        });
        User.hasMany(SkillsUser, {
            foreignKey: 'userId',
        });
        SkillsUser.belongsTo(Skill, {
            foreignKey: 'skillId'
        });
        Skill.hasMany(SkillsUser, {
            foreignKey: 'skillId'
        });
        CompanyIndustry.hasMany(Company, {
            foreignKey: 'industryId',
        });
        Company.belongsTo(CompanyIndustry, {
            foreignKey: 'industryId'
        });
        City.hasMany(Company, {
            foreignKey: 'cityId',
        });
        Company.hasMany(Association, {
            foreignKey: 'companyId',
        });
        User.hasMany(Association, {
            foreignKey: 'userId',
        });
        Association.belongsTo(User, {
            foreignKey: 'userId',
            as: 'user'
        });
        Association.belongsTo(Company, {
            foreignKey: 'companyId',
            as: 'company'
        });
        Modality.hasMany(Job, {
            foreignKey: 'modalityId',
            as: 'modality'
        })
        User.hasMany(Job, {
            foreignKey: 'userId'
        })
        Job.belongsTo(User, {
            foreignKey: 'userId'
        })
        Job.belongsTo(Company, {
            foreignKey: 'companyId'
        });
        Company.hasMany(Job, {
            foreignKey: 'companyId'
        });
        ContractType.hasMany(Job, {
            foreignKey: 'contractTypeId'
        });
        JobSkills.belongsTo(Job, {
            foreignKey: 'jobId'
        });
        Job.hasMany(JobSkills, {
            foreignKey: 'jobId'
        });
        Skill.hasMany(JobSkills, {
            foreignKey: 'skillId'
        });
        JobSkills.belongsTo(Skill, {
            foreignKey: 'skillId'
        })
        WorkExperience.hasMany(ExperienceSkill, {
            foreignKey: 'experienceId'
        });
        Skill.hasMany(ExperienceSkill, {
            foreignKey: 'skillId'
        });
        User.hasMany(WorkExperience, {
            foreignKey: 'userId'
        });
    } catch (error) {
        console.log(error)
    }

}
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
import { SkillsUser } from "../modules/users/skills_user/skillsUserModel.js";
import { Job } from "../modules/recruiters/job/jobModel.js";
import { ContractType } from "../modules/recruiters/job/contractTypes/contractTypeModel.js";
import { JobSkills } from "../modules/recruiters/job/jobSkills/jobSkillsModel.js";
import { WorkExperience } from "../modules/users/workExperiences/experiencesModel.js";
import { ExperienceSkill } from "../modules/users/workExperiences/experienceSkillModel.js";
import { Attachment } from "../modules/posts/postAttachment/attachmentModel.js";
import { Modality } from "../modules/recruiters/job/jobModalities/modalityModel.js";
import { CompanyUbication } from "../modules/recruiters/companies/companyIndustry/companyUbications/companyUbication.model.js";
import { Repost } from "../modules/posts/reposts/repostModel.js";
import { Profile } from "../modules/profile/profileModel.js";

export const createRelations = async () => {
  try {
    User.hasOne(Profile, {
      foreignKey: 'userId'
    })
    Profile.belongsTo(User, {
      foreignKey: 'userId'
    })
    CompanyUbication.belongsTo(Company, {
      foreignKey: 'companyId'
    });
    CompanyUbication.belongsTo(Country, {
      foreignKey: 'countryId'
    });
    CompanyUbication.belongsTo(State, {
      foreignKey: 'stateId'
    });
    CompanyUbication.belongsTo(City, {
      foreignKey: 'cityId'
    });
    Company.hasMany(CompanyUbication, {
      foreignKey: 'companyId'
    });
    Country.hasMany(CompanyUbication, {
      foreignKey: 'countryId'
    });
    State.hasMany(CompanyUbication, {
      foreignKey: 'stateId'
    });
    CompanyUbication.hasMany(Job, {
      foreignKey: 'companyUbicationId'
    });
    Job.belongsTo(CompanyUbication, {
      foreignKey: 'companyUbicationId'
    });
    Role.hasMany(User, {
      foreignKey: 'roleId',
    });
    User.belongsTo(Role, {
      foreignKey: 'roleId'
    });
    Profile.hasMany(Post, {
      foreignKey: 'profileId',
      as: 'posts'
    });
    Profile.hasMany(LangsUser, {
      foreignKey: 'userId',
    });
    LangsUser.belongsTo(Lang, {
      foreignKey: 'langId'
    });
    LangLevel.hasOne(LangsUser, {
      foreignKey: 'langLevelId'
    });
    LangsUser.belongsTo(Profile, {
      foreignKey: 'userId'
    });
    Post.belongsTo(Profile, {
      foreignKey: 'profileId',
      as: 'profile'
    });
    Post.belongsTo(Post, {
      as: 'parentPost',
      foreignKey: 'postId'
    })
    Post.hasMany(Repost, {
      foreignKey: 'postId',
      as: 'reposts'
    })
    Profile.hasMany(Repost, {
      foreignKey: 'userId'
    })
    Post.hasMany(Like, {
      foreignKey: 'postId'
    });
    Like.belongsTo(Post, {
      foreignKey: 'postId'
    });
    Profile.hasMany(Like, {
      foreignKey: 'userId',
      as: 'likes'
    });
    Like.belongsTo(Profile, {
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
      as: 'comments'
    })

    Attachment.belongsTo(Post, {
      foreignKey: 'postId',
      as: 'post'
    });
    Report.belongsTo(Post, {
      foreignKey: 'postId'
    });
    Profile.hasMany(Report, {
      foreignKey: 'userId'
    });
    Report.belongsTo(Profile, {
      foreignKey: 'userId'
    });
    ReportReason.hasMany(Report, {
      foreignKey: 'reasonId'
    });
    Report.belongsTo(ReportReason, {
      foreignKey: 'reasonId'
    });
    Profile.hasMany(Follower, {
      foreignKey: 'followingId'
    });
    Profile.hasMany(Follower, {
      foreignKey: 'followerId'
    });
    Company.belongsTo(Country, {
      foreignKey: 'countryOriginId'
    })
    Country.hasMany(Company, {
      foreignKey: 'countryOriginId'
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
    UserState.hasMany(Profile, {
      foreignKey: 'userStateId',
    });
    Profile.belongsTo(UserState, {
      foreignKey: 'userStateId'
    })
    Profile.hasMany(SkillsUser, {
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
    Company.hasMany(Association, {
      foreignKey: 'companyId',
    });
    Profile.hasMany(Association, {
      foreignKey: 'userId',
      as: 'profile'
    });
    Association.belongsTo(Profile, {
      foreignKey: 'userId',
      as: 'profile'
    });
    Association.belongsTo(Company, {
      foreignKey: 'companyId',
      as: 'company'
    });
    Modality.hasMany(Job, {
      foreignKey: 'modalityId',
      as: 'modality'
    })
    Job.belongsTo(Modality, {
      foreignKey: 'modalityId'
    })
    Profile.hasMany(Job, {
      foreignKey: 'userId'
    })
    Job.belongsTo(Profile, {
      foreignKey: 'userId'
    })
    ///////////

    Job.belongsTo(Company, {
      foreignKey: 'companyId'
    });
    Company.hasMany(Job, {
      foreignKey: 'companyId'
    });
    ContractType.hasMany(Job, {
      foreignKey: 'contractTypeId'
    });
    Job.belongsTo(ContractType, {
      foreignKey: 'contractTypeId'
    })
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
    Profile.hasMany(WorkExperience, {
      foreignKey: 'userId'
    });
  } catch (error) {
    console.log(error)
  }

}
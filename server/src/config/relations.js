import { Role } from "../modules/roles/roleModel.js";
import { User } from "../modules/users/userModel.js";
import { Post } from "../modules/posts/postModel.js";
import { Like } from "../modules/posts/likes/likeModel.js";
import { Report } from "../modules/reports/reportModel.js";
import { ReportReason } from "../modules/reports/reportReasonModel.js";
import { Follower } from "../modules/followers/followerModel.js";
import { Country } from "../modules/locations/models/countryModel.js";
import { City } from "../modules/locations/models/cityModel.js";
import { Skill } from "../modules/skills/skillsModel.js";
import { UserState } from "../modules/profile/states/userStateModel.js";
import { LangLevel } from "../modules/langs/langLevelsModel.js";
import { Lang } from "../modules/langs/langModel.js";
import { State } from "../modules/locations/models/stateModel.js";
import { CompanyIndustry } from "../modules/recruiters/companies/companyIndustry/companyIndustryModel.js";
import { Company } from "../modules/recruiters/companies/companyModel.js";
import { Association } from "../modules/recruiters/associations/associationModel.js";
import { LangsUser } from "../modules/profile/langs_user/langsUserModel.js";
import { Job } from "../modules/recruiters/job/jobModel.js";
import { ContractType } from "../modules/recruiters/job/contractTypes/contractTypeModel.js";
import { Experience } from "../modules/profile/experiences/experiencesModel.js";
import { Modality } from "../modules/recruiters/job/jobModalities/modalityModel.js";
import { CompanyLocation } from "../modules/recruiters/companies/companyLocation/companyLocationModel.js";
import { Repost } from "../modules/posts/reposts/repostModel.js";
import { Profile } from "../modules/profile/profileModel.js";
import { JobPostulation } from "../modules/recruiters/job/jobPostulation/jobPostulationModel.js";
import { Project } from "../modules/profile/project/projectModel.js";
import { Vote } from "../modules/ideas/votes/voteModel.js";
import { Idea } from "../modules/ideas/ideaModel.js";
import { Chat } from "../modules/chat/chatModel.js";
import { Message } from "../modules/chat/message/messageModel.js";
import { Skillable } from "../modules/skills/skillable/skillableModel.js";
import { Certification } from "../modules/profile/certifications/certificationModel.js";
export const createRelations = async () => {
  try {
    User.hasOne(Profile, {
      foreignKey: "userId",
    });
    Profile.belongsTo(User, {
      foreignKey: "userId",
    });
    CompanyLocation.belongsTo(Company, {
      foreignKey: "companyId",
    });
    CompanyLocation.belongsTo(Country, {
      foreignKey: "countryId",
    });
    CompanyLocation.belongsTo(State, {
      foreignKey: "stateId",
    });
    CompanyLocation.belongsTo(City, {
      foreignKey: "cityId",
    });
    Company.hasMany(CompanyLocation, {
      foreignKey: "companyId",
    });
    Country.hasMany(CompanyLocation, {
      foreignKey: "countryId",
    });
    State.hasMany(CompanyLocation, {
      foreignKey: "stateId",
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
      foreignKey: "profile2Id",
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
    Message.belongsTo(Profile, {
      foreignKey: "senderId",
      as: "sender",
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
    Post.hasMany(Post, {
      foreignKey: "postId",
      as: "comments",
      onDelete: "CASCADE",
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
    Follower.belongsTo(Profile, {
      foreignKey: "followingId",
      as: "followingProfile",
    });
    Follower.belongsTo(Profile, {
      foreignKey: "followerId",
      as: "followerProfile",
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
    Company.hasMany(Experience, {
      foreignKey: "companyId"
    })
    Experience.belongsTo(Company, {
      foreignKey: "companyId"
    })
    Modality.hasMany(Experience, {
      foreignKey: "modalityId"
    })
    Experience.belongsTo(Modality, {
      foreignKey: "modalityId"
    })
    Profile.hasMany(Experience, {
      foreignKey: "profileId",
    });

    //Polymorphic relations

    //Job locationable
    Country.hasMany(Job, {
      foreignKey: 'locationableId',
      constraints: false,
      scope: {
        locationableType: 'country'
      },
      as: 'jobs'
    });

    State.hasMany(Job, {
      foreignKey: 'locationableId',
      constraints: false,
      scope: {
        locationableType: 'state'
      },
      as: 'jobs'
    });

    City.hasMany(Job, {
      foreignKey: 'locationableId',
      constraints: false,
      scope: {
        locationableType: 'city'
      },
      as: 'jobs'
    });

    Job.belongsTo(Country, {
      foreignKey: 'locationableId',
      constraints: false,
      scope: {
        locationableType: 'country'
      },
      as: 'country'
    });

    Job.belongsTo(State, {
      foreignKey: 'locationableId',
      constraints: false,
      scope: {
        locationableType: 'state'
      },
      as: 'state'
    });

    Job.belongsTo(City, {
      foreignKey: 'locationableId',
      constraints: false,
      scope: {
        locationableType: 'city'
      },
      as: 'city'
    });


    //Skillable
    Skill.hasMany(Skillable, {
      foreignKey: 'skillId',
      as: 'skillables'
    });

    Skillable.belongsTo(Skill, {
      foreignKey: 'skillId',
      as: 'skill'
    });

    Profile.hasMany(Skillable, {
      foreignKey: 'skillableId',
      constraints: false,
      scope: {
        skillableType: 'profile'
      }
    });

    Experience.hasMany(Skillable, {
      foreignKey: 'skillableId',
      constraints: false,
      scope: {
        skillableType: 'experience'
      }
    });

    Project.hasMany(Skillable, {
      foreignKey: 'skillableId',
      constraints: false,
      scope: {
        skillableType: 'project'
      }
    });
    Idea.hasMany(Skillable, {
      foreignKey: 'skillableId',
      constraints: false,
      scope: {
        skillableType: 'idea'
      }
    })
    Certification.hasMany(Skillable, {
      foreignKey: 'skillableId',
      constraints: false,
      scope: {
        skillableType: 'certification'
      }
    })
    Skillable.belongsTo(Profile, {
      foreignKey: 'skillableId',
      constraints: false,
      as: 'profile'
    });

    Skillable.belongsTo(Experience, {
      foreignKey: 'skillableId',
      constraints: false,
      as: 'experience'
    });

    Skillable.belongsTo(Project, {
      foreignKey: 'skillableId',
      constraints: false,
      as: 'project'
    });
    Skillable.belongsTo(Idea, {
      foreignKey: 'skillableId',
      constraints: false,
      as: 'idea'
    });

    Skillable.belongsTo(Certification, {
      foreignKey: 'skillableId',
      constraints: false,
      as: 'certification'
    });

    // Experience
    Experience.belongsTo(State, {
      foreignKey: 'locationId',
      constraints: false,
      as: 'state'
    });

    Experience.belongsTo(Country, {
      foreignKey: 'locationId',
      constraints: false,
      as: 'country'
    });

    Experience.belongsTo(City, {
      foreignKey: 'locationId',
      constraints: false,
      as: 'city'
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

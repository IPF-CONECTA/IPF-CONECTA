import { getExperiencesSvc } from "./experienceServices.js";

export const getExperiencesByProfile = async (req, res) => {
  const userRequestId = req.user.profile.id;
  const { profileId } = req.params;

  try {
    if (!userRequestId || !profileId) return res.status(400).json();

    const experiences = await getExperiencesSvc(userRequestId, profileId);
    if (experiences.length == 0) return res.status(404).json();

    res.status(200).json(experiences);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

import React, { useState, useCallback } from "react";
import Select from "react-select";
import debounce from "lodash.debounce";
import { findSkills } from "../../../recruiter/job/services/jobServices";
export const SkillSearch = ({ prevSelectedSkills, onSkillSelect }) => {
  const [options, setOptions] = useState([]);
  const fetchSkills = async (query) => {
    if (!query) return;
    try {
      const response = await findSkills(query);
      const skills = response.data.map((skill) => ({
        value: skill.id,
        label: skill.name,
      }));
      setOptions(skills);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const debouncedFetchSkills = useCallback(debounce(fetchSkills, 500), []);

  const handleInputChange = (inputValue) => {
    debouncedFetchSkills(inputValue);
  };

  return (
    <Select
      isMulti
      className="w-100"
      onInputChange={handleInputChange}
      options={options}
      value={prevSelectedSkills}
      onChange={(selected) => onSkillSelect(selected)}
      placeholder="Buscar habilidades..."
    />
  );
};

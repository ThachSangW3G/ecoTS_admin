import axios from 'axios';
import {AchivementLevel} from '../models/AchivementLevel'
const API_URL = 'https://ecotsbe-production.up.railway.app';


export const getAllAchivementLevel = async () => {
    try {
        const response = await axios.get(`${API_URL}/achievement/get-all-achievement-level`);
        console.log(response.data);

        const achivementLevels = response.data.map(achivementLevel => new AchivementLevel(
            achivementLevel.id,
            achivementLevel.name,
            achivementLevel.description,
            achivementLevel.imgUrl,
            achivementLevel.iconUrl,
            achivementLevel.maxIndex,
            achivementLevel.achievement
        ));

        console.log(achivementLevels);
        return achivementLevels
    } catch (e) {
        console.error('Error fetching:', e);
        throw e;
    }
}


export const addNewAchivementLevel = async (name, description, maxIndex, achievementType, formData) => {

    try {

        const response = await axios.post(`${API_URL}/achievement/add-new-achievement-level?name=${name}&description=${description}&maxIndex=${maxIndex}&achievementType=${achievementType}`, formData,);

        console.log(response.data);
        console.log(response.status);
        if (response.status === 200 || response.status == 201) {
            return true
        }

        return false
    } catch (e) {
        console.error('Error fetching:', e);
        return false;
    }
}

export const updateAchivementLevel = async (id, name, description, maxIndex, achievementType, formData) => {
    try {
        const response = await axios.put(`${API_URL}/achievement/update-achievement-level/?name=${name}&description=${description}&maxIndex=${maxIndex}&achievementLevelId=${id}`, formData,);

        console.log(response.data);
        console.log(response.status);
        if (response.status === 200 || response.status == 201) {
            return true
        }

        return false
    } catch (e) {
        console.error('Error fetching:', e);
        return false;
    }
}


export const deleteAchievementLevel = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/achievement/delete-achievement-level?achievementLevelId=${id}`);
        console.log(response.data);
        console.log(response.status);
        if (response.status === 200 || response.status == 201) {
            return true
        }
        return false
    } catch (e) {
        console.error('Error fetching:', e);
        return false;
    }
}
import axios from 'axios';
import {Achivement} from '../models/Achivement'
const API_URL = 'https://ecots-be.onrender.com';

export const getAllAchivement = async () => {
    try {
        const response = await axios.get(`${API_URL}/achievement`);
        console.log(response.data);

        const achivements = response.data.map(achivement => new Achivement(
            achivement.id,
            achivement.type
        ));

        return achivements
    } catch (e) {
        console.error('Error fetching:', e);
        throw e;
    }
}
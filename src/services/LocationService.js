import axios from 'axios';
import {Location} from '../models/Location'
const API_URL = 'https://ecotsbe-production.up.railway.app';

export const getAllLocations = async () => {
    try {
        const response = await axios.get(`${API_URL}/location/get-all`);
        
        console.log(response.data);

        const locations = response.data.map(location => new Location(
            location.id,
            location.locationName,
            location.description,
            location.typeOfLocation,
            location.latitude,
            location.longitude,
            location.backGroundImgUrl,
            location.imgDetailsUrl,
        ))
        return locations
    } catch (e) {
        console.error('Error fetching:', e);
        throw e;
    }
}


export const createLocation = async (locationName, description, address, latitude, longitude, formData) => {
    try {

        console.log(locationName)
        console.log(description)
        console.log(address)
        console.log(latitude)
        console.log(longitude)
        console.log(formData)
        
        const response = await axios.post(`${API_URL}/location/create-new-location?locationName=${locationName}&description=${description}&address=${address}&latitude=${latitude}&longitude=${longitude}`, formData,  
           );
        console.log(response.data);
        console.log(response.status);

        if (response.status === 200) {
            return true
        }
        console.log('post API')

        return false
       
    } catch (e) {
        console.error('Error fetching:', e);
        return false;
    
       
    }
}
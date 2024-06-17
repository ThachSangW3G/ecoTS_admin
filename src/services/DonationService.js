const API_URL = 'https://ecotsbe-production.up.railway.app'
import axios from 'axios';
import {  format } from "date-fns";
import {Donation} from '../models/Donation'

export const getAllDonations = async () => {
    try {
        const response = await axios.get(`${API_URL}/donate/get-all-donations`);
        console.log(response.data);

        const donations = response.data.map(donation => new Donation(
            donation.id,
            donation.title,
            donation.name,
            donation.description,
            donation.startDate,
            donation.endDate,
            donation.sponsorImages,
            donation.coverImageUrl,
            donation.totalDonations
        ))
        return donations
    } catch (e) {
        console.error('Error fetching:', e);
        throw e;
    }
}

export const createDonation = async (title, name, description, startDate, endDate, formData) => {

    console.log(title)
    console.log(name)
    console.log(description)
    console.log(startDate)
    console.log(endDate)
    console.log(formData)
    try {
        console.log('post API')
        const response = await axios.post(`${API_URL}/admin/donate/create-donation?title=${title}&name=${name}&description=${description}&startDate=${startDate}&endDate=${endDate}&totalDonations=0`, formData,  
           );
        console.log(response.data);
        console.log(response.status);


        if (response.status === 200) {  
            return true
        }

        return false
       
    } catch (e) {
        console.error('Error fetching:', e);
        return false;
    }
}
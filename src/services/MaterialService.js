import axios from 'axios';
import {Material} from '../models/Material'
const API_URL = 'https://ecots-be.onrender.com';


export const getAllMaterials = async () => {
    try {
        const response = await axios.get(`${API_URL}/materials/get-all-materials`);
        console.log(response.data);
        const materials = response.data.map(material => new Material(
            material.id,
            material.name,
            material.pointsPerKg,
            material.co2SavedPerKg
        ));
        return materials
    } catch (e) {
        console.error('Error fetching:', e);
        throw e;
    }
}

export const createMaterial = async (name, pointsPerKg, co2SavedPerKg) => {
    try {
        const response = await axios.post(`${API_URL}/materials/add`, {
            name: name,
            pointsPerKg: pointsPerKg,
            co2SavedPerKg: co2SavedPerKg
        });
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

export const deleteMaterial = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/materials/delete/${id}`);
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

export const updateMaterial = async (id, name, pointsPerKg, co2SavedPerKg) => {
    try {
        const response = await axios.put(`${API_URL}/materials/update/${id}`, {
            name: name,
            pointsPerKg: pointsPerKg,
            co2SavedPerKg: co2SavedPerKg
        });
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
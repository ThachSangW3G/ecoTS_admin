import axios from 'axios';
import { Material } from '../models/Material';
const API_URL = 'https://ecotsbe-production.up.railway.app';

export const getAllMaterials = async () => {
    try {
        const response = await axios.get(`${API_URL}/materials/get-all-materials`);
        console.log(response.data);
        const materials = response.data.map(material => new Material(
            material.id,
            material.name,
            material.pointsPerKg,
            material.co2SavedPerKg,
            material.type
        ));
        return materials;
    } catch (e) {
        console.error('Error fetching:', e);
        throw e;
    }
}

export const createMaterial = async (name, pointsPerKg, co2SavedPerKg, type) => {
    try {
        const response = await axios.post(`${API_URL}/materials/add`, {
            name: name,
            pointsPerKg: pointsPerKg,
            co2SavedPerKg: co2SavedPerKg,
            type: type
        });
        console.log(response.data);
        console.log(response.status);
        if (response.status === 200 || response.status == 201) {
            return true;
        }
        return false;
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
            return true;
        }
        return false;
    } catch (e) {
        console.error('Error fetching:', e);
        return false;
    }
}

export const updateMaterial = async (id, pointsPerKg, co2SavedPerKg) => {
    try {
        const response = await axios.put(`${API_URL}/materials/update?id=${id}&pointPerKg=${pointsPerKg}&saveCo2perKg=${co2SavedPerKg}`);
        console.log(response.data);
        console.log(response.status);
        if (response.status === 200 || response.status === 201) {
            return true;
        }
        return false;
    } catch (e) {
        console.error('Error updating:', e);
        return false;
    }
}


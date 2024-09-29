import axios from 'axios';

export const getCities = async (params: string = '') => {
    try {
        const response = await axios.get(`https://api.mercantile.com.pk/get-cities${params}`);
        if (response?.data.success === true) {
            return response.data.data;
        }
    } catch(err) {
        console.error('Error fetching cities');
    }
}
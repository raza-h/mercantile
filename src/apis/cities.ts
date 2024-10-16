import axios from 'axios';
import { showErrorToast } from '../utils/common';

export const getCities = async (params: string = '') => {
    try {
        const response = await axios.get(`https://api.mercantile.com.pk/get-cities${params}`);
        if (response?.data.success === true) {
            return response.data.data;
        }
    } catch(error: any) {
        showErrorToast({action: 'fetching cities', error});
    }
}
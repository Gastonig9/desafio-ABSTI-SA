import axios from 'axios';
const BASE_URL = "https://data-job-api-5238.onrender.com"

export async function getJobs() {
    try {
        const response = await axios.get(`${BASE_URL}/jobs/get-latest-jobs`);
        return response.data; 
    } catch (error) {
        return error;
    }
}

export async function getJobByTitle(jobTitle) {
    try {
        const response = await axios.get(`${BASE_URL}/jobs/${jobTitle}`)
        return response.data; 
    } catch (error) {
        return error;
    }
}

export async function searchJobsByKey(key) {
    try {
        const response = await axios.get(`${BASE_URL}/jobs/search-by-key/?key=${key}`)
        return response.data; 
    } catch (error) {
        return error;
    }
}
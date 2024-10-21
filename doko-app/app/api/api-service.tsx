import axios from "axios";

const API_URL = 'http://localhost:8080';

const getAllGroups = async () => {
    return await axios.get(API_URL);
}

export { getAllGroups }
import axios from 'axios';

export default axios.create({
    baseURL: 'https://api-alpha-self.vercel.app/',
});

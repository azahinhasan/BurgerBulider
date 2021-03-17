import axios from 'axios';
//npm install --save axios


const instance=axios.create({
    baseURL: 'https://react-my-burger-8e4ce-default-rtdb.firebaseio.com/'

});

export default instance;
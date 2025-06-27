import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
const userInfos = ref({})
const token = ref('')

export const useLoginStore = defineStore('login',  () => {
    const login = async (credentials) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}auth/login`, 
                {
                    email: credentials.email,
                    mot_de_passe: credentials.password,
                }
            );
            console.log('try, ', response.data)
            userInfos.value = response.data
            if (response.data.user.email == credentials.email) {
                console.log('router, ', response.data)
                token.value = userInfos.token
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                console.log(response.data.user)
                await getCurrentUser();
                return true
            }
    
        } catch (error) {
            console.log("HAHA "+error)
            if (error.response) {
                console.error('Statut HTTP :', error.response.status);
                console.error('Message :', error.response.data);
              } else if (error.request) {
                console.error('Aucune réponse reçue :', error.request);
              } else {
                // console.error('Erreur');
              } 
        }

        return false
    }

    const logout = async () => {
        const response = await axios.delete(
            `${import.meta.env.VITE_API_URL}auth/logout`,
        );

        localStorage.removeItem('currentUser')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        return response;
    }

    const getCurrentUser = async () => {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}utilisateurs/get-current-user`, 
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        );

        localStorage.setItem('currentUser', JSON.stringify(response.data));
        return response.data;
    }

    return {login, logout, getCurrentUser}
});
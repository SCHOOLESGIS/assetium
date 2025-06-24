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

    return {login}
});
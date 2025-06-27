import { useLoginStore } from "../utils/auth/login"
import { useRouter } from "vue-router"
import Swal from 'sweetalert2';

export function isAuthenticated (to, from, next) {
    const token = localStorage.getItem('token')
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    const auth = useLoginStore()
    console.log("Current "+currentUser)
    const router = useRouter();
    console.log(router.currentRoute.value)

    if (token == null || currentUser == null ) {
        if (router.currentRoute.value.name != "connexion") {
            router.push({name: 'connexion'})
            Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            }).fire({
                icon: 'warning',
                title: 'Connectez vous et ressayez !'
            });
        } else {
            console.log("stay !")
        }
    }

    next()
}
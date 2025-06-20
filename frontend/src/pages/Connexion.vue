<template>
    <div class="flex items-center justify-center gap-2 w-full h-screen">
        <div class="p-1 w-[175px] rounded-full flex gap-1 items-center absolute top-1 left-1">
            <div class="h-[25px] w-[25px] rounded-full bg-black flex items-center justify-center">
                <img src="../../public/assetium-white.png" alt="" class="w-8">
            </div>
            <div class="">Assetium</div>
        </div>
        <div class="p-6 w-[100%] lg:w-[50%] h-screen flex flex-col items-center justify-center gap-5">
            <div class="p-1 w-[175px] rounded-full flex flex-col gap-1 items-center">
                <div class="h-[65px] w-[65px] rounded-full bg-black hover:bg-blue-500 duration-200 flex items-center justify-center">
                    <img src="../../public/assetium-white.png" alt="" class="w-10">
                </div>
            </div>
            <div class="mb-2 flex flex-col items-center justify-center">
                <h2 class="text-2xl font-semibold mb-3">Se connecter</h2>
                <div class="text-sm">Saisissez les informations suivantes pour vous connecter.</div>
            </div>

            <form @submit.prevent="onLogin" class="flex flex-col gap-2 lg:w-[75%] w-[90%]">
                <div class="mb-2 border rounded-full hover:border-blue-500 w-full flex p-1 group">
                    <input v-model="email" type="email" placeholder="Email" class="p-4 h-full w-[calc(100%-50px)] rounded-full focus:border-amber-500" />
                    <div class="p-4 w-[50px] flex items-center justify-center">
                        <i class="fi fi-rr-at"></i>
                    </div>
                </div>
                <div class="mb-2 border hover:border-blue-500 rounded-full w-full flex p-1">
                    <input v-model="password" type="password" placeholder="Mot de passe" class="p-4 h-full w-[calc(100%-50px)] rounded-full" />
                    <div class="p-4 w-[50px] flex items-center justify-center">
                        <i class="fi fi-rr-lock"></i>
                    </div>
                </div>
                <small class="mb-2 text-sm underline"><a href="" class="hover:text-blue-500 hover:underline duration-200">Mot de passe oublié ?</a></small>
                <button type="submit" class="mb-4 cursor-pointer rounded-full bg-black hover:bg-blue-500 duration-200 text-white px-4 py-4 rounded">Se connecter</button>
                <small class="mb-2 text-sm w-full text-center"><a href="" class="hover:text-blue-500 hover:underline duration-200">N'avez-vous pas un compte ? Créer un compte</a></small>
            </form>

            <div v-if="loginStore.errorMsg" class="text-red-500 mt-2">
            {{ loginStore.errorMsg }}
            </div>
        </div>
        <!-- <div class="w-[50%] h-screen p-2">
            <div class="W-full h-full rounded-md border-4 bg-black overflow-hidden relative">
                <img src="../../public/assetium-white.png" alt="" class="absolute w-24" style="transform: translate(-50%, -50%); top: 50%; left: 50%"> -->
                <!-- <img src="../../public/mesh.png" alt="" class="w-full"> -->
            <!-- </div> -->
        <!-- </div> -->
    </div>
</template>

<script setup>
    import { useLoginStore } from '../utils/auth/login';
    import { ref } from "vue";
    import { useRouter } from "vue-router";
    import Swal from 'sweetalert2';

    const router = useRouter();

    const email = ref('')
    const password = ref('')
    const loginStore = useLoginStore()

    const onLogin = async () => {
        const success = await loginStore.login({ email: email.value, password: password.value })
        if (success) {
            console.log("success "+ success)
            router.push({name: 'dashboard'})
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
                icon: 'success',
                title: 'Connexion réussie !'
            });
        } else {
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
                title: 'Echec de la connexion !'
            });
        }
    }
</script>

<style>
    
</style>
<template>
    <div class="w-full flex relative">
        <div class="w-[300px] h-screen border border-slate-300/70 sticky top-0">
            <div class="h-[90px] border-b border-slate-300/70 flex items-center justify-start pl-6">
                <div class="p-1 rounded-full flex gap-4 items-center">
                    <div class="rounded-full flex items-center justify-center">
                        <img src="../../public/assetium.png" alt="" class="w-[60px]">
                    </div>
                    <div class="">
                        <div class="text-2xl font-semibold">Assetium</div>
                        <small>Gérez vos équipements.</small>
                    </div>
                </div>
            </div>
            <div class="w-full py-4 px-[30px]">
                <div class="h-[90px] w-full border-b border-slate-300/70 mb-[30px] flex items-center justify-start">
                    <div class="rounded-full flex gap-6 items-center">
                        <div class="h-[50px] w-[50px] rounded-full bg-blue-500 flex items-center justify-center overflow-hidden" style="">
                            <div class="h-[45px] w-[45px] rounded-full bg-black flex items-center justify-center overflow-hidden border-2 border-white">
                                <img src="../../public/me.png" alt="" class="w-full">
                            </div>
                        </div>
                        <div class="">
                            <div class="text-md font-semibold">{{ user?.nom }}</div>
                            <small class="text-xs text-slate-400">{{ user?.role }}</small>
                        </div>
                    </div>
                </div>

                <ul class="">
                    <li v-for="nav in navigations" :key="nav['icon']" class="mb-[18px] text-[12px] font-semibold flex justify-between duration-500 hover:bg-blue-200 px-[5px] py-[4px] rounded cursor-pointer" @click="navigateTo(nav['link'])">
                        <div class="flex gap-5"><div class="text-[18px] font-bold text-blue-500"><i :class="nav['icon']"></i></div> <div class="">{{ nav['title'] }}</div></div> <div v-if="nav['count']" class="p-1 rounded-full text-blue-500 bg-blue-500/10">{{nav['count']}}</div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="w-[calc(100%-300px)] min-h-screen">
            <div class="h-[90px] border-b border-slate-300/70 flex items-center justify-between px-3 sticky top-0">
                <div class=""></div>
                <div class="flex gap-1">
                    <div class="p-1 rounded-full flex gap-4 items-center">
                        <div class="h-[50px] w-[50px] rounded-full flex items-center justify-center overflow-hidden" style="">
                            <div class="h-[45px] w-[45px] rounded-full flex items-center justify-center overflow-hidden text-2xl text-slate-500">
                                <i class="fi fi-rr-bell-notification-social-media"></i>
                            </div>
                        </div>
                    </div>
                    <div class="p-1 rounded-full flex gap-4 items-center cursor-pointer hover:shadow-2xl duration-400 hover:outline outline-slate-400" @click="showProfilOptions()">
                        <div class="h-[50px] w-[50px] rounded-full bg-blue-500 flex items-center justify-center overflow-hidden" style="">
                            <div class="h-[45px] w-[45px] rounded-full bg-black flex items-center justify-center overflow-hidden border-2 border-white">
                                <img src="../../public/me.png" alt="" class="w-full">
                            </div>
                        </div>
                    </div>
                    <div v-if="profilOptions" class="absolute w-[160px] top-[75px] right-4 bg-white h-[100px] rounded shadow-2xl p-2">
                        <button @click="logout()" class="w-full border-b border-slate-300 py-2 duration-300 hover:bg-red-100 hover:text-red-500 rounded cursor-pointer flex items-center justify-center gap-1 px-1"><i class="fi fi-rr-leave"></i> <span>Se deconnecter</span></button>
                        <button class="w-full border-b border-slate-300 py-2 duration-300 hover:bg-blue-100 hover:text-blue-500 rounded cursor-pointer flex items-center justify-center gap-1 px-1"><i class="fi fi-rr-user"></i> <span>Profil</span></button>
                    </div>
                </div>
            </div>
            <div class="w-full px-[40px] py-[20px]">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import {useRouter} from 'vue-router';
    import { useLoginStore } from '../utils/auth/login';
    import Swal from 'sweetalert2';


    const router = useRouter();
    const user = JSON.parse(localStorage.getItem('user'));
    const loginStore = useLoginStore()
    const profilOptions = ref(false)

    const navigations = ref([
        {
            icon: "fi fi-rr-curve-arrow",
            title: "Tableaux de bord",
            link: "/dashboard",
        },
        {
            icon: "fi fi-rr-tool-box",
            title: "Equipements",
            link: "/equipements",
            count: 3
        },
        {
            icon: "fi fi-rr-comment-alt-dots",
            title: "Messages",
            link: "/messages",
            count: 3
        },
        {
            icon: "fi fi-rr-triangle-warning",
            title: "Incidents",
            link: "/incidents",
            count: 100
        },
        {
            icon: "fi fi-rr-users-alt",
            title: "Utilisateurs",
            link: "/utilisateurs",
            count: 279
        },
        {
            icon: "fi fi-rr-assign",
            title: "Affectations",
            link: "/affectations",
            count: 1
        },
        {
            icon: "fi fi-rr-rectangle-vertical-history",
            title: "Historiques",
            link: "/historique"
        },
        {
            icon: "fi fi-rr-user-headset",
            title: "Supports",
            link: "/support"
        },
        {
            icon: "fi fi-rr-gears",
            title: "Paramètres",
            link: "/parametres"
        },
    ]);

    function showProfilOptions() {
        profilOptions.value = !profilOptions.value
    }

    function navigateTo(url) {
        router.push(url);
    }

    async function logout () {
        await loginStore.logout();
        router.push({name: 'connexion'});
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
            title: 'Déconnexion réussie !'
        });
    }

    onMounted(async () => {
        await loginStore.getCurrentUser();
    })
</script>

<style scoped>
    
</style>
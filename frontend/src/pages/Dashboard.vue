<template>
    <SidebarLayout>
        <div class="text-3xl font-bold mb-4">Tableau de bord</div>
        <div class="w-full flex gap-3 flex-wrap mb-3">
            <div class="w-[300px] min-h-[100px] flex flex-wrap gap-3 grow">
                <div class="w-[200px] min-h-[125px] bg-white grow rounded shadow relative flex items-center p-3">
                    <div class="flex flex-col gap-4">
                        <div class="text-3xl font-bold">45</div>
                        <div class="text-slate-500">Equipements</div>
                    </div>
                    <div class="absolute top-3 right-4 text-xl text-indigo-500">
                        <i class="fi fi-rr-computer"></i>
                    </div>
                </div>
                <div class="w-[200px] min-h-[125px] bg-white grow rounded shadow relative flex items-center p-3">
                    <div class="flex flex-col gap-4">
                        <div class="text-3xl font-bold">22</div>
                        <div class="text-slate-500">Incidents</div>
                    </div>
                    <div class="absolute top-3 right-4 text-xl text-amber-500">
                        <i class="fi fi-rr-triangle-warning"></i>
                    </div>
                </div>
                <div class="w-[200px] min-h-[125px] bg-white grow rounded shadow relative flex items-center p-3">
                    <div class="flex flex-col gap-4">
                        <div class="text-3xl font-bold">6</div>
                        <div class="text-slate-500">Affectations</div>
                    </div>
                    <div class="absolute top-3 right-4 text-xl text-green-500">
                        <i class="fi fi-rr-assign"></i>
                    </div>
                </div>
                <div class="w-[200px] min-h-[125px] bg-white grow rounded shadow relative flex items-center p-3">
                    <div class="flex flex-col gap-4">
                        <div class="text-3xl font-bold">11</div>
                        <div class="text-slate-500">Utilisateurs</div>
                    </div>
                    <div class="absolute top-3 right-4 text-xl text-blue-500">
                        <i class="fi fi-rr-user"></i>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded shadow px-2 w-[300px] grow">
                <canvas id="myChart"></canvas>
            </div>
        </div>
        <div class="flex min-h-[250px] gap-3">
            <div class="w-[400px] max-h-[400px] px-2 py-4 bg-white rounded shadow flex flex-col items-start justify-center">
                <div class="text-lg text-slate-500">Nombres d'incidents par priorités.</div>
                <canvas id="myChart2"></canvas>
            </div>
            <div class="w-[calc(100%-400px)] max-h-[400px]">
                <div class="w-full h-full bg-white rounded shadow p-2 flex flex-col gap-2">
                    <div class="w-full px-1 p-2 flex items-center justify-between border-slate-200 h-[50px] rounded">
                        <div class="text-sm text-center text-gray-600">Evolution des entités</div>
                        <button @click="byEntity('equipements')" class="button cursor-pointer hover:text-blue-500 duration-300 py-1 px-6 bg-white border border-slate-200 rounded flex items-center justify-center">Equipements</button>
                        <button @click="byEntity('utilisateurs')" class="button cursor-pointer hover:text-blue-500 duration-300 py-1 px-6 bg-white border border-slate-200 rounded flex items-center justify-center">Utilisateurs</button>
                        <button @click="byEntity('incidents')" class="button cursor-pointer hover:text-blue-500 duration-300 py-1 px-6 bg-white border border-slate-200 rounded flex items-center justify-center">Incidents</button>
                        <button @click="byEntity('affectations')" class="button cursor-pointer hover:text-blue-500 duration-300 py-1 px-6 bg-white border border-slate-200 rounded flex items-center justify-center">Affectations</button>
                    </div>
                    <div class="w-full h-[calc(100%-50px)] border border-slate-200 rounded px-2 py-1">
                        <canvas v-show="showByEntity == 'equipements'" id="byEquipement"></canvas>
                        <canvas v-show="showByEntity == 'utilisateurs'" id="byUtilisateur"></canvas>
                        <canvas v-show="showByEntity == 'incidents'" id="byIncident"></canvas>
                        <canvas v-show="showByEntity == 'affectations'" id="byAffectation"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </SidebarLayout>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import SidebarLayout from '../layouts/SidebarLayout.vue';
    const showByEntity = ref("incidents");

    function byEntity (entity) {
        showByEntity.value = entity;
    }



    onMounted(() => {
        const buttons = document.querySelectorAll('.button');
        activeButtons(buttons);
        loadEquipementGraph();
        const ctx = document.getElementById('myChart');
        new Chart(ctx, {
            type: 'bar',
            data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
                borderWidth: 1,
                borderSkipped: 'right'
            }]
            },
            options: {
                indexAxis: 'y',
                scales: {
                    y: {
                    beginAtZero: true
                    }
                }
            }
        });

        const ctx2 = document.getElementById('myChart2');
        new Chart(ctx2, {
            type: 'polarArea',
            data: {
                datasets: [{
                    label: 'My First Dataset',
                    data: [11, 16, 7, 3, 14],
                    backgroundColor: [
                        'rgb(255, 99, 132, 0.75)',
                        'rgb(75, 192, 192, 0.75)',
                        'rgb(255, 205, 86, 0.75)',
                        'rgb(201, 203, 207, 0.75)',
                        'rgb(54, 162, 235, 0.75)'
                    ]
                }]
                },
            options: {}
        });

    });


function loadEquipementGraph() {
    function getLast7Days() {
        const days = [];
        const options = { weekday: 'short', day: 'numeric', month: 'short' };
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            days.push(d.toLocaleDateString('fr-FR', options));
        }
        return days;
    }

    function getRandomData() {
        return Array.from({ length: 7 }, () => Math.floor(Math.random() * 100));
    }

    const labels = getLast7Days();

    const ctxs = [
        { id: 'byEquipement', label: 'Equipements' },
        { id: 'byUtilisateur', label: 'Utilisateurs' },
        { id: 'byIncident', label: 'Incidents' },
        { id: 'byAffectation', label: 'Affectations' }
    ];

    ctxs.forEach(({ id, label }) => {
        const ctx = document.getElementById(id);
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: getRandomData(),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });
}

function activeButtons (buttons) {
    buttons.forEach(button => {
        button.addEventListener('click', function () {
                buttons.forEach(button => {
                    button.classList.remove('text-blue-500')
                });
            button.classList.toggle('text-blue-500')
        })
    });
}

</script>

<style>
    
</style>
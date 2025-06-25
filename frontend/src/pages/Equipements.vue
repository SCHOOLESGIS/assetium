<template>
  <SidebarLayout>
    <div class="text-3xl font-bold">Équipements</div>
    <small class="mb-4 text-sm">Liste des équipements.</small>
    <div class="h-[40px] w-full flex justify-between items-center mt-3">
      <div class="w-[30%] h-full flex border border-slate-300 rounded group">
        <input type="text" name="" id="" class="h-full w-[calc(100%-40px)] rounded pl-3 focus:outline-none" placeholder="Rechercher" v-model="search">
        <div class="h-[40px] w-[40px] flex items-center justify-center">
          <i class="fi fi-rr-search"></i>
        </div>
      </div>
      {{ search }}
      <div class="flex gap-2">
        <button class="bg-white text-blue-500 hover:text-blue-600 duration-300 border border-blue-500 rounded py-1 px-2 cursor-pointer"><i class="fi fi-rr-bars-filter"></i> Filtrer</button>
        <button class="bg-blue-500 hover:bg-blue-600 duration-300 text-white rounded py-1 px-2 cursor-pointer"><i class="fi fi-rr-file-export"></i> Exporter</button>
        <button v-if="checkbox" class="bg-red-500 hover:bg-blue-600 duration-300 text-white rounded py-1 px-2 cursor-pointer" @click="deleteAllEquipements()"><i class="fi fi-rr-trash"></i> Delete all</button>
      </div>
    </div>
    <div class="mt-3 p-2 border border-slate-200 rounded shadow">
      <div class="w-full border rounded border-slate-200 overflow-auto">
        <table class="w-full table-auto text-sm">
          <thead class="bg-gray-200 text-blue-400 px-1 py-2">
            <tr class="font-semibold text-gray-600 text-[14px] px-2 py-2">
              <th class="">
                <input type="checkbox" v-model="checkbox"/>
              </th>
              <th v-for="head in headers" :key="head.name" class="px-2 py-3 text-start">
                {{ head.name }}
              </th>
            </tr>
          </thead>
          <tbody v-if="equipements?.data?.length">
            <tr v-for="equipement in equipements.data" :key="equipement.id" class="hover:bg-gray-200/50">
              <td class="px-2 py-3 text-start">
                <input type="checkbox" v-model="checkbox"/>
              </td>
              <td class="px-2 py-3 text-start">{{ equipement.nom }}</td>
              <td class="px-2 py-3 text-start">{{ equipement.marque }}</td>
              <td class="px-2 py-3 text-start">{{ equipement.modele }}</td>
              <td class="px-2 py-3 text-start">{{ equipement.numero_serie }}</td>
              <td class="px-2 py-3 text-start">{{ equipement.date_acquisition }}</td>
              <td class="px-2 py-3 text-start">
                <span v-if="equipement.etat == 'en panne'" class="p-1 text-xs rounded flex items-center justify-center bg-red-100 text-red-500 flex items-center gap-2"><span class="h-[5px] w-[5px] rounded-full bg-red-500"></span> {{ equipement.etat }}</span>
                <span v-if="equipement.etat == 'en service'" class="p-1 text-xs rounded flex items-center justify-center bg-blue-100 text-blue-500 flex items-center gap-2"><span class="h-[5px] w-[5px] rounded-full bg-blue-500"></span> {{ equipement.etat }}</span>
                <span v-if="equipement.etat == 'maintenance'" class="p-1 text-xs rounded flex items-center justify-center bg-amber-100 text-amber-500 flex items-center gap-2"><span class="h-[5px] w-[5px] rounded-full bg-amber-500"></span> {{ equipement.etat }}</span>
              </td>
              <td class="px-2 py-3 text-start">{{ equipement.TypeEquipement.libelle }}</td>
              <td class="pr-5 py-3 text-end relative">
                <button class="text-gray-600 cursor-pointer group" @click="showActionsFunc(equipement.numero_serie)" :key="equipement.numero_serie">
                    <i class="fi fi-rr-menu-dots"></i>
                    <div class="absolute p-1 w-[125px] duration-500 bg-white z-[100] rounded shadow-2xl bottom-[10px] right-3 group-hover:block hidden" :data-serie="equipement.numero_serie">
                        <ul class="w-full">
                            <li class="mb-2 w-full"><button @click="deleteEquipement(equipement.id)" class="w-full p-1 rounded cursor-pointer bg-red-100/50 hover:bg-red-200 duration-300 text-red-500 flex items-center justify-between gap-2"><span>Supprimer</span> <i class="fi fi-rr-delete"></i></button></li>
                            <li class="w-full"><button class="w-full p-1 rounded cursor-pointer bg-blue-100/50 hover:bg-blue-200 duration-300 text-blue-500 flex items-center justify-between gap-2"><span>Mettre à jour</span> <i class="fi fi-rr-edit"></i></button></li>
                        </ul>
                    </div>
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="9" class="text-center py-4 text-gray-400">Aucun équipement disponible</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </SidebarLayout>
</template>

<script setup>
    import { onMounted, ref, watch, computed } from 'vue'
    import SidebarLayout from '../layouts/SidebarLayout.vue'
    import { useEquipementStore } from '../stores/equipements'
    import Swal from 'sweetalert2';
    
    const equipementStore = useEquipementStore()
    const equipements = ref({ data: [] })
    const checkbox = ref(false);
    const search = ref(null);

    const headers = ref([
    { name: "Nom" },
    { name: "Marque" },
    { name: "Modèle" },
    { name: "Numéro de série" },
    { name: "Date d'Acquisition" },
    { name: "Etat" },
    { name: "Type d'Équipement" },
    { name: "Action" }
    ])

    async function deleteAllEquipements () {
      Swal.fire({
          title: "Suppression de tous les équipements",
          html: `
              <div style="font-size: 15px;">
                  Cette opération <b style="color:#d33;">est irréversible</b>.<br>
                  Voulez-vous vraiment <span style="color:#3085d6;">supprimer définitivement</span> ses équipement ?
              </div>
          `,
          icon: "warning",
          iconHtml: '<i class="fi fi-rr-limit-hand" style="font-size:35px; color:orange;"></i>',
          background: "#fefefe",
          showCancelButton: true,
          confirmButtonText: '<i class="fi fi-rr-trash"></i> Oui, tous supprimer',
          cancelButtonText: '<i class="fi fi-rr-time-delete"></i> Non, annuler',
          confirmButtonColor: "#e3342f",
          cancelButtonColor: "#6c757d",
          buttonsStyling: false,
          customClass: {
              popup: 'rounded shadow-lg border border-slate-200',
              title: 'text-sm font-semibold text-gray-800',
              htmlContainer: 'text-sm text-gray-600',
              confirmButton: 'bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded mr-2 cursor-pointer',
              cancelButton: 'bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded ml-2 cursor-pointer'
          }
      }).then(async (result) => {
          if (result.isConfirmed) {
              equipements.value.data.forEach(async (equipement) => {
                await equipementStore.deleteEquipement(equipement.id);
                await loadEquipements();
              });

              Swal.fire({
                  title: "Équipements supprimés",
                  text: "Les équipements ont été supprimé avec succès.",
                  icon: "success",
                  confirmButtonText: "Fermer",
                  background: "#f9f9f9",
                  customClass: {
                      popup: 'rounded-xl shadow-md border border-slate-200',
                      title: 'text-lg font-semibold text-green-700',
                      confirmButton: 'bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded'
                  }
              });
          }
      });
    }

    async function deleteEquipement(id) {
      Swal.fire({
          title: "Suppression d'équipement",
          html: `
              <div style="font-size: 15px;">
                  Cette opération <b style="color:#d33;">est irréversible</b>.<br>
                  Voulez-vous vraiment <span style="color:#3085d6;">supprimer définitivement</span> cet équipement ?
              </div>
          `,
          icon: "warning",
          iconHtml: '<i class="fi fi-rr-limit-hand" style="font-size:35px; color:orange;"></i>',
          background: "#fefefe",
          showCancelButton: true,
          confirmButtonText: '<i class="fi fi-rr-trash"></i> Oui, supprimer',
          cancelButtonText: '<i class="fi fi-rr-time-delete"></i> Non, annuler',
          confirmButtonColor: "#e3342f",
          cancelButtonColor: "#6c757d",
          buttonsStyling: false,
          customClass: {
              popup: 'rounded shadow-lg border border-slate-200',
              title: 'text-sm font-semibold text-gray-800',
              htmlContainer: 'text-sm text-gray-600',
              confirmButton: 'bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded mr-2 cursor-pointer',
              cancelButton: 'bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded ml-2 cursor-pointer'
          }
      }).then(async (result) => {
          if (result.isConfirmed) {
              await equipementStore.deleteEquipement(id);
              await loadEquipements();
              Swal.fire({
                  title: "Équipement supprimé",
                  text: "L'équipement a été supprimé avec succès.",
                  icon: "success",
                  confirmButtonText: "Fermer",
                  background: "#f9f9f9",
                  customClass: {
                      popup: 'rounded-xl shadow-md border border-slate-200',
                      title: 'text-lg font-semibold text-green-700',
                      confirmButton: 'bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded'
                  }
              });
          }
      });

    }



    onMounted(async () => {
      await loadEquipements()
    })

    async function loadEquipements () {
      await equipementStore.getAllEquipements();
      equipements.value = equipementStore.equipements;
    }

    computed(() => {
      return equipements.value.data.filter(equipement => {
        console.log(equipement.nom)

        equipement.nom.toLowerCase().includes(search.value.toLowerCase());
      })
    })
</script>
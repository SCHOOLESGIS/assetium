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
      <div class="flex gap-2 relative">
        <div v-if="showDateFilter" class="mt-3 bg-white p-3 rounded shadow-2xl flex flex-col gap-3 items-end absolute z-10 right-0 top-[30px] w-[200px]">
          <div class="flex flex-col w-full items-start">
            <label class="text-sm text-gray-600 mb-1">Date min</label>
            <input type="date" v-model="dateMin" class="border  rounded px-2 py-1 text-sm w-full" />
          </div>
          <div class="flex flex-col w-full items-start">
            <label class="text-sm text-gray-600 mb-1">Date max</label>
            <input type="date" v-model="dateMax" class="border rounded px-2 py-1 text-sm w-full" />
          </div>
          <div class="flex gap-2 w-full">
            <button @click="resetDateFilter" class="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 text-sm w-full">
              Réinitialiser
            </button>
          </div>
        </div>
        <button @click="showDateFilter = !showDateFilter" class="bg-white text-blue-500 hover:text-blue-600 duration-300 border border-blue-500 rounded py-1 px-2 cursor-pointer relative">
          <i class="fi fi-rr-bars-filter"></i> Filtrer
        </button>
        <button class="bg-blue-500 hover:bg-blue-600 duration-300 text-white rounded py-1 px-2 cursor-pointer relative group">
          Exporter <i class="fi fi-rr-angle-small-down"></i> 
          <div class="absolute top-[35px] right-0 w-[150px] h-[100px] bg-white rounded shadow-xl z-10 border border-slate-200 p-2 hidden group-hover:block duration-300">
            <button @click="exportToExcel()" class="text-green-500 h-[40px] w-full bg-green-200 rounded cursor-pointer hover:bg-green-300 duration-300 mb-1"><i class="fi fi-rr-file-excel"></i> Excel</button>
            <button @click="exportToCSV()" class="text-blue-500 h-[40px] w-full bg-blue-200 rounded cursor-pointer hover:bg-blue-300 duration-300"><i class="fi fi-rr-file-csv"></i>CSV</button>
          </div>
        </button>
        <button class="bg-amber-500 hover:bg-amber-600 duration-300 text-white rounded py-1 px-2 cursor-pointer" @click="createEquipement()"><i class="fi fi-rr-add"></i> Ajouter</button>
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
          <tbody v-if="filteredEquipements.length">
            <tr v-for="equipement in filteredEquipements" :key="equipement.id" class="hover:bg-gray-200/50">
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
                            <li class="w-full"><button @click="updateEquipement(equipement)" class="w-full p-1 rounded cursor-pointer bg-blue-100/50 hover:bg-blue-200 duration-300 text-blue-500 flex items-center justify-between gap-2"><span>Mettre à jour</span> <i class="fi fi-rr-edit"></i></button></li>
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
    import { useTypeEquipementStore } from '../stores/typeEquipements'
    import Swal from 'sweetalert2';
    import * as XLSX from 'xlsx';
    import { saveAs } from 'file-saver';
    const showDateFilter = ref(false)
    const dateMin = ref('')
    const dateMax = ref('')
    
    const equipementStore = useEquipementStore()
    const typeEquipementStore = useTypeEquipementStore()
    const equipements = ref({ data: [] })
    const typeEquipements = ref({ data: [] })
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

    async function createEquipement() {
      const optionsTypeEquipement = typeEquipements.value.map(type => {
        return `<option value="${type.id}">${type.libelle}</option>`;
      }).join('');
      const { value: formValues } = await Swal.fire({
        title: '<div class="text-2xl font-semibold text-gray-800">Ajouter un équipement</div>',
        html: `
          <div class="flex flex-col gap-2 text-left text-sm text-gray-700">
            <div class="text-sm text-gray-500 mb-4 w-full text-center">
              Veuillez modifier les champs ci-dessous puis valider.
            </div>
            <div>
              <label for="swal-nom" class="mb-1 block font-medium">Nom</label>
              <input id="swal-nom" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Nom" required>
            </div>
            <div>
              <label for="swal-marque" class="mb-1 block font-medium">Marque</label>
              <input id="swal-marque" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Marque"" required>
            </div>
            <div>
              <label for="swal-modele" class="mb-1 block font-medium">Modèle</label>
              <input id="swal-modele" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Modèle" required>
            </div>
            <div>
              <label for="swal-numero" class="mb-1 block font-medium">Numéro de série</label>
              <input id="swal-numero" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Numéro de série" required>
            </div>
            <div>
              <label for="swal-date" class="mb-1 block font-medium">Date d'acquisition</label>
              <input id="swal-date" type="date" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required>
            </div>
            <div>
              <label for="swal-etat" class="mb-1 block font-medium">État</label>
              <select id="swal-etat" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="en service">En service</option>
                <option value="en panne">En panne</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
            <div>
              <label for="swal-etat" class="mb-1 block font-medium">Type d'équipements</label>
              <select id="swal-type" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required>
                ${optionsTypeEquipement}
              </select>
            </div>
          </div>
        `,
        buttonsStyling: false,
        customClass: {
          popup: 'rounded-xl shadow-lg border border-gray-200 px-6 py-4',
          confirmButton: 'bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer',
          cancelButton: 'bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer'
        },
        didRender: () => {
          const actions = document.querySelector('.swal2-actions');
          if (actions) {
            actions.classList.add('flex', 'justify-between', 'w-full', 'gap-[50px]', 'mt-4');
          }
        },
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: '<i class="fi fi-rr-add"></i> Ajouter',
        cancelButtonText: '<i class="fi fi-rr-time-delete"></i> Annuler',
          
        preConfirm: () => {
          const nom = document.getElementById('swal-nom').value.trim();
          const marque = document.getElementById('swal-marque').value.trim();
          const modele = document.getElementById('swal-modele').value.trim();
          const numero_serie = document.getElementById('swal-numero').value.trim();
          const date_acquisition = document.getElementById('swal-date').value;
          const etat = document.getElementById('swal-etat').value;
          const type_id = document.getElementById('swal-type').value;

          if (!nom) {
            Swal.showValidationMessage('Le champ "Nom" est requis.');
            return false;
          }
          if (!marque) {
            Swal.showValidationMessage('Le champ "Marque" est requis.');
            return false;
          }
          if (!modele) {
            Swal.showValidationMessage('Le champ "Modèle" est requis.');
            return false;
          }
          if (!numero_serie) {
            Swal.showValidationMessage('Le champ "Numéro de série" est requis.');
            return false;
          }
          if (!date_acquisition) {
            Swal.showValidationMessage("La date d'acquisition est requise.");
            return false;
          }
          if (!etat) {
            Swal.showValidationMessage("Le champ État est requis.");
            return false;
          }
          if (!type_id) {
            Swal.showValidationMessage("Le champ Type est requis.");
            return false;
          }
          return {
            nom,
            marque,
            modele,
            numero_serie,
            date_acquisition,
            etat,
            type_id
          };
        }
      });

      if (formValues) {
        await equipementStore.createEquipement(formValues);
        await loadEquipements();

        Swal.fire({
          icon: 'success',
          title: 'Ajout réussie',
          text: 'Les informations ont été enregistrées.',
          timer: 2000,
          showConfirmButton: false
        });
      }
    }

    async function updateEquipement(equipement) {
      const optionsTypeEquipement = typeEquipements.value.map(type => {
        const selected = equipement.type_id === type.id ? 'selected' : '';
        return `<option value="${type.id}" ${selected}>${type.libelle}</option>`;
      }).join('');
      const { value: formValues } = await Swal.fire({
        title: '<div class="text-2xl font-semibold text-gray-800">Mettre à jour l’équipement</div>',
        html: `
          <div class="flex flex-col gap-2 text-left text-sm text-gray-700">
            <div class="text-sm text-gray-500 mb-4 w-full text-center">
              Veuillez modifier les champs ci-dessous puis valider.
            </div>
            <div>
              <label for="swal-nom" class="mb-1 block font-medium">Nom</label>
              <input id="swal-nom" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Nom" value="${equipement.nom || ''}">
            </div>
            <div>
              <label for="swal-marque" class="mb-1 block font-medium">Marque</label>
              <input id="swal-marque" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Marque" value="${equipement.marque || ''}">
            </div>
            <div>
              <label for="swal-modele" class="mb-1 block font-medium">Modèle</label>
              <input id="swal-modele" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Modèle" value="${equipement.modele || ''}">
            </div>
            <div>
              <label for="swal-numero" class="mb-1 block font-medium">Numéro de série</label>
              <input id="swal-numero" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Numéro de série" value="${equipement.numero_serie || ''}">
            </div>
            <div>
              <label for="swal-date" class="mb-1 block font-medium">Date d'acquisition</label>
              <input id="swal-date" type="date" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" value="${equipement.date_acquisition || ''}">
            </div>
            <div>
              <label for="swal-etat" class="mb-1 block font-medium">État</label>
              <select id="swal-etat" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="en service" ${equipement.etat === 'en service' ? 'selected' : ''}>En service</option>
                <option value="en panne" ${equipement.etat === 'en panne' ? 'selected' : ''}>En panne</option>
                <option value="maintenance" ${equipement.etat === 'maintenance' ? 'selected' : ''}>Maintenance</option>
              </select>
            </div>
            <div>
              <label for="swal-typeequipement" class="mb-1 block font-medium">Type d'équipement</label>
              <select id="swal-typeequipement" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
                ${optionsTypeEquipement}
              </select>
            </div>
          </div>
        `,
        buttonsStyling: false,
        customClass: {
          popup: 'rounded-xl shadow-lg border border-gray-200 px-6 py-4',
          confirmButton: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer',
          cancelButton: 'bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer'
        },
        didRender: () => {
          const actions = document.querySelector('.swal2-actions');
          if (actions) {
            actions.classList.add('flex', 'justify-between', 'w-full', 'gap-[50px]', 'mt-4');
          }
        },
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: '<i class="fi fi-rr-refresh"></i> Mettre à jour',
        cancelButtonText: '<i class="fi fi-rr-time-delete"></i> Annuler',
        preConfirm: () => {
          return {
            nom: document.getElementById('swal-nom').value,
            marque: document.getElementById('swal-marque').value,
            modele: document.getElementById('swal-modele').value,
            numero_serie: document.getElementById('swal-numero').value,
            date_acquisition: document.getElementById('swal-date').value,
            etat: document.getElementById('swal-etat').value,
            type_id: document.getElementById('swal-typeequipement').value
          };
        }
      });

      if (formValues) {
        await equipementStore.updateEquipement(formValues, equipement.id);
        await loadEquipements();

        Swal.fire({
          icon: 'success',
          title: 'Mise à jour réussie',
          text: 'Les informations ont été enregistrées.',
          timer: 2000,
          showConfirmButton: false
        });
      }
    }


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
              const deletedEquipements = ref(filteredEquipements)
              deletedEquipements.value.forEach(async (equipement) => {
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


    function exportToExcel() {
      const data = filteredEquipements.value.map((e) => ({
        Nom: e.nom,
        Marque: e.marque,
        Modele: e.modele,
        "Numéro de série": e.numero_serie,
        "Date d'acquisition": e.date_acquisition,
        Etat: e.etat,
        "Type d'équipement": e.TypeEquipement?.libelle,
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(workbook, worksheet, "Équipements");

      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

      saveAs(blob, getTimestampedFilename("equipements", "xslx"));
    }

    function exportToCSV() {
      const data = filteredEquipements.value.map((e) => ({
        Nom: e.nom,
        Marque: e.marque,
        Modele: e.modele,
        "Numéro de série": e.numero_serie,
        "Date d'acquisition": e.date_acquisition,
        Etat: e.etat,
        "Type d'équipement": e.TypeEquipement?.libelle,
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      const csv = XLSX.utils.sheet_to_csv(worksheet);

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, getTimestampedFilename("equipements", "csv"));
    }

    function getTimestampedFilename(baseName, extension) {
      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');
      const hh = String(now.getHours()).padStart(2, '0');
      const min = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');

      return `${baseName}_${yyyy}-${mm}-${dd}_${hh}-${min}-${ss}.${extension}`;
    }


    onMounted(async () => {
      await loadEquipements();
      await loadTypeEquipements()
    })

    async function loadEquipements () {
      await equipementStore.getAllEquipements();
      equipements.value = equipementStore.equipements;
    }

    async function loadTypeEquipements () {
      await typeEquipementStore.getAllTypesEquipements();
      typeEquipements.value = typeEquipementStore.typesEquipements;
    }

    const filteredEquipements = computed(() => {
      if (!equipements.value?.data?.length) return []

      return equipements.value.data.filter((e) => {
        const s = search.value?.toLowerCase() || ''
        const date = new Date(e.date_acquisition)

        const matchesSearch =
          e.nom?.toLowerCase().includes(s) ||
          e.marque?.toLowerCase().includes(s) ||
          e.modele?.toLowerCase().includes(s) ||
          e.numero_serie?.toLowerCase().includes(s) ||
          e.TypeEquipement?.libelle?.toLowerCase().includes(s)

        const afterMin = !dateMin.value || date >= new Date(dateMin.value)
        const beforeMax = !dateMax.value || date <= new Date(dateMax.value)

        return matchesSearch && afterMin && beforeMax
      })
    });

    function resetDateFilter() {
      dateMin.value = ''
      dateMax.value = ''
    }
</script>
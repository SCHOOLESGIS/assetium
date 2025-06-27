<template>
  <SidebarLayout>
    <div class="text-3xl font-bold">Incidents</div>
    <small class="mb-4 text-sm">Liste des incidents.</small>
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
        <button class="bg-amber-500 hover:bg-amber-600 duration-300 text-white rounded py-1 px-2 cursor-pointer" @click="createIncident()"><i class="fi fi-rr-add"></i> Ajouter</button>
        <button v-if="checkbox" class="bg-red-500 hover:bg-blue-600 duration-300 text-white rounded py-1 px-2 cursor-pointer" @click="deleteAllIncidents()"><i class="fi fi-rr-trash"></i> Delete all</button>
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
          <tbody v-if="filteredIncidents.length">
            <tr v-for="incident in filteredIncidents" :key="incident.id" class="hover:bg-gray-200/50">
              <td class="px-2 py-3 text-start">
                <input type="checkbox" v-model="checkbox"/>
              </td>
              <td class="px-2 py-3 text-start">{{ incident.Equipement.nom }}</td>
              <td class="px-2 py-3 text-start">{{ incident.description }}</td>
            <td class="px-2 py-3 text-start">
            <span v-if="incident.statut === 'ouvert'" class="p-1 text-xs rounded flex items-center justify-center bg-blue-100 text-blue-500 gap-2">
                <span class="h-[5px] w-[5px] rounded-full bg-blue-500"></span> {{ incident.statut }}
            </span>
            <span v-else-if="incident.statut === 'résolu'" class="p-1 text-xs rounded flex items-center justify-center bg-green-100 text-green-500 gap-2">
                <span class="h-[5px] w-[5px] rounded-full bg-green-500"></span> {{ incident.statut }}
            </span>
            </td>
            <td class="px-2 py-3 text-start">{{ incident.date_signalement }}</td>
            <td class="px-2 py-3 text-start">
            <span v-if="incident.gravite === 'faible'" class="p-1 text-xs rounded flex items-center justify-center bg-emerald-100 text-emerald-500 gap-2">
                <span class="h-[5px] w-[5px] rounded-full bg-emerald-500"></span> {{ incident.gravite }}
            </span>
            <span v-else-if="incident.gravite === 'moyen'" class="p-1 text-xs rounded flex items-center justify-center bg-amber-100 text-amber-500 gap-2">
                <span class="h-[5px] w-[5px] rounded-full bg-amber-500"></span> {{ incident.gravite }}
            </span>
            <span v-else-if="incident.gravite === 'élevé'" class="p-1 text-xs rounded flex items-center justify-center bg-orange-100 text-orange-500 gap-2">
                <span class="h-[5px] w-[5px] rounded-full bg-orange-500"></span> {{ incident.gravite }}
            </span>
            <span v-else-if="incident.gravite === 'critique'" class="p-1 text-xs rounded flex items-center justify-center bg-red-100 text-red-500 gap-2">
                <span class="h-[5px] w-[5px] rounded-full bg-red-500"></span> {{ incident.gravite }}
            </span>
            </td>
              <td class="pr-5 py-3 text-end relative">
                <button class="text-gray-600 cursor-pointer group" @click="showActionsFunc(incident.numero_serie)" :key="incident.numero_serie">
                    <i class="fi fi-rr-menu-dots"></i>
                    <div class="absolute p-1 w-[125px] duration-500 bg-white z-[100] rounded shadow-2xl bottom-[10px] right-3 group-hover:block hidden" :data-serie="incident.numero_serie">
                        <ul class="w-full">
                            <li class="mb-2 w-full"><button @click="deleteIncident(incident.id)" class="w-full p-1 rounded cursor-pointer bg-red-100/50 hover:bg-red-200 duration-300 text-red-500 flex items-center justify-between gap-2"><span>Supprimer</span> <i class="fi fi-rr-delete"></i></button></li>
                            <li class="w-full"><button @click="updateIncident(incident)" class="w-full p-1 rounded cursor-pointer bg-blue-100/50 hover:bg-blue-200 duration-300 text-blue-500 flex items-center justify-between gap-2"><span>Mettre à jour</span> <i class="fi fi-rr-edit"></i></button></li>
                        </ul>
                    </div>
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="9" class="text-center py-4 text-gray-400">Aucun incident disponible</td>
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
    import { useIncidentStore } from '../stores/incidents'
    import { useEquipementStore } from '../stores/equipements'
    import Swal from 'sweetalert2';
    import * as XLSX from 'xlsx';
    import { saveAs } from 'file-saver';
    const showDateFilter = ref(false)
    const dateMin = ref('')
    const dateMax = ref('')
    
    const incidentStore = useIncidentStore()
    const equipementStore = useEquipementStore()
    const incidents = ref({ data: [] })
    const equipements = ref({ data: [] })
    const checkbox = ref(false);
    const search = ref(null);

    const headers = ref([
        { name: "Equipement" },
        { name: "Description" },
        { name: "Statut" },
        { name: "Date de Signalement" },
        { name: "Gravité" },
        { name: "Actions" }
    ])

    async function createIncident() {
        const { value: formValues } = await Swal.fire({
            title: '<div class="text-2xl font-semibold text-gray-800">Ajouter un incident</div>',
            html: `
            <div class="flex flex-col gap-2 text-left text-sm text-gray-700">
                <div class="text-sm text-gray-500 mb-4 w-full text-center">
                Veuillez remplir les champs ci-dessous.
                </div>

                <div>
                <label for="swal-equipement" class="mb-1 block font-medium">Équipement</label>
                <select id="swal-equipement" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
                    ${equipements.value.data.map(eq => `
                        <option value="${eq.id}">${eq.nom}</option>
                    `).join('')}
                </select>
                </div>

                <div>
                <label for="swal-description" class="mb-1 block font-medium">Description</label>
                <textarea id="swal-description" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" rows="3" placeholder="Décrivez l'incident..."></textarea>
                </div>

                <div>
                <label for="swal-date" class="mb-1 block font-medium">Date de signalement</label>
                <input id="swal-date" type="date" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" value="${new Date().toISOString().slice(0, 10)}">
                </div>

                <div>
                <label for="swal-statut" class="mb-1 block font-medium">Statut</label>
                <select id="swal-statut" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option value="ouvert">Ouvert</option>
                    <option value="résolu">Résolu</option>
                </select>
                </div>

                <div>
                <label for="swal-gravite" class="mb-1 block font-medium">Gravité</label>
                <select id="swal-gravite" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option value="faible">Faible</option>
                    <option value="moyen" selected>Moyen</option>
                    <option value="eleve">Élevé</option>
                    <option value="critique">Critique</option>
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
            const equipement_id = document.getElementById('swal-equipement').value;
            const description = document.getElementById('swal-description').value.trim();
            const date_signalement = document.getElementById('swal-date').value;
            const statut = document.getElementById('swal-statut').value;
            const gravite = document.getElementById('swal-gravite').value;

            if (!description) {
                Swal.showValidationMessage("La description est requise.");
                return false;
            }
            if (!date_signalement) {
                Swal.showValidationMessage("La date de signalement est requise.");
                return false;
            }

            return {
                equipement_id: parseInt(equipement_id),
                description,
                date_signalement,
                statut,
                gravite
            };
        }
    });

    if (formValues) {
        await incidentStore.createIncident(formValues);
        await loadIncidents();

        Swal.fire({
        icon: 'success',
        title: 'Ajout réussi',
        text: 'L’incident a été enregistré.',
        timer: 2000,
        showConfirmButton: false
        });
    }
    }

    async function updateIncident(incident) {
        const { value: formValues } = await Swal.fire({
            title: '<div class="text-2xl font-semibold text-gray-800">Mettre à jour l’incident</div>',
            html: `
            <div class="flex flex-col gap-2 text-left text-sm text-gray-700">
                <div class="text-sm text-gray-500 mb-4 w-full text-center">
                Veuillez modifier les champs ci-dessous puis valider.
                </div>
                <div>
                <label for="swal-description" class="mb-1 block font-medium">Description</label>
                <textarea id="swal-description" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" rows="3" placeholder="Description">${incident.description || ''}</textarea>
                </div>
                <div>
                <label for="swal-date" class="mb-1 block font-medium">Date de signalement</label>
                <input id="swal-date" type="date" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" value="${incident.date_signalement || ''}">
                </div>
                <div>
                <label for="swal-statut" class="mb-1 block font-medium">Statut</label>
                <select id="swal-statut" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option value="ouvert" ${incident.statut === 'ouvert' ? 'selected' : ''}>Ouvert</option>
                    <option value="resolu" ${incident.statut === 'resolu' ? 'selected' : ''}>Résolu</option>
                </select>
                </div>
                <div>
                <label for="swal-gravite" class="mb-1 block font-medium">Gravité</label>
                <select id="swal-gravite" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option value="faible" ${incident.gravite === 'faible' ? 'selected' : ''}>Faible</option>
                    <option value="moyen" ${incident.gravite === 'moyen' ? 'selected' : ''}>Moyen</option>
                    <option value="eleve" ${incident.gravite === 'eleve' ? 'selected' : ''}>Élevé</option>
                    <option value="critique" ${incident.gravite === 'critique' ? 'selected' : ''}>Critique</option>
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
            const description = document.getElementById('swal-description').value.trim();
            const date_signalement = document.getElementById('swal-date').value;
            const statut = document.getElementById('swal-statut').value;
            const gravite = document.getElementById('swal-gravite').value;

            if (!description) {
                Swal.showValidationMessage('Le champ "Description" est requis.');
                return false;
            }
            if (!date_signalement) {
                Swal.showValidationMessage("La date de signalement est requise.");
                return false;
            }

            return {
                description,
                date_signalement,
                statut,
                gravite
            };
        }
    });

    if (formValues) {
        await incidentStore.updateIncident(formValues, incident.id);
        await loadIncidents();

        Swal.fire({
        icon: 'success',
        title: 'Mise à jour réussie',
        text: 'Les informations ont été enregistrées.',
        timer: 2000,
        showConfirmButton: false
        });
    }
    }



    async function deleteAllIncidents () {
      Swal.fire({
          title: "Suppression de tous les incidents",
          html: `
              <div style="font-size: 15px;">
                  Cette opération <b style="color:#d33;">est irréversible</b>.<br>
                  Voulez-vous vraiment <span style="color:#3085d6;">supprimer définitivement</span> ses incident ?
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
              const deletedIncidents = ref(filteredIncidents)
              deletedIncidents.value.forEach(async (incident) => {
                await incidentStore.deleteIncident(incident.id);
                await loadIncidents();
              });

              Swal.fire({
                  title: "incidents supprimés",
                  text: "Les incidents ont été supprimé avec succès.",
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

    async function deleteIncident(id) {
      Swal.fire({
          title: "Suppression d'incident",
          html: `
              <div style="font-size: 15px;">
                  Cette opération <b style="color:#d33;">est irréversible</b>.<br>
                  Voulez-vous vraiment <span style="color:#3085d6;">supprimer définitivement</span> cet incident ?
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
              await incidentStore.deleteIncident(id);
              await loadIncidents();
              Swal.fire({
                  title: "incident supprimé",
                  text: "L'incident a été supprimé avec succès.",
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
        const data = filteredIncidents.value.map((e) => ({
            "Equipement": e.Equipement?.nom || '',
            "Description": e.description || '',
            "Date de signalement": e.date_signalement || '',
            "Statut": e.statut || '',
            "Gravite": e.gravite || ''
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Incidents");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

        saveAs(blob, getTimestampedFilename("incidents", "xlsx"));
    }

    function exportToCSV() {
        const data = filteredIncidents.value.map((e) => ({
            "Equipement": e.Equipement?.nom || '',
            "Description": e.description || '',
            "Date de signalement": e.date_signalement || '',
            "Statut": e.statut || '',
            "Gravite": e.gravite || ''
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const csv = XLSX.utils.sheet_to_csv(worksheet);

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, getTimestampedFilename("incidents", "csv"));
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
      await loadIncidents();
      await loadequipements();
    })

    async function loadequipements () {
      await equipementStore.getAllEquipements();
      equipements.value = equipementStore.equipements;
    }

    async function loadIncidents () {
      await incidentStore.getAllIncidents();
      incidents.value = incidentStore.incidents;
    }

    const filteredIncidents = computed(() => {
        if (!incidents.value?.data?.length) return []

        return incidents.value.data.filter((incident) => {
            const s = search.value?.toLowerCase() || ''
            const date = new Date(incident.date_signalement)

            const equipementNom = incident.Equipement?.nom?.toLowerCase() || ''
            const description = incident.description?.toLowerCase() || ''
            const statut = incident.statut?.toLowerCase() || ''
            const gravite = incident.gravite?.toLowerCase() || ''

            const matchesSearch =
            equipementNom.includes(s) ||
            description.includes(s) ||
            statut.includes(s) ||
            gravite.includes(s)

            const afterMin = !dateMin.value || date >= new Date(dateMin.value)
            const beforeMax = !dateMax.value || date <= new Date(dateMax.value)

            return matchesSearch && afterMin && beforeMax
        })
    })


    function resetDateFilter() {
      dateMin.value = ''
      dateMax.value = ''
    }
</script>
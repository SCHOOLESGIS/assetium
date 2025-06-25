import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useEquipementStore = defineStore('counter', () => {

    const equipements = ref();
    const token = localStorage.getItem('token');
    console.log("Equipments token " + token)
    async function getAllEquipements () {
        equipements.value = await axios.get(
            `${import.meta.env.VITE_API_URL}equipements`, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }


    async function getEquipementsByID (id) {
        equipements.value = await axios.get(
            `${import.meta.env.VITE_API_URL}equipements/${id}`, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }


    async function createEquipement (equipement) {
        equipements.value = await axios.post(
            `${import.meta.env.VITE_API_URL}equipements/`, 
            {
                nom: equipement.nom,
                marque: equipement.marque,
                modele: equipement.modele,
                numero_serie: equipement.numero_serie,
                date_acquisition: equipement.date_acquisition,
                etat: equipement.etat,
                type_id: equipement.type_id
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }

    async function updateEquipement (equipement, id) {
        equipements.value = await axios.post(
            `${import.meta.env.VITE_API_URL}equipements/${id}`, 
            {
                nom: equipement.nom,
                marque: equipement.marque,
                modele: equipement.modele,
                numero_serie: equipement.numero_serie,
                date_acquisition: equipement.date_acquisition,
                etat: equipement.etat,
                type_id: equipement.type_id
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }

    async function deleteEquipement (id) {
        equipements.value = await axios.delete(
            `${import.meta.env.VITE_API_URL}equipements/${id}`, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }

  return { equipements, getAllEquipements, getEquipementsByID, createEquipement, updateEquipement, deleteEquipement }
})
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useIncidentStore = defineStore('incident', () => {

    const incidents = ref();
    const token = localStorage.getItem('token');
    console.log("Equipments token " + token)
    async function getAllIncidents () {
        incidents.value = await axios.get(
            `${import.meta.env.VITE_API_URL}incidents`, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }


    async function getIncidentsByID (id) {
        await axios.get(
            `${import.meta.env.VITE_API_URL}incidents/${id}`, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }


    async function createIncident (incident) {
        await axios.post(
            `${import.meta.env.VITE_API_URL}incidents/`, 
            {
                equipement_id: incident.equipement_id,
                description: incident.description,
                date_signalement: incident.date_signalement,
                statut: incident.statut,
                gravite: incident.gravite
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }

    async function updateIncident (incident, id) {
        await axios.put(
            `${import.meta.env.VITE_API_URL}incidents/${id}`, 
            {
                equipement_id: incident.equipement_id,
                description: incident.description,
                date_signalement: incident.date_signalement,
                statut: incident.statut,
                gravite: incident.gravite
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }

    async function deleteIncident (id) {
        await axios.delete(
            `${import.meta.env.VITE_API_URL}incidents/${id}`, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }

  return { incidents, getAllIncidents, getIncidentsByID, createIncident, updateIncident, deleteIncident }
})
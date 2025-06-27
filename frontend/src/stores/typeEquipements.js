import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useTypeEquipementStore = defineStore('typeEquipement', () => {
  const typesEquipements = ref([]);
  const token = localStorage.getItem('token');

  async function getAllTypesEquipements() {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}types-equipements`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    typesEquipements.value = response.data;
  }

  async function getTypeEquipementByID(id) {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}types-equipements/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  }

  async function createTypeEquipement(typeEquipement) {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}types-equipements/`,
      {
        libelle: typeEquipement.libelle
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    await getAllTypesEquipements();
    return response.data;
  }

  async function updateTypeEquipement(typeEquipement, id) {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}types-equipements/${id}`,
      {
        libelle: typeEquipement.libelle
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    await getAllTypesEquipements();
    return response.data;
  }

  async function deleteTypeEquipement(id) {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}types-equipements/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    await getAllTypesEquipements();
    return response.data;
  }

  return {
    typesEquipements,
    getAllTypesEquipements,
    getTypeEquipementByID,
    createTypeEquipement,
    updateTypeEquipement,
    deleteTypeEquipement
  };
});

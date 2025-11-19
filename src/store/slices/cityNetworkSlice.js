import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  cities: [],          // { id, name, zones: ZoneNode[], lastZoneId }
  adjacency: {},       // idCiudad -> [idCiudadVecina, ...]
  selectedCityId: null,
  error: null,
};

// --- Helpers internos ---

function findCityById(state, cityId) {
  return state.cities.find((c) => c.id === cityId) || null;
}

function findZoneById(nodes, zoneId) {
  for (const node of nodes) {
    if (node.id === zoneId) return node;
    if (node.children?.length) {
      const found = findZoneById(node.children, zoneId);
      if (found) return found;
    }
  }
  return null;
}

const cityNetworkSlice = createSlice({
  name: "cityNetwork",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },

    addCity(state, action) {
      const rawName = action.payload || "";
      const name = rawName.trim();
      if (!name) {
        state.error = "City name is required.";
        return;
      }

      const exists = state.cities.some(
        (c) => c.name.toLowerCase() === name.toLowerCase()
      );
      if (exists) {
        state.error = "A city with that name already exists.";
        return;
      }

      const id = nanoid();
      const newCity = {
        id,
        name,
        zones: [],
        lastZoneId: 0,
      };

      state.cities.push(newCity);
      state.adjacency[id] = [];
      state.error = null;

      // Seleccionar primera ciudad automáticamente
      if (!state.selectedCityId) {
        state.selectedCityId = id;
      }
    },

    deleteCity(state, action) {
      const cityId = action.payload;
      const index = state.cities.findIndex((c) => c.id === cityId);

      if (index === -1) {
        state.error = "City not found.";
        return;
      }

      // quitar ciudad
      state.cities.splice(index, 1);

      // quitar del grafo (lista de adyacencia)
      delete state.adjacency[cityId];
      Object.keys(state.adjacency).forEach((id) => {
        state.adjacency[id] = state.adjacency[id].filter(
          (neighborId) => neighborId !== cityId
        );
      });

      // actualizar ciudad seleccionada
      if (state.selectedCityId === cityId) {
        state.selectedCityId = state.cities[0]?.id || null;
      }

      state.error = null;
    },

    selectCity(state, action) {
      const cityId = action.payload;
      const city = findCityById(state, cityId);
      if (!city) {
        state.error = "City not found.";
        return;
      }
      state.selectedCityId = cityId;
      state.error = null;
    },

    connectCities(state, action) {
      const { fromId, toId } = action.payload;

      if (!fromId || !toId) {
        state.error = "You must select two cities.";
        return;
      }
      if (fromId === toId) {
        state.error = "You must choose two different cities.";
        return;
      }

      const from = findCityById(state, fromId);
      const to = findCityById(state, toId);
      if (!from || !to) {
        state.error = "One or both cities do not exist.";
        return;
      }

      if (!state.adjacency[fromId]) state.adjacency[fromId] = [];
      if (!state.adjacency[toId]) state.adjacency[toId] = [];

      const alreadyConnected = state.adjacency[fromId].includes(toId);
      if (!alreadyConnected) {
        state.adjacency[fromId].push(toId);
        state.adjacency[toId].push(fromId);
      }

      state.error = null;
    },

    addZone(state, action) {
      const { cityId, name, parentId } = action.payload;
      const trimmed = (name || "").trim();
      if (!trimmed) {
        state.error = "Zone name is required.";
        return;
      }

      const city = findCityById(state, cityId);
      if (!city) {
        state.error = "City not found.";
        return;
      }

      const newZoneId = String(city.lastZoneId + 1);
      city.lastZoneId = city.lastZoneId + 1;

      const newZone = {
        id: newZoneId,
        name: trimmed,
        children: [],
      };

      if (!parentId) {
        city.zones.push(newZone);
      } else {
        const parent = findZoneById(city.zones, parentId);
        if (!parent) {
          state.error = "Parent zone not found.";
          return;
        }
        parent.children.push(newZone);
      }

      state.error = null;
    },

    editZone(state, action) {
      const { cityId, zoneId, newName } = action.payload;
      const trimmed = (newName || "").trim();
      if (!trimmed) {
        state.error = "New name is required.";
        return;
      }

      const city = findCityById(state, cityId);
      if (!city) {
        state.error = "City not found.";
        return;
      }

      const zone = findZoneById(city.zones, zoneId);
      if (!zone) {
        state.error = "Zone not found.";
        return;
      }

      zone.name = trimmed;
      state.error = null;
    },
  },
});

export const {
  clearError,
  addCity,
  deleteCity,
  selectCity,
  connectCities,
  addZone,
  editZone,
} = cityNetworkSlice.actions;

export default cityNetworkSlice.reducer;

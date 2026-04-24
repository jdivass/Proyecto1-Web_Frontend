
//const API_URL = "https://proyecto1-web-backend-production.up.railway.app";
const API_URL = "http://localhost:8080"


async function getSeries(page = 1, limit = 10, q = "", sort = "id", order = "desc") {
    const res = await fetch(`${API_URL}/series?page=${page}&limit=${limit}&q=${q}&sort=${sort}&order=${order}`);
    const response = await res.json()

    if (!res.ok) {
        throw new Error(response.message || "Error getting series")
    }

    return response
}

async function getSeriesById(id) {
    const res = await fetch(`${API_URL}/series/${id}`);
    const response = await res.json();

    if (!res.ok) {
        throw new Error(response.message || "Error getting serie")
    }

    return response
}

async function deleteSerie(id) {
    const res = await fetch(`${API_URL}/series/${id}`, {
        method: "DELETE"
    });

    const response = await res.json();
    
    if (!res.ok) {
        throw new Error(response.message || "Error deleting series");
    }

    return response
}

async function createSerie(data) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("genre", data.genre);
    formData.append("description", data.description);
    formData.append("platform", data.platform);
    formData.append("status", data.status);
    formData.append("total_seasons", data.total_seasons);
    formData.append("total_episodes", data.total_episodes);
    formData.append("current_season", data.current_season);
    formData.append("current_episode", data.current_episode);
    
    if (data.image) {
        formData.append("image", data.image);
    }

    const res = await fetch(`${API_URL}/series`, {
        method: "POST",
        body: formData
    });

    const response = await res.json();
    
    if (!res.ok){
        throw new Error(response.message || "Error creating series")
    }

    return response
}

async function updateSerie(id, data) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("genre", data.genre);
    formData.append("description", data.description);
    formData.append("platform", data.platform);
    formData.append("status", data.status);
    formData.append("total_seasons", data.total_seasons);
    formData.append("total_episodes", data.total_episodes);
    formData.append("current_season", data.current_season);
    formData.append("current_episode", data.current_episode);

    if (data.image) {
        formData.append("image", data.image);
    }

    const res = await fetch(`${API_URL}/series/${id}`, {
        method: "PUT",
        body: formData
    });

    const response = await res.json();

    if (!res.ok){
        throw new Error(response.message || "Error updating series")
    }

    return response
}

async function createRating(seriesId, rating) {
    const res = await fetch(`${API_URL}/series/${seriesId}/rating`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(rating)
    });

    const response = await res.json()

    if (!res.ok){
        throw new Error(response.message || "Error creating rating")
    }

    return response
}

async function updateRating(seriesId, rating) {
    const res = await fetch(`${API_URL}/series/${seriesId}/rating`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(rating)
    });

    const response = await res.json()

    if (!res.ok) {
        throw new Error(response.message || "Error updating rating")
    }

    return response
}

async function deleteRating(seriesId, rating) {
    const res = await fetch(`${API_URL}/series/${seriesId}/rating`, {
        method: "DELETE",
    });

    const response = await res.json()

    if (!res.ok) {
        throw new Error(response.message || "Error deleting rating")
    }

    return response
}
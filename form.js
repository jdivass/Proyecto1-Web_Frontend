const params = new URLSearchParams(window.location.search)
const id = params.get("id")
const isEdit = id !== null

const loadForm = async () => {
    if (isEdit) {
        document.getElementById("form_title").textContent = "Edit Serie"
        document.getElementById("submit_btn").textContent = "Save Changes"

        const serie = await getSeriesById(id)

        document.getElementById("title").value = serie.title
        document.getElementById("genre").value = serie.genre
        document.getElementById("description").value = serie.description
        document.getElementById("platform").value = serie.platform
        document.getElementById("status").value = serie.status
        document.getElementById("total_seasons").value = serie.total_seasons
        document.getElementById("total_episodes").value = serie.total_episodes
        document.getElementById("current_season").value = serie.current_season
        document.getElementById("current_episode").value = serie.current_episode

        if (serie.image_path) {
            const preview = document.getElementById("image_preview")
            preview.src = serie.image_path
            preview.style.display = "block"
        }
    }
}

document.getElementById("image").addEventListener("change", (e) => {
    const file = e.target.files[0]
    if (file) {
        const preview = document.getElementById("image_preview")
        preview.src = URL.createObjectURL(file)
        preview.style.display = "block"
    }
})

document.getElementById("submit_btn").addEventListener("click", async () => {
    const data = {
        title: document.getElementById("title").value,
        genre: document.getElementById("genre").value,
        description: document.getElementById("description").value,
        platform: document.getElementById("platform").value,
        status: document.getElementById("status").value,
        total_seasons: document.getElementById("total_seasons").value,
        total_episodes: document.getElementById("total_episodes").value,
        current_season: document.getElementById("current_season").value,
        current_episode: document.getElementById("current_episode").value,
        image: document.getElementById("image").files[0] || null
    }

    try {
        if (isEdit) {
            await updateSerie(id, data)
            window.location.href = `serie.html?id=${id}`
        } else {
            const response = await createSerie(data)
            window.location.href = `serie.html?id=${response.id}`
        }
    } catch (error) {
        console.error("Error saving serie:", error)
        alert("Error saving serie. Please try again.")
    }
})

document.getElementById("cancel_btn").addEventListener("click", () => {
    if (isEdit) {
        window.location.href = `serie.html?id=${id}`
    } else {
        window.location.href = "index.html"
    }
})

loadForm()
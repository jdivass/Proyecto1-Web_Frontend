const loadSerie = async () => {
    const params = new URLSearchParams(window.location.search)
    const idStr = params.get("id")
    const id = +idStr
    const info_serie = await getSeriesById(id)
    const serie = document.getElementById("serie_detail")
    const rating_section = document.getElementById("rating_section")
    const title = document.getElementById("tag_title")
    title.textContent = info_serie.title
    
    serie.innerHTML = ""
    rating_section.innerHTML = ""

    const h1 = document.getElementById("title_series")
    h1.textContent = info_serie.title   

    const img = document.createElement("img")
    img.src = info_serie.image_path
    img.alt = info_serie.title

    const genre = document.createElement("span")
    genre.textContent = info_serie.genre

    const description = document.createElement("p")
    description.textContent = info_serie.description

    const platform = document.createElement("span")
    platform.textContent = info_serie.platform

    const status = document.createElement("p")
    const statusMap = { 0: "Not started", 1: "In progress", 2: "Finished" }
    status.textContent = statusMap[info_serie.status] || "Unknown"

    const seasons = document.createElement("span")
    seasons.textContent = `Seasons: ${info_serie.current_season}/${info_serie.total_seasons}`

    const episodes = document.createElement("span")
    episodes.textContent = `Episodes: ${info_serie.current_episode}/${info_serie.total_episodes}`

    const date_added = document.createElement("time")
    date_added.textContent = info_serie.created_at

    serie.appendChild(img)
    serie.appendChild(genre)
    serie.appendChild(description)
    serie.appendChild(platform)
    serie.appendChild(status)
    serie.appendChild(seasons)
    serie.appendChild(episodes)
    serie.appendChild(date_added)

    const edit_rating = document.getElementById("edit_rating")
    const delete_rating = document.getElementById("delete_rating")

    if (info_serie.rating) {
        edit_rating.style.display = "block"
        delete_rating.style.display = "block"

        const stars = document.createElement("span")
        const starsMap = { 1: "★", 2: "★★", 3: "★★★", 4: "★★★★", 5: "★★★★★" }
        stars.textContent = starsMap[info_serie.rating.stars_quantity] || "Unknown"

        const rating_text = document.createElement("p")
        rating_text.textContent = info_serie.rating.content

        const rating_date_added = document.createElement("time")
        rating_date_added.textContent = info_serie.rating.created_at

        rating_section.appendChild(stars)
        rating_section.appendChild(rating_text)
        rating_section.appendChild(rating_date_added)

        edit_rating.onclick = () => {
            rating_section.innerHTML = ""

            const stars_select = document.createElement("select")
            for (let i = 1; i <= 5; i++) {
                const option = document.createElement("option")
                option.value = i
                option.textContent = "★".repeat(i)
                if (i === info_serie.rating.stars_quantity) {
                    option.selected = true
                }
                stars_select.appendChild(option)
            }

            const content_input = document.createElement("textarea")
            content_input.placeholder = "Update your review..."
            content_input.value = info_serie.rating.content

            const save_rating = document.createElement("button")
            save_rating.textContent = "Save Rating"
            save_rating.addEventListener("click", async () => {
                await updateRating(id, {
                    series_id: +id,
                    stars_quantity: +stars_select.value,
                    content: content_input.value
                })
                loadSerie()
            })

            rating_section.appendChild(stars_select)
            rating_section.appendChild(content_input)
            rating_section.appendChild(save_rating)
        }

    } else {
        edit_rating.style.display = "none"
        delete_rating.style.display = "none"

        const form_title = document.createElement("h3")
        form_title.textContent = "Add your rating"

        const stars_select = document.createElement("select")
        for (let i = 1; i <= 5; i++) {
            const option = document.createElement("option")
            option.value = i
            option.textContent = "★".repeat(i)
            stars_select.appendChild(option)
        }

        const content_input = document.createElement("textarea")
        content_input.placeholder = "Write your review..."

        const submit_rating = document.createElement("button")
        submit_rating.textContent = "Submit Rating"
        submit_rating.addEventListener("click", async () => {
            await createRating(id, {
                series_id: id,
                stars_quantity: +stars_select.value,
                content: content_input.value
            })
            loadSerie()
        })

        rating_section.appendChild(form_title)
        rating_section.appendChild(stars_select)
        rating_section.appendChild(content_input)
        rating_section.appendChild(submit_rating)
    }
}

document.getElementById("edit_serie").addEventListener("click", () => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get("id")
    window.location.href = `form.html?id=${id}`
})

document.getElementById("delete_serie").addEventListener("click", async () => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get("id")
    const confirmed = confirm("Are you sure you want to delete this series?")
    if (confirmed) {
        await deleteSerie(id)
        window.location.href = "index.html"
    }
})

document.getElementById("delete_rating").addEventListener("click", async () => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get("id")
    const confirmed = confirm("Are you sure you want to delete this rating?")
    if (confirmed) {
        await deleteRating(id)
        loadSerie()
    }
})

loadSerie()
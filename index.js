var actualPage = 1
var limitPage = 10
var searchTerm = ""
var sortAtribute = "id"
var orderMethod = "desc"

const loadSeries = async () => {
    try {
        const response = await getSeries(actualPage, limitPage, searchTerm, sortAtribute, orderMethod)    
    
    
    const total_pages = response.total_pages

    const container = document.getElementById("series_container")
    container.innerHTML = ""

    const data = response.data

    data.forEach(serie => {
        renderSerie(serie)
    })
    
    const page_info = document.getElementById("page_info")
    page_info.textContent = `Page ${actualPage} of ${total_pages}`

    const prev_page = document.getElementById("prev_page")
    prev_page.disabled = false
    
    if (actualPage === 1) {
        prev_page.disabled = true
    }
    
    const next_page = document.getElementById("next_page")
    next_page.disabled = false
    if (actualPage === response.total_pages){
        next_page.disabled = true
    }
    } catch (error) {
        console.error("Error loading series: ", error)
        const container = document.getElementById("series_container")
        container.innerHTML = `<p>Error loading series. Please try again.</p>`
    }
}

const renderSerie = (serie) => {
    const serieCard = document.createElement('a')
    const container = document.getElementById("series_container");
    serieCard.href = `series.html?id=${serie.id}`

    const img = document.createElement(`img`)
    img.src = `${API_URL}/${serie.image_path}`
    img.alt = serie.title

    const title = document.createElement("h2")
    title.textContent = serie.title;
    
    const genre = document.createElement("p");
    genre.textContent = serie.genre

    const platform = document.createElement("p");
    platform.textContent = serie.platform;

    const status = document.createElement("p");

    const statusMap = { 0: "Not started", 1: "In progress", 2: "Finished" };
    status.textContent = statusMap[serie.status] || "Unknown";

    serieCard.appendChild(img);
    serieCard.appendChild(title);
    serieCard.appendChild(genre);
    serieCard.appendChild(platform);
    serieCard.appendChild(status);    

    
    container.appendChild(serieCard);
}
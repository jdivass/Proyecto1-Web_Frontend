var actualPage = 1
var limitPage = 10
var searchTerm = ""
var sortAtribute = "id"
var orderMethod = "desc"



const renderSerie = (serie) => {
    const serieCard = document.createElement('a')
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

    const container = document.getElementById("series_container");
    container.appendChild(serieCard);
}
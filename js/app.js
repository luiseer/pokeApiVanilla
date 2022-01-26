"use strict"
const form = document.querySelector('#search-pokemon')
let loader = document.getElementById('loader')

document.addEventListener('DOMContentLoaded', () => fetchData())
form.addEventListener('submit', event => buscarPokemon(event))

function fetchData(pokemon = "bulbasaur") {

    loader.style.display = 'flex'    
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        //Obtener datos des de la url de la api 
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            mostrarPokemon(data)
        })
        .catch(error => mostrarError())
}

function mostrarPokemon(pokemonData) {
    //ubicar elementos del DOM
    let contenedor = document.getElementById('pokemon-wrapper')
    let img = contenedor.querySelector('img')
    let p = contenedor.querySelector('p')

    img.src = pokemonData.sprites.other.dream_world.front_default || pokemonData.sprites.front_default
    p.textContent = pokemonData.name

    setTimeout(() => {
        loader.style.display = 'none'
    }, 2000);

    
}

function buscarPokemon(event) {

    loader.style.display = 'flex' 
    let input = form.querySelector("input")
    let pokemonName = input.value.toLocaleLowerCase()


    fetchData(pokemonName)

    //.catch(error => mostrarError())

    event.preventDefault()
}

function mostrarError() {

    let toast = document.getElementById('toast')
    toast.classList.toggle('escondido')
    setTimeout(() => toast.classList.toggle('escondido'), 2000);

    setTimeout(() => {
        loader.style.display = 'none'
    }, 2000);

}
async function fetchPokemon() {
    const pokemonName = document.getElementById('pokemon-name').value.toLowerCase();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (response.ok) {
        const pokemon = await response.json();
        displayPokemon(pokemon);
    } else {
        document.getElementById('pokemon-details').innerHTML = 'Pokémon not found';
    }
}

function displayPokemon(pokemon) {
    const detailsDiv = document.getElementById('pokemon-details');
    const highQualityImage = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
    const frontImage = pokemon.sprites.front_default;
    const backImage = pokemon.sprites.back_default;
    const shinyFrontImage = pokemon.sprites.front_shiny;
    const shinyBackImage = pokemon.sprites.back_shiny;

    detailsDiv.innerHTML = `
        <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
        <img src="${highQualityImage}" alt="${pokemon.name}">
        <div class="additional-images">
            <img src="${frontImage}" alt="${pokemon.name} front">
            <img src="${backImage}" alt="${pokemon.name} back">
            <img src="${shinyFrontImage}" alt="${pokemon.name} shiny front">
            <img src="${shinyBackImage}" alt="${pokemon.name} shiny back">
        </div>
        <p>Height: ${pokemon.height} m</p>
        <p>Weight: ${pokemon.weight} kg</p>
        <p>Type: ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
        <p>Abilities: ${pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')}</p>
    `;
}
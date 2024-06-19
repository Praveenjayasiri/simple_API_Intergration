async function fetchData() {
    const pokemonName = document.getElementById("pokemonName").value.trim().toLowerCase();
    const errorElement = document.getElementById("error");
    const detailsElement = document.getElementById("details");

    if (!pokemonName) {
        errorElement.textContent = "Please enter a Pokémon name.";
        errorElement.style.display = "block";
        detailsElement.style.display = "none";
        return;
    }

    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonName);
        
        if (!response.ok) {
            throw new Error("Pokémon not found.");
        }

        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;
        const pokemonType = data.types.map(typeInfo => typeInfo.type.name).join(', ');
        const pokemonAbilities = data.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');

        document.getElementById("pokemonSprite").src = pokemonSprite;
        document.getElementById("pokemonDisplayName").textContent = data.name;
        document.getElementById("pokemonType").textContent = pokemonType;
        document.getElementById("pokemonAbilities").textContent = pokemonAbilities;

        errorElement.style.display = "none";
        detailsElement.style.display = "block";

        document.getElementById("pokemonName").value = '';

    } catch (error) {
        errorElement.textContent = error.message;
        errorElement.style.display = "block";
        detailsElement.style.display = "none";
    }
}

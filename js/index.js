const list = document.querySelector('.list');
const pokemonData = [];
const pokemonCount = 720;
const logo = document.querySelector('.logo')
const pokeball = document.querySelector('.pokeball')
const search = document.querySelector('.search')
const body =document.body





async function fetchPokemonData() {
    try {
        const requests = [];

        for (let i = 1; i <= pokemonCount; i++) {
            requests.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)); // 添加所有請求到陣列
        }

        const responses = await Promise.all(requests); // 併行執行請求

        responses.forEach(response => {
            pokemonData.push({
                id: response.data.id,
                image: response.data.sprites.other['official-artwork'].front_default,
                name: response.data.name,
                type: response.data.types[0].type.name,
            });
        });

        body.style.backgroundColor ='#5e8b7a';
        logo.style.display = 'none';
        search.style.display = 'inline';

        renderData(); // 渲染數據
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }
}




//渲染用
function renderData() {
    let content = '';
    
    pokemonData.forEach(function (pokemon) {
        content += `<li data-id=${pokemon.id}> <img src="${pokemon.image}" alt="${pokemon.name}">
                        <span class ='pokemon-name'>${pokemon.name}</span>
                        <span class ='pokemon-types'>${pokemon.type}</span> 
                        </li>
                    
                    `;
                    
    });

    list.innerHTML = content;
    

    
}

(function(){
    console.log(123)
})()
fetchPokemonData();

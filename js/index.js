const list = document.querySelector('.list');
const pokemonData = []; 
const pokemonCount = 151;
const logo = document.querySelector('.logo');
const search = document.querySelector('.search');
const body = document.body;

// 獲取寶可夢數據
async function fetchPokemonData() {
    try {
        const requests = Array.from({ length: pokemonCount }, (_, i) =>
            axios.get(`https://pokeapi.co/api/v2/pokemon/${i + 1}`)
        );
        const responses = await Promise.all(requests);

        responses.forEach(response => {
            pokemonData.push({
                id: response.data.id,
                image: response.data.sprites.other['official-artwork'].front_default,
                name: response.data.name,
                types: response.data.types.map(type => type.type.name),
                abilities: response.data.abilities.map(ability => ability.ability.name),
                stats: response.data.stats.map(stat => ({
                    name: stat.stat.name,
                    value: stat.base_stat,
                })),
            });
        });

        body.style.backgroundColor = '#5e8b7a';
        logo.style.display = 'none';
        search.style.display = 'inline';

        renderData(); // 渲染數據
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }
}

// 渲染寶可夢列表
function renderData() {
    let content = '';
    pokemonData.forEach(function (pokemon) {
        content += `
            <li data-id=${pokemon.id}>
                <img src="${pokemon.image}" alt="${pokemon.name}">
                <span class='pokemon-name'>${pokemon.name}</span>
                
            </li>`;
    });

    list.innerHTML = content;

    addPokemonClickEvent(); // 添加點擊事件
}

// 點擊寶可夢顯示詳細信息
function addPokemonClickEvent() {
    const pokemonItems = document.querySelectorAll('.list li');
    pokemonItems.forEach(item => {
        item.addEventListener('click', function () {
            const pokemonId = item.getAttribute('data-id');
            const pokemon = pokemonData.find(p => p.id == pokemonId);
            renderPokemonDetails(pokemon);
        });
    });
}
function bindPokemonClickEvents() {
    const pokemonItems = document.querySelectorAll('.pokemon-list li');
    pokemonItems.forEach(item => {
        item.addEventListener('click', () => {
            const pokemonId = item.getAttribute('data-id');
            const pokemon = pokemonData.find(p => p.id == pokemonId);
            renderPokemonDetails(pokemon); 
        });
    });
}

// 顯示寶可夢詳細信息
function renderPokemonDetails(pokemon) {
    const detailContainer = document.createElement('div');
    detailContainer.classList.add('pokemon-detail');

    detailContainer.innerHTML = `
        <div class="detail-card">
            <div class='imgback'>
                <img src="${pokemon.image}" alt="${pokemon.name}">
            </div>
            <h2>${pokemon.name}</h2>
            <p><strong class='types'>屬性:</strong> <span class='typeName'>${pokemon.types.join(', ')}</span></p>
            <p><strong class='skill'>技能:</strong> <span class='skillName'>${pokemon.abilities.join(', ')}</span></p>
            <p class='ability'><strong>能力值:</strong></p>
            <ul>
                ${pokemon.stats
                    .map(stat => `<li class='stat'>${stat.name}: ${stat.value}</li>`)
                    .join('')}
            </ul>
            <button class="close-detail">關閉</button>
        </div>
    `;

    document.body.appendChild(detailContainer);

    document.querySelector('.close-detail').addEventListener('click', () => {
        detailContainer.remove();
    });
}

// 初始化函數
fetchPokemonData();

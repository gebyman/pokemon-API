const input = document.querySelector('.input');
const searchBtn = document.querySelector('.searchBtn');
const resetBtn = document.querySelector('.reset');
const typeContainer = document.querySelector('.type ul');
const pokemonList = document.querySelector('.pokemon-list ul');
const listt = document.querySelector('.list ');
let typeData = []; // 存储 Pokémon 类型
let selectPokemon = []; // 筛选后的 Pokémon

// 獲取所有類型數據
async function fetchAllPokemonTypes() {
    try {
        const res = await axios.get('https://pokeapi.co/api/v2/type');
        typeData = res.data.results.map(item => ({
            name: item.name,
            url: item.url,
        }));
        renderTypeButtons();
    } catch (error) {
        console.error('Error fetching Pokémon types:', error);
    }
}

// 渲染類型按鈕
function renderTypeButtons() {
    const buttonsHtml = typeData
        .map(type => `<li><button value="${type.name}">${type.name}</button></li>`)
        .join('');
    typeContainer.innerHTML = buttonsHtml;

    bindTypeFilterEvents();
}

// 綁定類型篩選事件
function bindTypeFilterEvents() {
    const buttons = document.querySelectorAll('.type button');
    buttons.forEach(button => {
        button.addEventListener('click', e => {
            const selectedType = e.target.value;
            selectPokemon = pokemonData.filter(pokemon =>
                pokemon.types.includes(selectedType)
            );
            listt.style.display = 'none';
             pokemonList.style.display ='flex'
            renderSelectPokemon(selectPokemon);
        });
    });
}

// 渲染篩選後的 Pokémon 列表
function renderSelectPokemon(data) {
    const listHtml = data
        .map(
            pokemon => `
            <li data-id="${pokemon.id}">
                <img src="${pokemon.image}" alt="${pokemon.name}">
                <span>${pokemon.name}</span>
           
            </li>`
        )
        .join('');
    pokemonList.innerHTML = listHtml;

    
    bindPokemonClickEvents();
}

// Pokémon 點擊
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

// 搜索功能
searchBtn.addEventListener('click', () => {
    const keyword = input.value.trim().toLowerCase();
    const filteredPokemon = pokemonData.filter(pokemon =>
        pokemon.name.toLowerCase().includes(keyword)
    );
    renderSelectPokemon(filteredPokemon);
    input.value = ''; // 清空搜索框
});

// 重置功能
resetBtn.addEventListener('click', () => {
    renderSelectPokemon(pokemonData); 
    input.value = ''; // 清空搜索框
    listt.style.display = 'flex';
    pokemonList.style.display ='none'
});

// 初始化
fetchAllPokemonTypes();

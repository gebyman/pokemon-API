const list = document.querySelector('.list');
const pokemonData = [];
const progressBar = document.getElementById('progress-bar')
const pokemonCount = 520;
const logo = document.querySelector('.waitLogo')
const pokeball = document.querySelector('.pokeball')
const search = document.querySelector('.search')







const fetchPokemonData = async function () {
    try {
        
        progressBar.max=pokemonCount;
 
        for (let i = 1; i <= pokemonCount; i++) {
            const pokemonRes = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
            
            pokemonData.push({
                id: pokemonRes.data.id,
                image: pokemonRes.data.sprites.other['official-artwork'].front_default,
                name: pokemonRes.data.name,
                type : pokemonRes.data.types[0].type.name,
            });



            //更更更更新進度條
            progressBar.value= i;

            //完成然後把它隱藏
            if(i===pokemonCount){
                progressBar.style.display='none'
                logo.style.display='none'
                
                search.style.display='inline'
            }
        }
        renderData();
    } catch (error) {
        console.log('Error fetching Pokemon data:', error);
    }
};


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

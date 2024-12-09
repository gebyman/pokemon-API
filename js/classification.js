const pokemonList = document.querySelector('.pokemon-list')
const buttons = document.querySelectorAll('.type button' )
const type = document.querySelector('.type')
const input = document.querySelector('.input')
const searchBtn = document.querySelector('.searchBtn')
const reset = document.querySelector('.reset')

let data =[];
let pokemonType = [];
let selectPokemon= [];
//屬性列表值

const fetchAllPokemon = async function(){
       try{
            const res = await axios.get(`https://pokeapi.co/api/v2/type`)
            res.data.results.forEach(function(item){
                data.push({
                    name:item.name,
                    url:item.url
                })
            })
            
            render()  
        } catch(error){
            console.log('wrong')
        }

}
//資料渲染
function render(){
    let str = ''
    data.forEach(function(item,index){
        str+=`<li><a><button data-num='${index}' value='${item.name}'>${item.name}</button> </li>`
    })
    type.innerHTML=str;
    const buttons = document.querySelectorAll('.type button' )
    buttons.forEach(function(buttons){
        buttons.addEventListener('click',function(e){  
            selectPokemon=[];
          pokemonData.forEach(function(item){
            if(e.target.value !== item.type){    
               return 
            }else if(e.target.value == item.type){
                selectPokemon.push({
                    image:item.image,
                    name:item.name,
                    type:item.type
                });
                renderSelectPokemon (selectPokemon)
            }
          });
          if(selectPokemon.length>0){
            renderSelectPokemon(selectPokemon);
            list.style.display='none'
          }else{
            renderSelectPokemon(pokemonData); 
            list.style.display = 'inline';
            resetdata()
          }          
         })
    })
  
}
function renderSelectPokemon (selectPokemon){
    const pokemonList = document.querySelector('.pokemon-list')
    let str = ''
    selectPokemon.forEach(function(item){
        str+= `<li><img src="${item.image}" alt="${item.name}">
        <span class ='selectPokemon'>${item.name}</span>
        <span class ='selectPokemon'>${item.type}</span> 
        </li>
    
    `;
    })
    pokemonList.innerHTML=str;
}

//reset
function resetdata() {
    reset.addEventListener('click', function(e) {
        selectPokemon = []; 
        renderSelectPokemon(pokemonData);
        pokemonList.style.display = 'flex'; 

       
        const buttons = document.querySelectorAll('.type button');
        buttons.forEach(button => {
            button.style.background = ''; 
        });
    });
}
render()
//搜尋
searchBtn.addEventListener('click', function(e) {
    filterPokemon();
    const keyword = input.value.trim().toLowerCase();
    if(keyword!==''){
        filterPokemon(keyword);
        list.style.display = 'none'; 
        pokemonList.style.display = 'none'; 
    }else{
        list.style.display = 'flex'; 
         searchList.style.display = 'none'
    }
    input.value = ''
    function filterPokemon() {
        let keyword = input.value.trim().toLowerCase();
        let targetProduct = pokemonData.filter(function(item) {
            return item.name.toLowerCase().includes(keyword);
          
        });
        
        renderSearchData(targetProduct); 
      
    }
    
});

// 渲染函数，假设用于显示筛选后的宝可梦
function renderSearchData(pokemonData){
    let str = '';
    let searchList = document.querySelector('.search-list')
    pokemonData.forEach(function(item){
        str+=`<li><img src="${item.image}" alt="${item.name}">
        <span class ='selectPokemon'>${item.name}</span>
        <span class ='selectPokemon'>${item.type}</span> 
        </li>`
    })
    searchList.innerHTML=str
   
}


fetchAllPokemon()
resetdata()
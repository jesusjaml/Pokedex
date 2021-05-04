//** Constantes  */
const promises = [];
const pokedex = document.getElementById("pokedex")
console.log(pokedex);

//** Funcion para solicitar pokemones usando "Promise.all" con fetch */
const fetchPokemon = () => {
    for ( let i = 1; i <= 150; i++) {
        const API_URL = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(API_URL).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types
            .map( (type) => type.type.name)
            .join(', ')
        }));
        //**  Ya tenemos los datos deseados de los pokemones en un Array - Siguiente clase mostrar estos datos usando "HTML" */
        // Usando Js dinamicamente mostraremos los datos con nuestras etiquetas de "HTML" en pantalla
        displayPokemon(pokemon);
    });
    const displayPokemon = (pokemon) => {
        console.table(pokemon)
        // Enviar etiquetas con datos a la constante "pokedes" que hace referencia a la etiqueta html de una lista ordenada
        // const html = `<li> Bulbasour </li>`
        //** Para llamar los datos que deseamos mostrar en la lista ordenada usamos el metodo de los Array ".map" */ //
        // pokeman refers to each individual pokemon
        const pokemonHTMLString = pokemon.map ( pokeman => `
        <li class="card" >
            <img class="card-image" src="${pokeman.image}" />
            <h2 class="card-title"> ${pokeman.id}. ${pokeman.name} </h2>
            <p class="card-subtitle"> ${pokeman.type} </p>
        </li>
        `)
        .join('');
        // innerHTML ingresa las etiquetas dentro de la lista ordenada con el id: "pokedex"
        pokedex.innerHTML = pokemonHTMLString;
        console.log(pokedex);
    }
};
fetchPokemon();

//** Es ineficiente usar un ciclo for para consultar a todos ids de los pokemones */
// async function requestPokemon() {
//     for ( let i = 1; i <= 150; i++) {
//         const API_URL = `https://pokeapi.co/api/v2/pokemon/${i}`;
//         const res = await fetch(API_URL);
//         if(res.ok) {
//             const data = await res.json();
//             // console.log(data)
//             // Objeto pokemon donde guardaremos las propiedades que necesitemos
//             const pokemon = {
//                 name: data.name,
//                 id: data.id,
//                 image: data.sprites['front_default'],
//                 type: data.types
//                 // Array nuevo con los elementos solicitados
//                 .map( (type) => type.type.name)
//                 // Muestra los datos como 1 string separando las palabras con ","
//                 .join(', ')
//             }
//             console.log(pokemon)
//         }
//     }
// }
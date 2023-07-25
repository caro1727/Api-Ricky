const contenedorCard = document.querySelector(".content-main");
// creamos la variable donde almacenaremos el input que vamos a trabajar en este caso el search
let searchInput = document.querySelector("#search");

let listaData = [];
let URL = "https://rickandmortyapi.com/api/character/";
//vamos a crear una funcion, que cuando realicemos el buscar o el filtrado de pokemons podamos limpiar el array antes de hacer la busqueda o filtrado
const cleanData = () => {
  contenedorCard.innerHTML = "";
};

// creamos la variable donde almacenaremos el id del boton que usaremos para filtrar por tipo de pokemon
let buttonFilter = document.querySelectorAll(".btn-header");
// console.log(buttonFilter);
// let buttonFilterFire = document.querySelector("#fire");
let buttonFilterTodos = document.querySelector("#All");

// ***************************************************
// **************OBTENIENDO DATOS API*****************
// ***************************************************

const getApi = async (URL) => {
  for (let i = 1; i <= 100; i++) {
    const consultaApi = await fetch(URL + i);
    const resultado = await consultaApi.json();
    const result = resultado;
    console.log(result.name);
    saveList(result);
  }
};

// ***************************************************
// **************FILTRANDO POR status ****************
// ***************************************************
let listStatus;

buttonFilter.forEach((button) => {
  button.addEventListener("click", (e) => {
    const botonId = e.currentTarget.id;
    listStatus = searchByStatus(botonId);
    cleanData();
    recorridoLista(listStatus);
  });
});

let searchByStatus = (search) => {
  const filtered = listaData.filter((personaje) => {
    if (personaje.status === search) {
      return personaje;
    }
  });
  return filtered;
};

buttonFilterTodos.addEventListener("click", () => {
  const dataButton = buttonFilterTodos.textContent;
  cleanData();
  recorridoLista(listaData);
});

// ***************************************************
// ********FILTRANDO POR INPUT SEARCH NAME************
// ***************************************************

const searchByName = (searchByNameParameter) => {
  const filtered = listaData.filter((personaje) => {
    if (personaje.name.includes(searchByNameParameter)) {
      return personaje;
    }
  });
  return filtered;
};

searchInput.addEventListener("keyup", () => {
  const inputText = searchInput.value;

  let lista2 = searchByName(inputText);

  cleanData();

  recorridoLista(lista2);
});

// ***************************************************
// ********************GUARDAR LISTADO****************
// ***************************************************

const saveList = (data) => {
  console.log(data);
  let name = data.name;

  let id = data.id;
  // console.log(id);
  let image = data.image;

  let status = data.status;

  const listadoRick = {
    name: name,
    id: id,
    image: image,
    status: status,
  };
  listaData.push(listadoRick);
};

// console.log(listaData);

// ***************************************************
// **********************CREANDO HTML*****************
// ***************************************************

let renderCards = (data) => {
  const name = data.name;
  const id = data.id;
  const imagen = data.image;
  //crear el contenedor principal
  const divConteiner = document.createElement("div");
  divConteiner.className = "content-card";
  divConteiner.innerHTML = `
        <span>${id}</span>
        <h4>${name}</h4>
        <div class="imagen">
            <img src="${imagen}" alt="" />
        </div>
  `;
  contenedorCard.appendChild(divConteiner);
};

const recorridoLista = (arrayLista) => {
  console.log("************");
  console.log(arrayLista);

  for (array of arrayLista) {
    renderCards(array);
  }
};

// la paginacion la podemos hacer con una funcion donde en cicloNumero llegue el valor de i como el numero a iniciar y el numero del parametro el numero a donde va a recorrer

(async () => {
  await getApi(URL);
  // cicloNumero(10);
  recorridoLista(listaData);
  console.log(listaData);
})();
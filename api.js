const listItem = [];
const contenedorCard = document.querySelector(".container");
// *****************
// *****OBTENIENDO DATOS API******
// *****************

const getApi = async (id) => {
  const consultaApi = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  const resultado = await consultaApi.json();
  const result = resultado;
  renderCards(result);
};

const cicloNumero = (numero) => {
  for (let i = 1; i <= numero; i++) {
    getApi(i); //llamado api
  }
};

// *****************
// *******CREANDO HTML******
// *****************

let renderCards = (data) => {
  console.log(data);
  const name = data.name;
  const imagen = data.image;
  console.log(name);
  //crear el contenedor principal
  const divConteiner = document.createElement("div");
  divConteiner.className = "content-card";
  divConteiner.innerHTML = `
        <h4>${name}</h4>
        <div class="imagen">
            <img src="${imagen}" alt="" />
        </div>
  `;
  contenedorCard.appendChild(divConteiner);
};

(() => {
  cicloNumero(800);
})();
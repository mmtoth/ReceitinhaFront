$('.carousel').carousel({
  interval: 2000
})

const botao = document.querySelector('#enviarReceita')
botao.addEventListener("click", enviarReceita)
function enviarReceita () {
  const receita = document.querySelector("#nomeReceita").value
  const motivo = document.querySelector("#especial").value
  const tipo = document.querySelector("#inputTipo").value
  const ingredientes = document.querySelector("#ingredientes").value
  const preparo = document.querySelector("#preparo").value

  const receitas = {
    receita, motivo, tipo, ingredientes, preparo
  }
  fetch(
    'https://receitinhaamor.herokuapp.com/receitas/',
    {
      method: 'POST',
      body: JSON.stringify(receitas),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).then(response => console.log("criou!"))
}


const Resultado = document.querySelector('#enviadas')

fetch('https://receitinhaamor.herokuapp.com/receitas/')
    .then (response =>{
        return response.json();
    })
    .then(data => {
        data.forEach(receitaShow => {
            
            let box = document.createElement('div');
            box.setAttribute('class', 'receitaShow col-3');
          
            let tipo = document.createElement("p");
            tipo.setAttribute("class", "displaynone")
            tipo.innerHTML = receitaShow.tipo  
           
            Resultado.appendChild(box);
            let icon = document.createElement("img");
            icon.setAttribute("src", `_img/${receitaShow.tipo}-icon.png`)
            icon.setAttribute("class", "imgIcon" )
            
            let titulo = document.createElement("p");
            titulo.setAttribute("class", "textboxReceita")
            titulo.innerHTML = receitaShow.receita

            box.appendChild(tipo);
            box.appendChild(icon);
            box.appendChild(titulo);

            let btveja = document.createElement('div');
            btveja.setAttribute("class", "btenvio");
            btveja.setAttribute("data-toggle", "modal");
            btveja.setAttribute("data-target", "#ExemploModalCentralizado");
            // btveja.setAttribute("data-id", receitaShow._id);

            box.appendChild(btveja);
            
            let link = document.createElement("a");
            link.setAttribute("class", "formBt");
            link.textContent = "Veja mais"
            link.setAttribute("href", "#receitas")
            link.setAttribute("data-id", receitaShow._id);
            
            btveja.appendChild(link);

            link.addEventListener("click", capturaId)
            function capturaId (){
              console.log (receitaShow._id);

              fetch(`https://receitinhaamor.herokuapp.com/receitas/${receitaShow._id}`)
              .then (response =>{
                return response.json();
            })
             .then(data => {
                    let tituloCard = document.querySelector("#tituloCard");
                    tituloCard.innerHTML = `${data.receita}`;

                    let ingredientesCard = document.querySelector(".conteudoIngredientes");
                    ingredientesCard.innerHTML = `${data.ingredientes}`;

                    let preparoCard = document.querySelector(".conteudoPreparo");
                    preparoCard.innerHTML = `${data.preparo}`;

                    let motivoCard = document.querySelector(".conteudoMotivo");
                    motivoCard.innerHTML = `${data.motivo}`;
               })
              
            }
           } )}
          )
          
          
        
            



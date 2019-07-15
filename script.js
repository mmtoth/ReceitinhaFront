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

            let btveja = document.createElement('div');
            btveja.setAttribute("class", "btenvio");
            btveja.setAttribute("data-toggle", "modal");
            btveja.setAttribute("data-target", "#ExemploModalCentralizado")
            btveja.setAttribute("id", receitaShow._id)

            box.appendChild(tipo);
            box.appendChild(icon);
            box.appendChild(titulo);
            box.appendChild(btveja);

                        
            let link = document.createElement("a");
            link.setAttribute("class", "formBt");
            link.textContent = "Veja mais"
            link.setAttribute("href", "#receitas")
        
            btveja.appendChild(link);
        })
        })


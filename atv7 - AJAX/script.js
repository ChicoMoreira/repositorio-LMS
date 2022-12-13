
let nomeUsuario = ""
let grupoSelecionado = ""

let listagrupros = document.querySelector(".listagrupos")

let overlayLogin = document.querySelector(".overlayLogin")
let postarNome = document.querySelector(".enviarNome")
let nomePostado = document.querySelector(".nomeUsuario")

let header = document.querySelector(".header")

function salvarNome(event) {
    event.preventDefault()
    //colocar o nome do usuario na pagina
    nomeUsuario = nomePostado.value
    document.querySelector(".nomeLogin").innerHTML = nomeUsuario
    //fechar modal
    overlayLogin.classList.toggle("ativo")
}
postarNome.addEventListener("click", salvarNome)

function createGrupos(grupos) {
    listagrupros.innerHTML = ""
    for (let grupo of grupos) {
        
        let div_cardGrupo = document.createElement("div")
        div_cardGrupo.classList.add("cardgrupo")

        let div_imagemgrupo = document.createElement("div")
        div_imagemgrupo.classList.add("imagemgrupo")
        let imagem_imagem = document.createElement("img")
        imagem_imagem.classList.add("imagem")
        imagem_imagem.src = "https://loremflickr.com/45/45?whatsapp"
        div_imagemgrupo.appendChild(imagem_imagem)
        div_cardGrupo.appendChild(div_imagemgrupo)

        let div_nome = document.createElement("div")
        div_nome.classList.add("nomegrupo")
        let texto_nome = document.createTextNode(grupo.nome)
        div_nome.innerHTML = grupo.nome
        // div_nome.appendChild(texto_nome)
        div_cardGrupo.appendChild(div_nome)

        div_cardGrupo.addEventListener("click",()=>{console.log(grupo.id)})

        listagrupros.append(div_cardGrupo)
    }
}

async function atualizarGrupos() {
    try {
        let response = await axios({
            method: "GET",
            url: "https://server-json-lms.herokuapp.com/grupos"
        })
        createGrupos(response.data)
    } catch (e) {
        console.log(e)
    }
}
atualizarGrupos();

async function criaGrupo(event) {
    event.preventDefault()
    let inputNomeGrupo = document.querySelector(".novoGrupo")
    let nomeGrupo = inputNomeGrupo.value
    console.log(nomeGrupo)
    try {
        let response = await axios({
            method: "POST",
            url: "https://server-json-lms.herokuapp.com/grupos",
            data: { 
                nome: nomeGrupo
            }
        })
        console.log(response)
        atualizarGrupos() 
    } catch (e) {
        console.log(e)
    }
}
document.querySelector(".submitNovoGrupo").addEventListener("click", criaGrupo) 



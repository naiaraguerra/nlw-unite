 // JAVASCRIPT
//array de objetos que contem os dados dos participantes.
let participantes = [
    ....
];


//function responsavel em adicionar a lista de participantes na table.
function atualizaListaParticipante(participantes){
    var estrutura = "";
    for(let participante of participantes){
        
        estrutura = estrutura+estruturaTabela(participante);
    }
    document.querySelector('tbody').innerHTML = estrutura;

}

// function responsavel em criar as tr que será adicionada na table com os participantes
function estruturaTabela(participante){
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao);
    let dataCheckin;
    
    //condição que verifica se o participante já realizou o checkin, se caso não fez irá mostrar o botão de confirma CheckIn
    if(participante.dataCheckin == null){
        dataCheckin = "<button data-email='"+participante.email+"' onclick='fazCheckin(event)' id='adicionaParticipante'> Confirmar CheckIn </button>";
    } else {
        // se caso já tenha feito, irá mostrar a data do checkIn
        dataCheckin = dayjs(Date.now()).to(participante.dataCheckin);
    }
    
    dayjs(Date.now()).to(participante.dataCheckin);

    //cria as tr
    return ('<tr>'+
        '<td><strong>'+participante.nome+'</strong><br>'+participante.email+'</td>'+
        '<td>'+dataInscricao+'</td>'+
        '<td>'+dataCheckin+'</td>'+
    '</tr>');
}


//function responsavel adicionar um novo participante
function adicionarParticipante(event){
    event.preventDefault();
    const formulario = new FormData(event.target);
   
   
    //antes de adicionar o novo participante, irá verificar se o mesmo já existe na listagem cadastrada
    const existe = participantes.some(function(p) {
        return p.email === formulario.get('email');
    });

    //se não existe, o novo participante será adicionado
   if(existe == false){
        const novoParticipante = {
            nome: formulario.get('nomeCompleto'),
            email: formulario.get('email'),
            dataInscricao: new Date(),
            dataCheckin: null
        }

        participantes = [novoParticipante, ...participantes];
        atualizaListaParticipante(participantes);
    } else {
        //se já existe, irá mostrar uma mensagem na tela informando que já foi cadastrado
        alert('Este e-mail já foi cadastrado');
    }

    event.target.querySelector('[name="nomeCompleto"]').value = "";
    event.target.querySelector('[name="email"]').value = "";

}

//function responsavel por fazer checkIn;
function fazCheckin(event){
    if(confirm('Deseja realizar o checkin?') == true ){
        const participante = participantes.find(function(p){
            return p.email == event.target.dataset.email;
        });
        participante.dataCheckin = new Date();
        atualizaListaParticipante(participantes);
    }  
    
};


//cria a lista 
atualizaListaParticipante(participantes)



´´ CSS ´´
// o 1a representa a opacidade da cor.
color: #FFFFFF1a
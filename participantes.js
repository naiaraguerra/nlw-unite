let participantes = [
    {
        nome: "João Silva",
        email: "joao.silva@example.com",
        dataInscricao: new Date("2024-03-15"),
        dataCheckin: null
    },
    {
        nome: "Maria Santos",
        email: "maria.santos@example.com",
        dataInscricao: new Date("2024-03-16"),
        dataCheckin: new Date("2024-03-17")
    },
    {
        nome: "Pedro Oliveira",
        email: "pedro.oliveira@example.com",
        dataInscricao: new Date("2024-03-17"),
        dataCheckin: new Date("2024-03-18")
    },
    {
        nome: "Ana Costa",
        email: "ana.costa@example.com",
        dataInscricao: new Date("2024-03-18"),
        dataCheckin: new Date("2024-03-19")
    },
    {
        nome: "Carlos Rodrigues",
        email: "carlos.rodrigues@example.com",
        dataInscricao: new Date("2024-03-19"),
        dataCheckin: new Date("2024-03-20")
    },
    {
        nome: "Mariana Almeida",
        email: "mariana.almeida@example.com",
        dataInscricao: new Date("2024-03-20"),
        dataCheckin: new Date("2024-03-21")
    },
    {
        nome: "Luís Ferreira",
        email: "luis.ferreira@example.com",
        dataInscricao: new Date("2024-03-21"),
        dataCheckin: new Date("2024-03-22")
    },
    {
        nome: "Sofia Ramos",
        email: "sofia.ramos@example.com",
        dataInscricao: new Date("2024-03-22"),
        dataCheckin: new Date("2024-03-23")
    },
    {
        nome: "Ricardo Sousa",
        email: "ricardo.sousa@example.com",
        dataInscricao: new Date("2024-03-23"),
        dataCheckin: new Date("2024-03-24")
    },
    {
        nome: "Patrícia Gomes",
        email: "patricia.gomes@example.com",
        dataInscricao: new Date("2024-03-24"),
        dataCheckin: new Date("2024-03-25")
    }
];


function atualizaListaParticipante(participantes){
    var estrutura = "";
    for(let participante of participantes){
        
        estrutura = estrutura+estruturaTabela(participante);
    }
    document.querySelector('tbody').innerHTML = estrutura;

}


function estruturaTabela(participante){
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao);
    let dataCheckin;
    
    
    if(participante.dataCheckin == null){
        dataCheckin = "<button data-email='"+participante.email+"' onclick='fazCheckin(event)' id='adicionaParticipante'> Confirmar CheckIn </button>";
    } else {
        dataCheckin = dayjs(Date.now()).to(participante.dataCheckin);
    }
    
    dayjs(Date.now()).to(participante.dataCheckin);

    return ('<tr>'+
        '<td><strong>'+participante.nome+'</strong><br>'+participante.email+'</td>'+
        '<td>'+dataInscricao+'</td>'+
        '<td>'+dataCheckin+'</td>'+
    '</tr>');
}

function adicionarParticipante(event){
    event.preventDefault();
    const formulario = new FormData(event.target);
    //busca pelo name
    const existe = participantes.some(function(p) {
        return p.email === formulario.get('email');
    });

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
        alert('Este e-mail já foi cadastrado');
    }

    event.target.querySelector('[name="nomeCompleto"]').value = "";
    event.target.querySelector('[name="email"]').value = "";

}


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
class Despesa{
    constructor(ano,mes,dia,tipo,descricao,valor){
        this.ano=ano;
        this.mes=mes;
        this.dia=dia;
        this.tipo=tipo;
        this.descricao=descricao;
        this.valor=valor;
    }
    validarDados(){
        for(let i in this){
            if(this[i]==undefined || this[i]==''|| this[i]==null){
                return false
            }
        }
        return true
    }
}
    
class Modal {
    erro(){
        let modalHeader = document.querySelector('.modal-header')
        let modalTitle=document.querySelector('.modal-title')
        let modalBody = document.querySelector('.modal-body')
        let botaoVoltar=document.querySelector('.botao-voltar-modal')
        modalHeader.classList.add('text-danger')
        modalTitle.innerHTML='Erro na Gravação!'
        modalBody.innerHTML='Exitem campos obrigatórios que não foram preenchidos!'
        botaoVoltar.classList.add('btn-danger')
        botaoVoltar.innerHTML='Voltar e Corrigir'
    }
    sucesso(){
        let modalHeader = document.querySelector('.modal-header')
        let modalTitle=document.querySelector('.modal-title')
        let modalBody = document.querySelector('.modal-body')
        let botaoVoltar=document.querySelector('.botao-voltar-modal')
        modalHeader.classList.add('text-success')
        modalTitle.innerHTML='Registrado com sucesso!'
        modalBody.innerHTML='As informações foram registradas corretamente!'
        botaoVoltar.classList.add('btn-success')
        botaoVoltar.innerHTML='Voltar'
    }
}
    

let modal = new Modal()

class Bd{
    constructor(){
        let id = localStorage.getItem('id')
        if(id === null){
            localStorage.setItem('id',0)
        }
    }
    getProximoId(){
        let proximoId= localStorage.getItem('id') 
        return parseInt(proximoId)+1
    }
    gravar(d){
        let id = this.getProximoId()
        localStorage.setItem(id,JSON.stringify(d))
        localStorage.setItem('id',id)
    }
    recuperarTodosRegistros(){
        let despesas = Array()
        let id= localStorage.getItem('id')
        //recuperaer todas despesas cadastradas em local storage
        for(let i = 1; i<=id; i++){
            let despesa = JSON.parse(localStorage.getItem(i))
            if(despesa===null){
                continue
            }
            despesa.id=i
            despesas.push(despesa)
            
        }
        return despesas
    }
    pesquisar(despesa){
        
        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperarTodosRegistros()
        console.log(despesa)
        console.log(despesasFiltradas)

        //ano
        if(despesa.ano != ""){
            console.log('filtro ano')
            despesasFiltradas=despesasFiltradas.filter(d => d.ano==despesa.ano)
        }

        //mes
        if((despesa.mes != '')){
            console.log('filtro mes')
            despesasFiltradas=despesasFiltradas.filter(d => d.mes==despesa.mes)
        }

        //dia
        if(despesa.dia != ''){
            console.log('filtro dia')
            despesasFiltradas=despesasFiltradas.filter(d => d.dia==despesa.dia)
        }
        //tipo
        if(despesa.tipo != ''){
            console.log('filtro tipo')
            despesasFiltradas=despesasFiltradas.filter(d => d.tipo==despesa.tipo)
        }

        //descricao
        if(despesa.descricao != ''){
            console.log('filtro descricao')
            despesasFiltradas=despesasFiltradas.filter(d => d.descricao==despesa.descricao)
        }

        //valor
        if(despesa.valor != ''){
            console.log('filtro valor')
            despesasFiltradas=despesasFiltradas.filter(d => d.valor==despesa.valor)
        }
        console.log(despesasFiltradas)
        return despesasFiltradas
    }
    remover(id){
        localStorage.removeItem(id)

    }
}

let bd = new Bd()

function cadastrarDespesa(){
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )
    if(despesa.validarDados()){
        //dialog de sucesso
        modal.sucesso()
        bd.gravar(despesa)
        $('#modalRegistraDespesa').modal('show')
    }else{
        //dialog de erro
        modal.erro()
        $('#modalRegistraDespesa').modal('show')
    }

    ano.value=""
    mes.value=""
    dia.value=""
    tipo.value=""
    descricao.value=""
    valor.value=""
}
function carregaListaDespesas(despesas = Array(), filtro = false) {
    if (despesas.length == 0 && filtro === false) {
        despesas = bd.recuperarTodosRegistros();
    }

    var listaDespesas = document.getElementById("listaDespesas");
    listaDespesas.innerHTML = '';

    // Percorrer o array despesas
    despesas.forEach(function(d) {
        // Criando o tr (linha)
        let linha = listaDespesas.insertRow();

        // Criando td (coluna)
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;
        switch (d.tipo) {
            case '1':
                d.tipo = 'Alimentação';
                break;
            case '2':
                d.tipo = 'Educação';
                break;
            case '3':
                d.tipo = 'Lazer';
                break;
            case '4':
                d.tipo = 'Saúde';
                break;
            case '5':
                d.tipo = 'Transporte';
                break;
        }
        linha.insertCell(1).innerHTML = d.tipo;
        linha.insertCell(2).innerHTML = d.descricao;
        linha.insertCell(3).innerHTML = d.valor;

        let btn = document.createElement('button');
        btn.className = 'btn btn-danger';
        btn.innerHTML = '<i class="fas fa-times"></i>';
        btn.id = 'id_despesa_' + d.id;
        btn.onclick = function() {
            // Remover a despesa
            let id = this.id.replace('id_despesa_', '');
            bd.remover(id);
            window.location.reload();
        };
        linha.insertCell(4).append(btn);
    });
}

function pesquisarDespesa(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value


    let despesa = new Despesa(ano,mes,dia,tipo,descricao,valor)
    let despesas =bd.pesquisar(despesa)


    this.carregaListaDespesas(despesas,true)
}

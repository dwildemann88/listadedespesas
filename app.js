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
            despesas.push(despesa)
            
        }
        return despesas
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
}
function carregaListaDespesas(){
    let despesas= Array()
    despesas = bd.recuperarTodosRegistros()
    console.log(despesas)

    var listaDespesas = document.querySelector("#listaDespesas")

    //percorrer o array despesas
    despesas.forEach(function(d){
        //criando o tr (linha)
        console.log(d)
        let linha=listaDespesas.insertRow()
        
        //criando td (coluna)

        linha.insertCell(0).innerHTML= `${d.dia}/${d.mes}/${d.ano}`
        switch(d.tipo){
            case '1': 
                d.tipo = 'Alimentação'
                break
            case '2': 
                d.tipo = 'Educação'
                break
            case '3': 
                d.tipo = 'Lazer'
                break
            case '4': 
            d   .tipo = 'Saúde'
                break
            case '5': 
                d.tipo = 'Transporte'
                break
                
        }
        linha.insertCell(1).innerHTML=d.tipo
        linha.insertCell(2).innerHTML=d.descricao
        linha.insertCell(3).innerHTML=d.valor
        linha.insertCell(4).innerHTML= 'botao'

    })
}
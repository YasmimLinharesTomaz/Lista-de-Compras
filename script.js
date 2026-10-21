

document.addEventListener("DOMContentLoaded", loadList);//esperar a pagina carrgar antes e executar uma função

function addItem() {
    const input = document.getElementById("itemInput");//usuario digita o nome do item
    const name = input.value.trim();
    if (name === "") {
        alert("Por favor insira um item!")
        return;
    }

    const list = JSON.parse(localStorage.getItem("shoppingList")) || [];//salvar historico da aplicação
    // || ou usa um blano b [] usa um array vazio,  assim o list sempre sera um array válido 

    list.push({name, completed: false});//adicionar novo item dentro do array, push--inserir (no final da lista)
    //cria o objeto 

    localStorage.setItem("shoppingList", JSON.stringify(list));//transforma o array em uma string JSON 
    input.value = "";
    loadList();
}

function loadList(){
    const list = JSON.parse(localStorage.getItem("shoppingList")) || [];//json.parse(...)converte a string em um array
    const ul = document.getElementById("itemList");
    ul.innerHTML = "";
 
    list.forEach((item, posicao )=> {//passando por cada elemnrto do array
        const li = document.createElement("li");//html
        li.className = item.completed ? "completed" : "";//operador ternario 
        li.innerHTML = `
            <span onclick="toggleCompleted(${posicao})">${item.name}</span>
            <button class="remove-btn" onclick="removeItem(${posicao})">X</button>

        `; 
        ul.appendChild(li);  
    });
}

//marcar item como concluido 
function toggleCompleted(posicao){//posicao do item no array
    const list = JSON.parse(localStorage.getItem("shoppingList"));//buscar os dados
    list[posicao].completed = !list[posicao].completed;//operador de negacao, para o marcador 
    localStorage.setItem("shoppingList", JSON.stringify(list));
    loadList();
}
//toggle=alternar

function removeItem(posicao){
    const list = JSON.parse(localStorage.getItem("shoppingList"));
    list.splice(posicao, 1);
    localStorage.setItem("shoppingList", JSON.stringify(list));
    loadList();
}

function clearCompleted() {
    const list = JSON.parse(localStorage.getItem("shoppingList")) || [];
    const remaining = list.filter(item => !item.completed);
    localStorage.setItem("shoppingList", JSON.stringify(remaining));
    loadList();
}
  
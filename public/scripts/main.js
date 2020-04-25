console.log("Clientside js file");

//Form Action
const form = document.getElementById("request");
let response = document.getElementById("response")

const doSth = ()=>{
    response.innerHTML = "Loading...";
    const location = form.children[0].value;
    fetchData(location)
}
async function fetchData(location){
    const jsonData = await fetch(`http://localhost:3000/weather?search=${location}`);
    const data = await jsonData.json();
    if(data.error) response.innerHTML = data.error;
    else response.innerHTML = data.response;
    response.style.display = "inline";
}

form.children[1].onclick = doSth;


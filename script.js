// https://crudcrud.com/api/adc54d7744e946cd8ffc1851accabb6d/grupo265 //

document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById("form");

    formulario.addEventListener("submit", async function(event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const grupo = document.getElementById("grupo").value;
        const sala = document.getElementById("sala").value;

        const data = {
            nombre: nombre,
            apellido: apellido,
            grupo: grupo,
            sala: sala
        };

        try {
            const response = await fetch("https://crudcrud.com/api/adc54d7744e946cd8ffc1851accabb6d/grupo265", {
                headers: { 
                    "Content-Type": "application/json; charset=utf-8" 
                },
                method: 'POST',
                body: JSON.stringify(data)
            })
            const responsedata = await response.json();
            console.log("respuesta del servidor", responsedata);
        } catch (error) {
            console.error("error en la solicitud", error)
        }
    });

    function borrarObjeto(id) {
        fetch(`https://crudcrud.com/api/adc54d7744e946cd8ffc1851accabb6d/grupo265/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.status === 204) {
                console.log("Objeto eliminado correctamente.");
                bajarDatos();
            } else {
                console.error("Error al eliminar el objeto.");
            }
        })
        .catch(error => {
            console.error("Error al eliminar el objeto:", error);
        });
     }
    

    function bajarDatos(){
        fetch('https://crudcrud.com/api/adc54d7744e946cd8ffc1851accabb6d/grupo265')
        .then(respuesta=> respuesta.json())
        .then(data=>{
            let filas="";
            if (data.lenght==0){
                filas+="<td>Nadie completo el desafio</td>";
            } else {
                for(let dato of data){
                    filas+=`<tr><td> ${dato.nombre} </td> 
                            <td> ${dato.apellido} </td>
                            <td> ${dato.grupo} </td>
                            <td> ${dato.sala} </td>
                            <td> <i class="bi bi-trash" data-id="${dato._id}"</i> </td></tr>`
                }
            }
            document.getElementById('tabla').innerHTML = filas;
            
            const deleteIcons = document.getElementsByClassName('bi bi-trash');
            for (let i = 0; i < deleteIcons.length; i++) {
                deleteIcons[i].onclick = function() {
                    const id = this.getAttribute('data-id');
                    borrarObjeto(id);
                };
             }
        });
    }
    setInterval(bajarDatos,1500)

});
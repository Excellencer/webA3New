document.getElementById('submit-data').onclick = function() {
    fetch('http://localhost:3000/todo', {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "name": document.getElementById("input-name").value, 
    "todos": [document.getElementById("input-task").value]})
    })
    .then(response => response.text())
    .then(response => 
    document.getElementById('server-response').innerText = response)
};


document.getElementById('search').onclick = function() {
    username = document.getElementById("search-name").value;
    let fetchURL = 'http://localhost:3000/user/';
    let searchQuery = fetchURL.concat(username);

    fetch(searchQuery, {
        method: 'GET',
        })
        .then(response => response.text())
        .then(response => {
        try {
            const data = JSON.parse(response); 
              console.log(data)
              let tasks = [];
              document.getElementById('user-name').innerText = data.name;
                tasks = data.todos;
              let taskList = document.getElementById('task-list');
              taskList.innerHTML = "";
              let deleteUser = document.createElement("button");
              deleteUser.textContent = "Delete user";
              deleteUser.setAttribute("id", "delete-user")
              taskList.appendChild(deleteUser);

              deleteUserButton(data.name);

              for (let x = 0; x < tasks.length; x++) {
                let taskDiv = document.createElement("div");
                let taskText = document.createElement("p");
      
                taskDiv.setAttribute("class", "delete-task");
                taskText.innerText = tasks[x];

                taskDiv.appendChild(taskText);
                taskList.appendChild(taskDiv);
              }
        } catch (error) {
            console.log(response);
            document.getElementById('server-response').innerText = response
        }
            
        });

}

function deleteUserButton(name) {
    document.getElementById('delete-user').onclick = function() {
        
        let fetchURL = 'http://localhost:3000/user/';
        let searchQuery = fetchURL.concat(name);
    
        fetch(searchQuery, {
            method: 'DELETE',
            })
            .then(response => response.text())
            .then(response => {
                try {
                    if (response === "User deleted") {
                        console.log(response);
                        console.log(response);
                        document.getElementById('user-name').innerText = "";
                        document.getElementById('task-list').innerHTML = "";
                        document.getElementById('server-response').innerText = response;
                        document.getElementById('delete-user').innerHTML = "";
    
                    } 
                    document.getElementById('server-response').innerText = response
                    
                } catch (error) {
                    document.getElementById('server-response').innerText = response
                }
                
                
                });
    
    }
}

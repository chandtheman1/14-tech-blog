const editFormHandler = async (event) => {
    event.preventDefault();

    const id = window.location.toString().split("/")[
        window.location.toString().split("/").length -1
    ]

    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value.trim();

    
    const response = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            title,
            content
        }),
        headers: { "Content-Type": "application/json"}
    });
        
    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert(response.statusText);
    };

    
};

const deleteFormHandler = async (event) => {
    event.preventDefault();

    const id = window.location.toString().split("/")[
        window.location.toString().split("/").length -1
    ]

    const response = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert(response.statusText);
    };

};


document
    .querySelector(".edit-form")
    .addEventListener("submit", editFormHandler);

document
    .querySelector(".edit-form")
    .addEventListener("click", deleteFormHandler);
const createCommentHandler = async (event) => {
    event.preventDefault();

    const blog_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];
    const comment_text = document.querySelector('#comment-content').value.trim();

    const response = await fetch('/api/comments', {
        method: "POST",
        body: JSON.stringify({
            blog_id,
            comment_text
        }),
        headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    };
}


document
    .querySelector(".create-comment")
    .addEventListener("submit", createCommentHandler);
import config from '../config';


async function create(post) {
    const form = new FormData();
    if (!post.images) return;
    const imagesPromises = post.images.map((image) => {
        return new Promise(async (resolve) => {
            await fetch(image).then(res => resolve(res.blob()));
        });
    });
    await Promise.all(imagesPromises).then(async (blobs) => {
        form.append('description', post.description);
        form.append('images', blobs);
        const res = await fetch(config.apiUrl + '/post', {
            method: 'POST',
            body: form,
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        });
        return res.json();
    });
}

async function getFeed() {
    const res = await fetch(config.apiUrl + '/post', {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    });
    return res.json();
}

async function getPosts(username) {
    const token = localStorage.getItem("token");
    if(!token) return [];
    const res = await fetch(config.apiUrl + '/user/' + username + '/post', {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    });
    return res.json();
}

async function getPost(id) {
    const res = await fetch(config.apiUrl + '/post/' + id, {
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    });
    return res.json();
}

async function postLike(postId) {
    return fetch(config.apiUrl + '/post/' + postId + '/like', {
        method: 'POST',
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    });
}

async function postUnlike(postId) {
    return fetch(config.apiUrl + '/post/' + postId + '/unlike', {
        method: 'POST',
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    });
}

export {
    create,
    getFeed,
    getPosts,
    getPost,
    postLike,
    postUnlike
}
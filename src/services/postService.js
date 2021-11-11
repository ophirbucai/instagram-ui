import config from '../config/index';

async function create(post) {
    const form = new FormData();
    form.append('body', post.body);
    form.append('image', post.image);

    const token = localStorage.getItem("token");
    const res = await fetch(config.apiUrl + '/post', {
        method: 'POST',
        body: form,
        headers: {
            'Authorization': token
        }
    });
    return res.json();
}

async function getFeed() {
    const token = localStorage.getItem("token");
    const res = await fetch(config.apiUrl + '/post', {
        headers: {
            'Authorization': token
        }
    });
    return res.json();
}

async function getPosts(username) {
    const token = localStorage.getItem("token");
    if(!token) return [];
    const res = await fetch(config.apiUrl + '/post/' + username, {
        method: 'GET',
        headers: {
            'Authorization': token
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
    postLike,
    postUnlike
}
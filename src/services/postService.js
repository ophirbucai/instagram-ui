import config from '../config';
import { base64StringToBlob } from 'blob-util';

async function create(post) {

    if (!post.images) return;
    const form = new FormData();
    console.log(post.images);
    // images are base64
    const imagesPromises = post.images.map(async (image) => {
        const cleanBase64 = image.split(';base64,').pop();
        return base64StringToBlob(cleanBase64, 'image/jpeg');
    });
    Promise.all(imagesPromises).then(async (blobs) => {
        console.log(blobs);
        blobs.forEach((blob, i) => {
            const imageFile = new File([blob], `image${i}`, {type: 'image/jpeg'})
            console.log(`imageFile`, imageFile);
            form.append('images', imageFile)
        })
        form.append('description', post.description);
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
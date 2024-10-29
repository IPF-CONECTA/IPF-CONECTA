import { createPostSvc, deletePostSvc, getPostByIdSvc, getPostsSvc } from "./postServices.js";

export const getPostsCtrl = async (req, res) => {
    const { id } = req.user.profile;
    try {
        const pageAsNumber = Number.parseInt(req.query.page)
        let page = 1
        if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {
            page = pageAsNumber;
        }
        const posts = await getPostsSvc(page - 1, id);

        if (posts.count === 0) return res.status(404).json({ message: "No hay publicaciones" });

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const getPostByIdCtrl = async (req, res) => {
    const { id } = req.user.profile;
    const { postId } = req.params;

    try {
        const post = await getPostByIdSvc(postId, id)
        if (!post) return res.status(404).json()
        res.status(200).json(post)
    } catch (error) {
        console.log(error)
        res.status(500).json()
    }
}

export const createPostCtrl = async (req, res) => {
    const { id } = req.user.profile;
    try {
        const result = await createPostSvc(req.body, req.files, id);
        if (!result) return res.status(400).json({ message: "Hubo un error al postear" });
        res.status(201).json(result);
    } catch (error) {
        console.error(error)
        res.status(500).json(error.message);
    }
}

export const deletePostCtrl = async (req, res) => {
    const { id } = req.user.profile;
    const { postId } = req.params;
    try {
        await deletePostSvc(postId, id);
        res.status(204).json();
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message);
    }
}
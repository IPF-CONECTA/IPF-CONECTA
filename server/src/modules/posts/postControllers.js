import { createPostSvc, getPostsSvc } from "./postServices.js";

export const getPostsCtrl = async (req, res) => {
    console.log("SE EJECUTO EL CONTROLADOR")
    try {
        const pageAsNumber = Number.parseInt(req.query.page)
        let page = 1
        if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {
            page = pageAsNumber;
        }
        const posts = await getPostsSvc(page - 1);
        if (posts.count === 0) return res.status(404).json({ message: "No hay publicaciones" });

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const createPostCtrl = async (req, res) => {
    const { id } = req.user;
    try {
        const { body } = req;
        const post = await createPostSvc(body, id);
        if (!post) return res.status(400).json({ message: "Hubo un error al postear" });
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json(error.message);
    }
}
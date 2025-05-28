import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to create a post'));
    }
    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, 'Please provide all required fields'));
    }
    const slug = req.body.title
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, '-');
    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id,
    });

    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);  // Cambiado de req.status a res.status
    } catch (error) {
        next(error);
    }
};

export const getposts = async(req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;             // Obtener el índice de inicio desde la consulta, o 0 por defecto
        const limit = parseInt(req.query.limit) || 9;                       // Limite de la consulta
        const sortDirection = req.query.order === 'asc' ? 1 : -1;           // Orden ascendente o descendente
        const posts = await Post.find({
            ...(req.query.userId && { userId: req.query.userId }),          // Filtrar por userId si se proporciona
            ...(req.query.category && { category: req.query.category }),    // Filtrar por category si se proporciona
            ...(req.query.slug && { category: req.query.slug }),            // Filtrar por slug si se proporciona
            ...(req.query.postId && { _id: req.query.postId }),             // Filtrar por postId si se proporciona
            ...(req.query.searchTerm && {                                   // Filtrar por searchTerm si se proporciona
                $or: [
                    { title: { $regex: req.query.searchTerm, $options: 'i' } },     // Búsqueda en el título
                    { content: { $regex: req.query.searchTerm, $options: 'i' } }    // Búsqueda en el contenido
                ],
            }),
        }).sort({ updateAt: sortDirection }).skip(startIndex).limit(limit); // Aplicar ordenamiento, paginación y límite

        const totalPost = await Post.countDocuments();                      // Contar el total de documentos
        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );
        const lastMonthPosts = await Post.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });

        res.status(200).json({
            posts,
            totalPost,
            lastMonthPosts,
        });
    } catch (error) {
        next(error);
    }
};

export const deletepost = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You\'re not allowed to delete this post'));
    }
    try {
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json('The post has benn deleted');
    } catch (error) {
        next(error);
    }
};
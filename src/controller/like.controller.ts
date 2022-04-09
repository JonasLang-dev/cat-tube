import { Request, Response } from "express"
import { CreateLikeInput, PostLikesInput, RemoveLikeInput } from "../schema/like.schema"
import { createLike, findLikebyId, findLikes } from "../service/like.service"
import { findPostbyId } from "../service/post.service"
import log from "../utils/logger"

export const createLikeHandler = async (req: Request<{}, {}, CreateLikeInput>, res: Response) => {
    const user = res.locals.user._id

    let post;

    try {
        post = await findPostbyId(req.body.post)
    } catch (error: any) {
        return res.status(400).send({ message: error.message })
    }

    if (!post) {
        return res.status(404).send({ message: "Could not find post" })
    }

    const isLike = await findLikes({ user, post: post._id })

    if (isLike) {
        return res.status(400).send({ message: "You already liked this post" })
    }

    try {
        const like = await createLike({ user: user, post: post._id, isLike: true })
        return res.send({ data: like })
    } catch (error) {
        res.status(400).send({ message: "Could not like this post" })
    }
}

export const removeLikeHandler = async (req: Request<RemoveLikeInput>, res: Response) => {
    const user = res.locals.user._id

    let like;
    try {
        like = await findLikebyId(req.params.id)
    } catch (error: any) {
        return res.status(400).send({ message: error.message })
    }

    if (!like) {
        return res.status(404).send({ message: "Could not find like" })
    }

    if (like.user != user) {
        return res.status(401).send({ message: "Unauthorized" })
    }

    try {

        await like.remove()
        return res.send({ message: "Like removed" })

    } catch (error: any) {

        log.error(error.message)
        res.status(400).send({ message: "Could not remove like" })
    }
}

export const getLickPostsHandler = async (_req: Request, res: Response) => {
    const { _id } = res.locals.user

    const likes = await findLikes({ user: _id })

    return res.send({ data: likes })
}

export const getPostLikesHandler = async (req: Request<PostLikesInput, {}, {}>, res: Response) => {
    const { post } = req.params

    const likes = await findLikes({ post })

    return res.send({ data: likes })
}

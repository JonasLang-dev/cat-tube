import { Request, Response } from "express"
import { CreateLikeInput, RemoveLikeInput } from "../schema/like.schema"
import { createLike, findLikebyId, findLikes } from "../service/like.service"
import { findPostbyId } from "../service/post.service"
import log from "../utils/logger"

export const createLikeHandler = async (req: Request<{}, {}, CreateLikeInput>, res: Response) => {
    const user = res.locals.user._id

    const post = await findPostbyId(req.body.post)

    if (!post) {
        return res.status(404).send({ message: "Could not find post" })
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

    const like = await findLikebyId(req.params.id)

    if (!like) {
        return res.status(404).send({ message: "Could not find like" })
    }

    if (like.user != user._id) {
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


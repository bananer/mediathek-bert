import { Hono } from "hono";

export const ard = new Hono();

type ArdMediathekProgramSetResponseBody = {
    data: {
        programSet: {
            items: {
                nodes: Array<{
                    publicationStartDateAndTime: string
                    audios: Array<{
                        url: string
                    }>
                }>
            }
        }
    }
}

ard.get('/:id/latest', async (c) => {
    const { id } = c.req.param()
    const resp = await fetch(`https://api.ardaudiothek.de/programsets/${id}`)
    const items = (await resp.json() as ArdMediathekProgramSetResponseBody).data.programSet.items.nodes
    // TODO: is sorting necessary or is the first entry in the list always the latest?
    //items.sort((i1, i2) => Date.parse(i2.publicationStartDateAndTime) - Date.parse(i1.publicationStartDateAndTime))
    const latestItem = items[0]
    return c.redirect(latestItem.audios[0].url)
})
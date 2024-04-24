export function Paginate(paginate?: string) {
    try {
        const { page, limit } = Object.fromEntries(paginate.split(',').map((item) => {
            const split = item.split('=')
            return [split[0], split[1]]
        }))
        return { take: +limit, skip: +limit * (+page - 1) }
    } catch {
        return { take: 1000, skip: 0 }
    }
}
export function getOrder(orderBy: string) {
    try {
        return Object.fromEntries(orderBy.split(',').map((item) => {
            const split = item.split('=')
            return [split[0], split[1]]
        }))
    } catch (err) {
        return null
    }
}

export function getOrderAsQueryBuilder(table: string, orderBy: string): {} {
    try {
        return Object.fromEntries(orderBy.split(',').map((item) => {
            const split = item.split('=')
            if (split[0].split('.').length > 1)
                return [`${split[0]}`, split[1]]
            else
                return [`${table}.${split[0]}`, split[1]]
        }))
    } catch (err) {
        return null
    }
}
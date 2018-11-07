import mirror from 'mirrorx'

export default {
    registerAll: () => {
        const models = require.context('./', true, /\.js$/)
        models.keys().forEach(key => {
            if (key !== './index.js')
                mirror.model(models(key).default)
        })

    }
}
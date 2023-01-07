const sharedConfig = require('config/tailwind.config')

module.exports = {
  ...sharedConfig,
  theme: {
    ...sharedConfig.theme,
    extend: {
      ...sharedConfig.theme.extend,
      fontFamily: {
        ...sharedConfig.theme.extend.fontFamily,
        virgil: ['var(--font-virgil)'],
        recursive: ['var(--font-recursive)']
      }
    }
  }
}
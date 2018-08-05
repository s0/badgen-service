const axios = require('../axios.js')

// https://github.com/ngryman/badge-size/issues/71

module.exports = async function (topic, ...args) {
  const query = topic === 'size' ? '' : `?compression=${topic}`
  const endpoint = `https://next.badgesize.io/${args.join('/')}.json${query}`
  const subject = topic === 'size' ? topic : `${topic} size`

  const { prettySize, color } = await axios(endpoint).then(res => res.data)

  return {
    subject,
    status: prettySize,
    color
  }
}

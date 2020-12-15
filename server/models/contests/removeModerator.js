const { pool } = require('../database')

/**
 * @param {*} param0
 * @param {Object} param0.body
 * @param {Object} param0.params
 * @return {Promise}
 */

function removeModerator({ params, body }) {
  return new Promise((resolve, reject) => {
    const { contest_id: contestId } = params
    const { moderator: moderatorUsername } = body
    pool.query(
      `DELETE FROM contests_moderators WHERE contest_id=? AND moderator=? 
                AND moderator NOT IN (SELECT creator FROM contests WHERE contest_id=?)`,
      [contestId, moderatorUsername, contestId],
      (error, res) => {
        if (error || res === undefined) {
          return reject(error)
        }
        const { affectedRows } = res
        if (affectedRows === 0) {
          return reject('Either user was a creator or not a moderator')
        }
        return resolve('Successfully removed as moderator')
      }
    )
  })
}

module.exports = removeModerator

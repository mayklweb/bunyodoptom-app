// entities/order/types.js

/**
 * @typedef {Object} OrderItem
 * @property {string} productId
 * @property {number} quantity
 * @property {number} price
 */

/**
 * @typedef {Object} Order
 * @property {string} id
 * @property {string} userId
 * @property {OrderItem[]} items
 * @property {number} total
 * @property {string} status
 * @property {Date} createdAt
 */
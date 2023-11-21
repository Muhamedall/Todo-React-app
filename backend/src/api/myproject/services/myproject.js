'use strict';

/**
 * myproject service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::myproject.myproject');

'use strict';

/**
 * stagaire service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::stagaire.stagaire');

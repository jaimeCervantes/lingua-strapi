'use strict';
/**
 *  schedule controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::schedule.schedule', ({ strapi }) => ({
  async findOrCreate(ctx) {
    const { data } = ctx.request.body;

    /*if (!isObject(data)) {
      throw new ValidationError('Missing "data" payload in the request body');
    }*/

    const sanitizedInputData = await this.sanitizeInput(data, ctx);
    const events = sanitizedInputData.events;
    const productId = sanitizedInputData.productId;

    const eventsPromises = events.map(async event => {
      let result =  await strapi.db.query('api::schedule.schedule').findOne({
        where: {
          productId,
          date: event.date,
          time: `${event.startTimeUTC}:00.000`
        }
      });

      if (!result) {
        result = await strapi.db.query('api::schedule.schedule').create({
          data: {
            productId,
            date: event.date,
            time: `${event.startTimeUTC}:00.000`,
            capacity: 6,
            availableSeats: 6,
            timezoneOffset: event.timezoneOffset,
            publishedAt: new Date().toISOString()
          }
        })
      }

      return result;
    });

    const results = [];
    for(const eventPromise of eventsPromises) {
      results.push(await eventPromise);
    }

    const sanitizedResults = await this.sanitizeOutput(results, ctx);

    return this.transformResponse(sanitizedResults, { pagination: {} });
  }
}));

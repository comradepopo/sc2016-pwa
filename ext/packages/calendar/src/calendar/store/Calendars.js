/**
 * A store for {@link Ext.calendar.model.CalendarBase Calendar} models.
 *
 * This store type is used as the base store for calendar views.
 */
Ext.define('Ext.calendar.store.Calendars', {
    extend: 'Ext.data.Store',
    alias: 'store.calendar-calendars',

    requires: [
        'Ext.calendar.store.EventSource',
        'Ext.calendar.model.Calendar'
    ],

    config: {
        /**
         * @cfg {Object} eventStoreDefaults
         * Defaults for the {@link Ext.calendar.model.CalendarBase event stores} 
         * generated by the calendars.
         */
        eventStoreDefaults: null
    },

    model: 'Ext.calendar.model.Calendar',

    /**
     * Get the event source for this calendar.
     * @return {Ext.calendar.store.EventSource} The event source.
     */
    getEventSource: function() {
        var source = this.eventSource;
        if (!source) {
            this.eventSource = source = new Ext.calendar.store.EventSource({
                source: this
            });
        }
        return source;
    },

    onCollectionAdd: function(collection, info) {
        var cfg = this.getEventStoreDefaults(),
            items = info.items,
            len = items.length,
            i, rec;

        this.callParent([collection, info]);
        if (cfg) {
            for (i = 0; i < len; ++i) {
                rec = items[i];
                if (!rec.hasOwnProperty('eventStoreDefaults')) {
                    rec.eventStoreDefaults = Ext.merge({}, rec.eventStoreDefaults, cfg);
                }
            }
        }
    },

    doDestroy: function() {
        this.eventSource = Ext.destroy(this.eventSource);
        this.callParent();
    }
});
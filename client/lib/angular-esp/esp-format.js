/*
    esp-format.js - ESP Format Filter

    This filter formats fields according to the fields datatype and ESP config.json settings.formats.

    string | format:SCHEMA:FIELD
 */

app.filter('format', function($filter, Esp) {
    return function(value, schema, field) {
        try {
            if (schema) {
                var dataType = schema.types[field].type;
                var fmt = Esp.config.settings.formats[dataType];
                if (fmt != null) {
                    if (dataType == 'date') {
                        value = Date.parse(value);
                        value = $filter('date')(value, fmt);

                    } else if (dataType == 'bool') {
                        ;

                    } else if (dataType == 'int') {
                        value = $filter('number')(value, 0);

                    } else if (dataType == 'float') {
                        value = $filter('number')(value, fmt);
                    }
                }
            }
        } catch(err) {}
        return value;
    }
});

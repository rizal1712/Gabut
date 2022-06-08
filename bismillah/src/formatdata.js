const kodecuaca = require('./weathercode')

function formatDataBmkg(json) {
    const data = json.data.forecast[0].area
        // filter duplicate data
        .filter((element, index, inputArray) => {
            return inputArray.indexOf(element) == index;
        })
        // filter empty array
        .filter((element) => {
            return element.parameter != null;
        })
        // map output of the data
        .map((area) => {

            

            // get the minimal temperature value
            const temp_min = area.parameter
                .filter((params) => {
                    return params.$.id === "tmin";
                })
                .map((params) => {
                    return params.timerange.map((timerange) => {
                        const dateTime = timerange.$.day;
                        return {
                            date: dateTime,
                            value: timerange.value[0]._
                        }
                    })
                });

            // get the maximum temperature value
            const temp_max = area.parameter
                .filter((params) => {
                    return params.$.id === "tmax";
                })
                .map((params) => {
                    return params.timerange.map((timerange) => {
                        const dateTime = timerange.$.day;
                        return {
                            date: dateTime,
                            value: timerange.value[0]._
                        }
                    })
                });

            // get the weather
            const weather = area.parameter
                .filter((params) => {
                    return params.$.id === "weather";
                })
                // take the value of weahter by hour in three days
                .map((params) => {
                    const weahter = params.timerange
                        .filter((timerange) => {
                            return timerange.$.h == "6" ||
                                timerange.$.h == "18" ||
                                timerange.$.h == "30" ||
                                timerange.$.h == "42" ||
                                timerange.$.h == "54" ||
                                timerange.$.h == "66"
                        })
                        .map((timerange) => {
                            const codeCuaca = timerange.value[0]._;
                            const cuaca= kodecuaca(codeCuaca);
                            const dateTime = timerange.$.datetime;
                            return {
                                date: dateTime,
                                value: cuaca
                            }
                        });
                    return weahter;
                })
                // simplify the output
                .map((val) => {
                    return [
                        {
                            date: val[0].date,
                            siang: val[0].value,
                            malam: val[1].value,
                        },
                        {
                            date: val[2].date,
                            siang: val[2].value,
                            malam: val[3].value,
                        },
                        {
                            date: val[4].date,
                            siang: val[4].value,
                            malam: val[5].value,
                        },
                    ]
                })

            // simplify again to reduce the file size
            const format = {
                provinsi: area.$.domain,
                kota: area.name[1]._,
                koordinat:area.$.coordinate,
                long:area.$.longitude,
                lat:area.$.latitude,
                parameter: [
                    {
                        date: temp_min[0][0].date,
                        temp_min: temp_min[0][0].value,
                        temp_max: temp_max[0][0].value,
                        weather_day: weather[0][0].siang,
                        weather_night: weather[0][0].malam,
                    },
                    {
                        date: temp_min[0][1].date,
                        temp_min: temp_min[0][1].value,
                        temp_max: temp_max[0][1].value,
                        weather_day: weather[0][1].siang,
                        weather_night: weather[0][1].malam,
                    },
                    {
                        date: temp_min[0][2].date,
                        temp_min: temp_min[0][2].value,
                        temp_max: temp_max[0][2].value,
                        weather_day: weather[0][2].siang,
                        weather_night: weather[0][2].malam,
                    },
                ]
            };
            // console.log(format)
            return format
        });
    // console.log(data);    
    return data;
    
};

module.exports=formatDataBmkg
const sc: any = require("states-cities-db");

const FLAGS_COUNTRIES = sc.getCountries();

const countryTelCode = (country: any) =>
    country && FLAGS_COUNTRIES.find(({ iso }: any) => iso === country).prefix;

export { FLAGS_COUNTRIES, countryTelCode }
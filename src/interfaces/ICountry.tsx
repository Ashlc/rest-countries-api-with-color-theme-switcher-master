export interface ICountry {
    name: string;
    population: string;
    region: string;
    subregion?: string;
    capital: string;
    topLevelDomain?: string;
    currencies?: string;
    languages?: string;
    borders?: string[];
    flag: string;
}

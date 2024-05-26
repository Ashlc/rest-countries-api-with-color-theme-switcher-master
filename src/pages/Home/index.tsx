import { useEffect, useState } from 'react';
import Card from '../../components/Card';
import { ICountry } from '../../interfaces/ICountry';
import formatPopulation from '../../utils/FormatPopulation';
import Filter from './components/Filter';
import SearchBar from './components/SearchBar';

interface IResponse {
    name: Record<string, string>;
    population: string;
    region: string;
    capital: string;
    flags: Record<string, string>;
}

const Index = () => {
    const [value, setValue] = useState<string>('');
    const [region, setRegion] = useState<string>('All');
    const [countryList, setCountryList] = useState<ICountry[]>([]);
    const [filteredCountries, setFilteredCountries] = useState<ICountry[]>([]);

    const fetchCountries = async () => {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const data = await response.json();
            const formattedData = data.map((country: IResponse) => {
                return {
                    name: country?.name?.common,
                    population: formatPopulation(country?.population),
                    region: country?.region,
                    capital: country?.capital,
                    flag: country?.flags.png,
                };
            });
            formattedData.sort((a: ICountry, b: ICountry) => {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });

            setCountryList(formattedData);
            setFilteredCountries(formattedData);
        } catch (error) {
            console.log(error);
        }
    };

    const filterCountries = () => {
        const filtered = countryList.filter((country) => {
            if (region === 'All') {
                return country.name.toLowerCase().includes(value.toLowerCase());
            }
            return (
                country.name.toLowerCase().includes(value.toLowerCase()) &&
                country.region.toLowerCase() === region.toLowerCase()
            );
        });
        setFilteredCountries(filtered);
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    useEffect(() => {
        filterCountries();
    }, [value, region]);

    const regionList = [
        'All',
        'Africa',
        'Americas',
        'Asia',
        'Europe',
        'Oceania',
    ];

    return (
        <div className="flex flex-col p-10 lg:px-40 lg:py-20 w-full gap-10">
            <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
                <SearchBar value={value} setValue={setValue} />
                <Filter
                    value={region}
                    setValue={setRegion}
                    regions={regionList}
                />
            </div>
            <div
                className="flex flex-col gap-10 lg:gap-x-0 md:justify-evenly lg:justify-between
                 lg:flex-row flex-wrap w-full items-center"
            >
                {filteredCountries.map((country) => {
                    return <Card key={country.name} country={country} />;
                })}
            </div>
        </div>
    );
};

export default Index;

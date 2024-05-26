import { useEffect, useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { RiLoader2Line } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { ICountry } from '../../interfaces/ICountry';
import formatPopulation from '../../utils/FormatPopulation';

const Index = () => {
    const [data, setData] = useState<ICountry>({
        name: '',
        population: '',
        region: '',
        capital: '',
        flag: '',
        subregion: '',
        topLevelDomain: '',
        currencies: '',
        languages: '',
        borders: [''],
    });
    const cname = window.location.pathname.split('/')[2];
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCountry = async () => {
            const response = await fetch(
                `https://restcountries.com/v3.1/name/${cname}/?fullText=true`
            );
            const res = await response.json();
            const country = res[0];
            const countryData: ICountry = {
                name: country.name.common,
                population: formatPopulation(country.population),
                region: country.region,
                subregion: country.subregion,
                capital: country.capital,
                flag: country.flags.png,
                topLevelDomain: country.tld[0],
                currencies:
                    country.currencies[Object.keys(country.currencies)[0]].name,
                languages: Object.keys(country.languages).join(', '),
                borders: country.borders,
            };

            const borderNames = await Promise.all(
                (countryData.borders ?? []).map(async (border) => {
                    const responseNames = await fetch(
                        `https://restcountries.com/v3.1/alpha/${border}`
                    );
                    const resNames = await responseNames.json();
                    return resNames[0].name.common;
                })
            );

            countryData.borders = borderNames;
            setData(countryData);
            window.scrollTo(0, 0);
        };

        try {
            fetchCountry();
        } catch (error) {
            console.log(error);
        }
    }, [cname]);

    const section1: Record<string, string>[] = [
        {
            name: 'Population',
            key: 'population',
        },
        {
            name: 'Region',
            key: 'region',
        },
        {
            name: 'Sub Region',
            key: 'subregion',
        },
        {
            name: 'Capital',
            key: 'capital',
        },
    ];

    const section2: Record<string, string>[] = [
        {
            name: 'Top Level Domain',
            key: 'topLevelDomain',
        },
        {
            name: 'Currencies',
            key: 'currencies',
        },
        {
            name: 'Languages',
            key: 'languages',
        },
    ];

    return (
        <div className="flex flex-col items-center w-full px-6 lg:px-40 md:px-20 py-10 gap-10">
            <button
                type="button"
                onClick={() => {
                    navigate('/');
                }}
                className="flex flex-row gap-2 lg:ml-10 items-center self-start px-6 py-2
                text-sm bg-[--primary] hover:bg-[--hover] rounded-sm shadow-sm border border-[--hover]"
            >
                <MdArrowBack size={16} />
                Back
            </button>
            <div className="flex flex-col lg:flex-row gap-16 w-full justify-center lg:px-10">
                <div className="w-full lg:grow">
                    {data.flag ? (
                        <img
                            src={data.flag}
                            alt={`${data.name} flag`}
                            className="w-full shadow-lg"
                        />
                    ) : (
                        <div className="w-full items-center flex flex-col justify-center h-full">
                            <RiLoader2Line
                                size={24}
                                className="animate-spin text-[--input]"
                            />
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-6 w-full lg:w-1/2">
                    <h1 className="text-3xl font-bold">{data.name}</h1>
                    <div className="flex flex-col lg:flex-row gap-10 text-lg">
                        <div className="flex flex-col gap-2">
                            {section1.map((field) => {
                                return (
                                    <div
                                        key={field.key}
                                        className="flex flex-row gap-2 w-full"
                                    >
                                        <p className="font-semibold capitalize">{`${field.name}:`}</p>
                                        <p className="font-light">
                                            {data[
                                                field.key as keyof ICountry
                                            ] || ''}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex flex-col gap-2">
                            {section2.map((field) => {
                                return (
                                    <div
                                        key={field.key}
                                        className="flex flex-row gap-2 w-full"
                                    >
                                        <p className="font-semibold capitalize">{`${field.name}:`}</p>
                                        <p>
                                            {data[
                                                field.key as keyof ICountry
                                            ] || ''}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row flex-wrap gap-2 w-full lg:items-center">
                        <p className="font-bold capitalize text-xl whitespace-nowrap">
                            Border Countries:
                        </p>
                        <div className="flex flex-row flex-wrap w-full gap-2">
                            {data.borders?.map((border) => {
                                return (
                                    <Link
                                        to={`/country/${border}`}
                                        key={border}
                                        className="bg-[--primary] border border-[--hover]
                                        text-[--text] hover:bg-[--hover] py-2 px-4 text-left
                                        shadow-sm rounded-sm"
                                    >
                                        <p className="hover:underline text-xs lg:text-base">
                                            {border}
                                        </p>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;

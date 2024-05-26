import { RiLoader2Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { ICountry } from '../../interfaces/ICountry';

type Props = {
    country: ICountry;
};

function Index({ country }: Props) {
    const navigate = useNavigate();

    const renderDetails = () => {
        const keys = Object.keys(country).filter(
            (key) => key !== 'name' && key !== 'flag'
        );
        return keys.map((key) => {
            return (
                <div key={key} className="flex flex-row gap-2 w-full">
                    <p className="font-semibold capitalize">{`${key}:`}</p>
                    <p>{country[key as keyof ICountry]}</p>
                </div>
            );
        });
    };

    return (
        <div
            onClick={() => {
                navigate(`/country/${country.name}`);
            }}
            className="flex flex-col border border-[--hover] items-center rounded-lg overflow-clip shadow-md bg-[--primary] w-[360px]"
        >
            <div className="overflow-clip w-full">
                {country.flag ? (
                    <img src={country.flag} alt="" className="h-[252px]" />
                ) : (
                    <div className="h-16">
                        <RiLoader2Line
                            size={24}
                            className="animate-spin text-[--input]"
                        />
                    </div>
                )}
            </div>
            <div className="flex flex-col p-8 pb-14 w-full gap-1">
                <p className="text-xl font-bold w-full mb-2">{country.name}</p>
                {renderDetails()}
            </div>
        </div>
    );
}

export default Index;

import { useState } from 'react';
import { MdOutlineArrowDropDown } from 'react-icons/md';

type Props = {
    value: string;
    setValue: (value: string) => void;
    regions?: string[];
};

const Index = ({ value = 'All', setValue = () => {}, regions = [] }: Props) => {
    const [show, setShow] = useState<boolean>(false);

    const renderOptions = () => {
        return regions.map((region) => (
            <button
                type="button"
                key={region}
                value={region}
                className={`bg-[--primary] text-[--text] !hover:bg-[--hover] py-2 px-4 w-full text-left ${value === region ? 'bg-[--input] text-[--background]' : ''}`}
                onClick={() => {
                    setValue(region);
                }}
            >
                <p className="hover:underline text-sm lg:text-base">{region}</p>
            </button>
        ));
    };
    return (
        <label
            htmlFor="filter"
            onClick={() => setShow(!show)}
            className="h-16 w-full bg-[--primary] border border-[--hover] flex flex-row justify-between lg:text-lg lg:w-1/6 p-4 text-[--input] relative rounded-md items-center shadow-md"
        >
            {value === 'All' ? (
                <p className="text-[-text] text-sm lg:text-lg">
                    Filter by Regions
                </p>
            ) : (
                <p className="text-sm text-[--text]">{value}</p>
            )}
            {!show ? (
                <MdOutlineArrowDropDown size={24} />
            ) : (
                <MdOutlineArrowDropDown size={24} className="rotate-180" />
            )}
            <div
                className={`absolute top-20 right-0 flex flex-col w-full overflow-clip bg-[--primary] py-2 rounded-md shadow-md z-100 ${show ? 'flex' : 'hidden'}`}
            >
                {renderOptions()}
            </div>
        </label>
    );
};

export default Index;

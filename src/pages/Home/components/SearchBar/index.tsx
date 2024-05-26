import { MdSearch } from 'react-icons/md';

type Props = {
    value: string;
    setValue: (value: string) => void;
};

const Index = ({ value = '', setValue = () => {} }: Props) => {
    return (
        <label
            htmlFor="search"
            className="h-16 w-full border border-[--hover] lg:w-1/3 bg-[--primary] flex flex-row gap-4 lg:text-lg items-center text-[--input] rounded-md p-4 shadow-md"
        >
            <MdSearch className="text-[--input]" size={21} />
            <input
                id="search"
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search for a country..."
                className="bg-[--primary] w-full h-full text-[--text] placeholder-[--input] focus:outline-none"
            />
        </label>
    );
};

export default Index;

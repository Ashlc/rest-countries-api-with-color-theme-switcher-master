import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md';
import { useTheme } from '../../hooks/useTheme';

type Props = {};

const Index = (props: Props) => {
    const { theme, toggleTheme } = useTheme();

    const renderIcon = () => {
        if (theme === 'light') {
            return <MdOutlineDarkMode size={21} />;
        }
        if (theme === 'dark') {
            return <MdDarkMode size={21} />;
        }
    };

    return (
        <div className="w-full bg-[--primary] flex flex-row px-5 lg:px-10 border-b border-[--hover] items-center justify-between h-24 lg:h-16 select-none shadow-sm">
            <p className="font-bold lg:text-2xl">Where in the world?</p>
            <label htmlFor="theme-toggle">
                <p className="hidden">Toggle Theme</p>
                <button
                    id="theme-toggle"
                    type="button"
                    className="flex flex-row items-center gap-2"
                    onClick={toggleTheme}
                >
                    {renderIcon()}
                    <p className="lg:text-lg">Dark Mode</p>
                </button>
            </label>
        </div>
    );
};

export default Index;

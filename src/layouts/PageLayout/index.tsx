import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';

function Index() {
    return (
        <div className="w-full flex flex-col items-center pb-10">
            <Header />
            <Outlet />
        </div>
    );
}

export default Index;

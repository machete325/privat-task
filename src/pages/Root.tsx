import { Outlet } from 'react-router-dom';
import { Layout } from '../common/components/styled/Layout';

export const Root = () => {
    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};
